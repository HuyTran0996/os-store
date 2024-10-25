import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import { useThunk } from "../hook/use-thunk";
import { getUserCartForCheckOut } from "../store/thunks/fetchUsers";
import { applyCoupon, cashOrder } from "../store/thunks/fetchOrders";

import "../styles/Checkout.scss";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { showToast } from "../components/ToastMessage";
import { Loading } from "../components/Loading/Loading";

const Checkout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [sendingOrder, setSendingOrder] = useState(false);
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const [getCart] = useThunk(getUserCartForCheckOut);
  const [applyCouponCart] = useThunk(applyCoupon);
  const [sendOrder] = useThunk(cashOrder);

  const { dataUserCart } = useSelector((state) => {
    return state.users;
  });

  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

  const getData = async () => {
    try {
      setIsLoading(true);

      if (parsedUserData && !parsedUserData.note) {
        const userCart = await getCart();
        setCart(userCart);
      }
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleAddCoupon = async () => {
    try {
      setIsApplying(true);
      await applyCouponCart(coupon);
      if (parsedUserData && !parsedUserData.note) {
        // const userCart = localStorage.getItem("userCart");
        const userCart = await getCart();
        setCart(userCart);
      }
      showToast(`Applied Coupon`, "success");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsApplying(false);
    }
  };
  const handleSendOrder = async () => {
    try {
      setSendingOrder(true);

      if (parsedUserData && !parsedUserData.note) {
        await sendOrder(shippingAddress);
      }
      showToast(
        `Thank you for choosing us, we'll deliver the products to you within 5 days`,
        "success",
        7000
      );
      navigate("/");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setSendingOrder(false);
    }
  };
  return (
    <div className="checkoutPage">
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <Box className="checkout-wrapper">
          <div className="address">
            <h3 className="website-name">OS Store</h3>

            <h4 className="title total">Contact Information</h4>
            <p className="user-detail total">
              name: {cart.orderby?.name}, email: {cart.orderby?.email}{" "}
            </p>

            <p className="user-detail total">phone: {cart.orderby?.phone}</p>
            <h4 className="shipping">Shipping Address</h4>
            <textarea
              type="text"
              placeholder="Address..."
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />

            <div className="navLink">
              <Link to="/cart">
                <BiArrowBack className="me-2" /> Return To Cart
              </Link>
              <Link to="/product" className="button">
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="prodInfo">
            {cart.products?.map((prod, index) => {
              const variant = prod.product.variant.find(
                (v) => v._id === prod.variantSelected
              );
              return (
                <div key={`product-${index}`} className="prods border-bottom">
                  <div className="leftGroup">
                    <div className="imgAndQuantity">
                      <span className="quantity">{prod.count}</span>

                      <img src={variant.images[0].url} alt="product" />
                    </div>

                    <div>
                      <h5 className="total-price">{prod.product.title}</h5>
                      <p className="total-price">{variant.variantName}</p>
                    </div>
                  </div>

                  <div className="rightGroup">
                    <h5 className="total">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(variant.price)}
                    </h5>
                  </div>
                </div>
              );
            })}

            {/* Price and coupon */}
            <div className="subTotalAndDiscount border-bottom">
              <div className="item">
                <p className="total">Subtotal:</p>
                <p className="total-price">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(cart.cartTotal)}
                </p>
              </div>
            </div>

            <div className="subTotalAndDiscount border-bottom">
              <div className="coupon">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  disabled={isApplying || sendingOrder || isLoading}
                  className="button"
                  onClick={handleAddCoupon}
                >
                  {isApplying ? "Loading..." : "Apply Coupon"}
                </button>
              </div>

              <div className="item">
                <p style={{ marginBottom: 0 }} className="total">
                  Discount:
                </p>
                <p style={{ marginBottom: 0 }} className="total-price">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(cart.discount)}
                </p>
              </div>
            </div>

            <div className="total border-bottom">
              <h4 className="total">Total:</h4>
              <h5 className="total-price">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(cart.totalAfterDiscount)}
              </h5>
            </div>

            <div className="total border-bottom">
              <button
                disabled={isApplying || sendingOrder || isLoading}
                className="button"
                onClick={handleSendOrder}
              >
                {sendingOrder ? "Sending..." : "Send Order"}
              </button>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
};

export default Checkout;
