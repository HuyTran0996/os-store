const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const uniqId = require("uniqid");

const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");

const AppError = require("../utils/appError");
const validateMongodbId = require("../utils/validateMongodbId");
const APIFeatures = require("../utils/apiFeatures");

exports.userAddToCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;

  let products = [];
  let cartTotal = 0;

  await Promise.all(
    cart.map(async (item) => {
      let object = {};
      object.product = item._id;
      object.count = item.count;

      const product = await Product.findById(item._id)
        .select("price")
        .select("variant")
        .exec();
      if (!product) throw new AppError("Product not found", 404);

      // if product has variant,set price of variant, if product does not has variant, set price normal

      if (item.variantId) {
        validateMongodbId(item.variantId);

        // When comparing two _id values, they should be compared as objects, use Mongoose's equals method to compare ObjectId fields instead of using ===
        const find = product.variant.find((v) => v._id.equals(item.variantId));

        if (!find) {
          throw new AppError("Variant not found", 404);
        }

        object.variantSelected = item.variantId;
        object.price = find.price;
      } else {
        object.price = product.price;
      }

      products.push(object);
      // cartTotal += object.price * object.count;
    })
  );

  products.map((prod) => {
    cartTotal = cartTotal + prod.price * prod.count;
  });

  //delete other cart of user if exist
  await Cart.findOneAndDelete({ orderby: _id });
  // create new cart for user
  const newCart = await Cart.create({
    products,
    cartTotal,
    orderby: _id,
    totalAfterDiscount: cartTotal,
    couponName: "no coupon",
    discount: 0,
  });

  res.status(201).json({
    status: "success",
    newCart,
  });
});

exports.getUserCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ orderby: req.user._id }).populate(
    "products.product"
  );
  if (!cart) throw new AppError("cart not found", 404);

  res.status(200).json({
    status: "success",
    cart,
  });
});

exports.emptyCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOneAndDelete({ orderby: req.user._id });
  if (!cart) throw new AppError("cart not found", 404);

  res.status(204).json({
    status: "success",
    cart,
  });
});

exports.applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;

  const findCoupon = await Coupon.findOne({ name: coupon });
  if (!findCoupon) throw new AppError("Coupon not found", 404);
  if (findCoupon.isActive === false)
    throw new AppError("Coupon is not valid", 404);

  const currentDate = new Date();
  if (currentDate > new Date(findCoupon.expiry)) {
    throw new AppError("Coupon is expired", 400);
  }

  const cart = await Cart.findOne({ orderby: req.user._id }).populate(
    "products.product"
  );
  if (!cart) throw new AppError("Cart not found", 404);

  let totalAfterDiscount = (cart.cartTotal - findCoupon.discount).toFixed(2);

  await Cart.findOneAndUpdate(
    { orderby: req.user._id },
    {
      totalAfterDiscount,
      couponName: findCoupon.name,
      discount: findCoupon.discount,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    totalAfterDiscount,
  });
});

exports.createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied, shippingAddress } = req.body;

  if (!COD) throw new AppError("Create cash order failed", 409);

  const userCart = await Cart.findOne({ orderby: req.user._id });

  if (!userCart) throw new AppError("User not found", 404);

  const newOrder = await Order.create({
    products: userCart.products,
    paymentIntent: {
      method: "COD",
      subtotal: userCart.cartTotal,
      couponName: userCart.couponName,
      discount: userCart.discount,
      totalAfterDiscount: userCart.totalAfterDiscount,
    },
    orderby: req.user._id,
    orderbyEmail: req.user.email,
    orderStatus: "Processing",
    shippingAddress,
  });

  const orderIdCode = `${newOrder._id.toString()}`;

  // Update the order with the generated code
  await Order.findByIdAndUpdate(
    newOrder._id,
    { orderCode: orderIdCode },
    { new: true }
  );

  let update = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(update, {});

  res.status(201).json({
    status: "success",
    newOrder,
  });
});

exports.getAllOrders = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Order.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = new APIFeatures(Order.countDocuments(), req.query).filter();

  const orders = await features.query
    .populate("products.product")
    .populate("orderby")
    .exec();
  if (!orders) throw new AppError("order not found", 404);

  const totalOrder = await total.query;

  res.status(200).json({
    status: "success",
    data: {
      total: totalOrder.length,
      orders,
    },
  });
});

exports.getOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  validateMongodbId(orderId);
  const order = await Order.findById(orderId)
    .populate("products.product")
    .populate("orderby");
  if (!order) throw new AppError("order not found", 404);

  res.status(200).json({
    status: "success",
    order,
  });
});

exports.getOrderByUserId = (action) =>
  asyncHandler(async (req, res) => {
    let userID;
    if (action === "userID") userID = req.params.id;
    if (action === "selfCheck") userID = req.user._id;

    const features = new APIFeatures(Order.find({ orderby: userID }), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const total = new APIFeatures(Order.countDocuments(), req.query).filter();

    const orders = await features.query
      .populate("products.product")
      .populate("orderby")
      .exec();
    if (!orders) throw new AppError("order not found", 404);

    const totalOrder = await total.query;

    res.status(200).json({
      status: "success",
      totalOrder: totalOrder.length,
      orders,
    });
  });

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, paymentStatus } = req.body;
  const { id } = req.params;
  validateMongodbId(id);

  const updateOrderStatus = await Order.findByIdAndUpdate(
    id,
    {
      $set: {
        orderStatus: orderStatus,
        "paymentIntent.status": paymentStatus,
      },
    },
    { new: true }
  );
  if (!updateOrderStatus) throw new AppError("Order not found", 404);

  res.status(200).json({
    status: "success",
    updateOrderStatus,
  });
});

exports.getMonthlyOrders = asyncHandler(async (req, res) => {
  const ordersByMonth = await Order.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        //get all detail of order=> use $ROOT
        // orders: { $push: "$$ROOT" },
        // orders: { $push: "$paymentIntent" },
        totalIncomes: { $sum: "$paymentIntent.amount" },
        totalOrders: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    ordersByMonth,
  });
});
