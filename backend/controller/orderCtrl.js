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

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    const getPrice = await Product.findById(cart[i]._id).select("price").exec();
    if (!getPrice) throw new AppError("Product not found", 404);

    object.price = getPrice.price;
    products.push(object);
  }

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  await Cart.findOneAndDelete({ orderby: _id });

  const newCart = await Cart.create({ products, cartTotal, orderby: _id });

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

  const cart = await Cart.findOne({ orderby: req.user._id }).populate(
    "products.product"
  );
  if (!cart) throw new AppError("Cart not found", 404);

  let totalAfterDiscount = (
    cart.cartTotal -
    (cart.cartTotal * findCoupon.discount) / 100
  ).toFixed(2);

  await Cart.findOneAndUpdate(
    { orderby: req.user._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    totalAfterDiscount,
  });
});

exports.createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  let finalAmount = 0;

  if (!COD) throw new AppError("Create cash order failed", 409);

  const userCart = await Cart.findOne({ orderby: req.user._id });

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount;
  } else {
    finalAmount = userCart.cartTotal;
  }

  const newOrder = await Order.create({
    products: userCart.products,
    paymentIntent: {
      id: uniqId(),
      method: "COD",
      amount: finalAmount,
      status: "Cash on Delivery",
      created: Date.now(),
      currency: "usd",
    },
    orderby: req.user._id,
    orderStatus: "Cash on Delivery",
  });

  let update = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  const updateProduct = await Product.bulkWrite(update, {});

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
    totalOrder: totalOrder.length,
    orders,
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
  const { status } = req.body;
  const { id } = req.params;
  validateMongodbId(id);

  const updateOrderStatus = await Order.findByIdAndUpdate(
    id,
    {
      orderStatus: status,
      paymentIntent: {
        status: status,
      },
    },
    { new: true, runValidators: true }
  );
  if (!updateOrderStatus) throw new AppError("Order not found", 404);

  res.status(200).json({
    status: "success",
    updateOrderStatus,
  });
});
