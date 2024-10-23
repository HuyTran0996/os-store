import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Rating } from "@mui/material";
import "../styles/ProductCard.scss";

import { useThunk } from "../hook/use-thunk";
import { toggleWishlist } from "../store/thunks/fetchProduct";
import { updateCompareList } from "../store/thunks/fetchUsers";
import { showToast } from "../components/ToastMessage";

import { FaHeart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { IoGitCompareOutline } from "react-icons/io5";
import prodCompare from "../images/prodCompare.svg";
import add from "../images/add-cart.svg";
import view from "../images/view.svg";
import wish from "../images/wish.svg";

const ProductCard = (props) => {
  const { grid, prod } = props;
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [checkIfWish, setCheckIfWish] = useState(false);
  const [checkIfCompare, setCheckIfCompare] = useState(false);
  const [toggleUserWishlist] = useThunk(toggleWishlist);
  const [updateCompareListUser] = useThunk(updateCompareList);

  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

  //note: get the wishlist on main page, don't get wishlist here (Unnecessary API Calls for every single card)
  const { dataUserWishList } = useSelector((state) => {
    return state.users;
  });

  const handelUserWishList = async () => {
    if (!parsedUserData) {
      return showToast("Please Login", "error");
    }
    if (parsedUserData.note === "Your Section Is Expired") {
      return showToast("Your Section Is Expired", "error");
    }
    if (parsedUserData && !parsedUserData.note) {
      try {
        setIsLoading(true);
        await toggleUserWishlist({ prodId: prod._id });
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setCheckIfWish(dataUserWishList.find((item) => item._id === prod._id));
  }, [dataUserWishList]);
  useEffect(() => {
    const compareList = JSON.parse(localStorage.getItem("compareList") || "[]");
    setCheckIfCompare(compareList.findIndex((item) => item.id === prod._id));
  }, []);

  const handleToggleCompare = () => {
    const compareList = JSON.parse(localStorage.getItem("compareList") || "[]");
    const checkIfAdd = compareList.findIndex((item) => item.id === prod._id);
    if (checkIfAdd >= 0) {
      compareList.splice(checkIfAdd, 1);
    } else {
      compareList.push({ id: prod._id });
    }
    setCheckIfCompare(compareList.findIndex((item) => item.id === prod._id));

    updateCompareListUser(compareList);

    localStorage.setItem("compareList", JSON.stringify(compareList));
  };

  return (
    <div
      className={`${
        location.pathname === "/product"
          ? `gr-${grid}`
          : location.pathname === "/wishlist"
          ? "wishlist"
          : "forCarousel"
      }`}
    >
      <div className="product-card">
        <div className="wishlist-icon">
          <button disabled={isLoading} onClick={handelUserWishList}>
            {checkIfWish ? (
              <FaHeart style={{ color: "red" }} className="icon" />
            ) : (
              <AiOutlineHeart className="icon" />
            )}
          </button>
        </div>
        <div className="action-bar">
          <button onClick={handleToggleCompare} disabled={isLoading}>
            {/* <img src={prodCompare} alt="compare" /> */}
            <IoGitCompareOutline
              style={checkIfCompare >= 0 ? { color: "red" } : ""}
              className="icon"
            />
          </button>

          <button disabled={isLoading}>
            <img src={add} alt="addCart" />
          </button>
          {/* <button disabled={isLoading}>
            <img src={view} alt="view" />
          </button> */}
        </div>

        <Link to={`/product/${prod?._id}`}>
          <div className="product-image">
            <img src={prod?.images?.[0]?.url} alt="product-image" />
            <img src={prod?.images?.[1]?.url} alt="product-image" />
          </div>

          <div className="product-details">
            <h6 className="brand">{prod?.brand}</h6>
            <h5 className="product-title">{prod?.title}</h5>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rating value={prod?.totalrating * 1} precision={0.5} readOnly />(
              {prod?.ratings?.length})
            </div>
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
              {prod?.description}
            </p>
            <p className="price">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(prod?.price)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
