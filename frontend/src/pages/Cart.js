import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import { useThunk } from "../hook/use-thunk";
import { getAProduct } from "../store/thunks/fetchProduct";
import { updateCartList } from "../store/thunks/fetchUsers";
import { Loading } from "../components/Loading/Loading";
import { showToast } from "../components/ToastMessage";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { AiFillDelete } from "react-icons/ai";

import "../styles/Cart.scss";
import imageNotFound from "../images/imageNotFound.png";

const Product = ({
  prod,
  quantityUser,
  updateQuantity,
  removeProduct,
  variantUser,
  updateVariantUser,
}) => {
  const [price, setPrice] = useState(prod.price);
  const [img, setImg] = useState(prod.images[0].url || imageNotFound);
  const colors = prod.variant.filter((v) => v.tag === "color");
  const sizes = prod.variant.filter((v) => v.tag === "size");
  const variants = prod.variant.filter((v) => v.tag === "variant");

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (e.target.value > prod.quantity) {
      return showToast(`only ${prod.quantity} ${prod.title} left`, "error");
    } else {
      updateQuantity(prod._id, newQuantity);
    }
  };

  const handleChangeImgAndPrice = (p) => {
    setImg(p.images[0].url);
    setPrice(p.price);
    updateVariantUser(prod._id, p._id);
  };

  return (
    <div key={`product-${prod._id}`} className="compare-product-card">
      <img
        src="images/cross.svg"
        alt="cross"
        className="cross"
        onClick={() => removeProduct(prod._id)}
      />
      <div className="product-card-image">
        <img src={img} alt="product" />
      </div>

      <div className="compare-product-detail">
        <h5 className="title">{prod.title}</h5>
        <h6 className="price">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </h6>

        <div className="product-detail">
          <h5>Brand:</h5>
          <p>{prod.brand}</p>
        </div>

        <div className="product-detail">
          <h5>Type:</h5>
          <p>{prod.category}</p>
        </div>

        <div className="product-detail">
          <h5>Availability:</h5>
          <p>{prod.quantity}</p>
        </div>

        <div className="product-detail">
          <h5>Color:</h5>
          <div className="wrapper">
            {colors?.map((c, index) => {
              return (
                <div
                  key={`color-${index}`}
                  onClick={() => handleChangeImgAndPrice(c)}
                  className="color"
                  style={{
                    backgroundColor: c.colorCode,
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="product-detail">
          <h5>Size:</h5>
          <div className="wrapper">
            {sizes?.map((s, index) => {
              return (
                <span
                  key={`size-${index}`}
                  className="size"
                  onClick={() => handleChangeImgAndPrice(s)}
                >
                  {s.variantName}
                </span>
              );
            })}
          </div>
        </div>

        <div className="product-detail variant">
          <h5>Variant:</h5>
          <div className="wrapper">
            {variants?.map((v, index) => {
              return (
                <span
                  key={`size-${index}`}
                  className="size"
                  onClick={() => handleChangeImgAndPrice(v)}
                >
                  {v.variantName}
                </span>
              );
            })}
          </div>
        </div>

        <div className="product-detail">
          <h5>Quantity:</h5>
          <div className="wrapper">
            <input
              type="number"
              min={1}
              max={10}
              value={quantityUser}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [quantityUser, setQuantityUser] = useState({});
  const [variantUser, setVariantUser] = useState({});
  const [cart, setCart] = useState([]);

  const [getAProductById] = useThunk(getAProduct);
  const [updateCartListUser] = useThunk(updateCartList);

  const { dataUserCart } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      setIsLoading(true);

      const products = await Promise.all(
        dataUserCart.map(async (item) => {
          const response = await getAProductById(item.product._id);
          return {
            ...response,
            quantityUser: 1,
            variantUser: response.variant[0]._id,
          };
        })
      );

      setProductList(products);
      const initialQuantities = products.reduce((acc, product) => {
        acc[product._id] = product.quantityUser;
        return acc;
      }, {});
      setQuantityUser(initialQuantities);
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    setCart([...dataUserCart]);
  }, [dataUserCart]);

  const updateQuantity = (id, quantityUser) => {
    setQuantityUser((prev) => ({ ...prev, [id]: quantityUser }));
  };
  const updateVariantUser = (id, variantUser) => {
    setVariantUser((prev) => ({ ...prev, [id]: variantUser }));
  };

  const removeProduct = (id) => {
    setProductList((prev) => prev.filter((prod) => prod._id !== id));
    const checkIfAdd = cart.findIndex((item) => item.product._id === id);
    if (checkIfAdd >= 0) {
      cart.splice(checkIfAdd, 1);
    } else {
      cart.push({ product: { _id: id } });
    }
    updateCartListUser(cart);
    localStorage.setItem("userCart", JSON.stringify(cart));
  };

  const handleCheckOut = () => {
    const checkoutData = productList.map((product) => ({
      ...product,
      quantityUser: quantityUser[product._id] || 1,
    }));

    console.log("Checkout Data:", checkoutData);
    // Proceed with the checkout process...
  };

  const calculateSubtotal = () =>
    productList.reduce((acc, product) => {
      const selectedVariant = product.variant.find(
        (v) => v._id === variantUser[product._id]
      );

      const variantPrice = selectedVariant
        ? selectedVariant.price
        : product.price;
      const quantity = quantityUser[product._id] || 1;

      return acc + variantPrice * quantity;
    }, 0);

  return (
    <div className="cartPage">
      <Meta title="Cart" />
      <BreadCrumb title="Cart" />
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <Box className="cart-wrapper">
          <div className="products">
            {productList.map((product) => (
              <Product
                key={product._id}
                prod={product}
                quantityUser={quantityUser[product._id]}
                updateQuantity={updateQuantity}
                variantUser={variantUser[product._id]}
                updateVariantUser={updateVariantUser}
                removeProduct={removeProduct}
              />
            ))}
          </div>

          <div className="priceInfo">
            <Link to="/product" className="button">
              Continue Shopping
            </Link>
            <div className="info">
              <h4>SubTotal: ${calculateSubtotal().toFixed(2)}</h4>
              <p>Taxes and shipping calculated at checkout</p>
              <button
                disabled={isLoading}
                onClick={handleCheckOut}
                className="button"
              >
                Checkout
              </button>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
};

export default Cart;
