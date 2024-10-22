import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import "../styles/ProductCard.scss";
import wish from "../images/wish.svg";
import prodCompare from "../images/prodCompare.svg";
import view from "../images/view.svg";
import add from "../images/add-cart.svg";

import { toggleWishlist } from "../store/thunks/fetchProduct";
import { userWishList } from "../store/thunks/fetchUsers";
import { showToast } from "../components/ToastMessage";
import { useThunk } from "../hook/use-thunk";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

const ProductCard = (props) => {
  const { grid, prod } = props;
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [toggleUserWishlist] = useThunk(toggleWishlist);
  const [getUserWishList] = useThunk(userWishList);
  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

  const { dataUserWishList } = useSelector((state) => {
    return state.users;
  });

  const getData = async (action) => {
    try {
      setIsLoading(true);
      await action;

      if (parsedUserData && !parsedUserData.note) {
        await getUserWishList();
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
        await getUserWishList();
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const checkIfWish = dataUserWishList.find((item) => item._id === prod._id);

  return (
    <div
      className={`${
        location.pathname === "/product" ? `gr-${grid}` : "forCarousel"
      }`}
    >
      <Link
        to={`/product/${prod?._id}`}
        className="product-card position-relative"
      >
        <div className="wishlist-icon">
          {/* <button>
            <img src={wish} alt="wishlist" />
          </button> */}

          <button disabled={isLoading} onClick={handelUserWishList}>
            {checkIfWish ? (
              <FaHeart style={{ color: "red" }} className="icon" />
            ) : (
              <AiOutlineHeart className="icon" />
            )}
          </button>
        </div>

        <div className="product-image">
          <img src={prod?.images[0].url} alt="product-image" />
          <img src={prod?.images[1].url} alt="product-image" />
        </div>

        <div className="product-details">
          <h6 className="brand">{prod?.brand}</h6>
          <h5 className="product-title">{prod?.title}</h5>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ReactStars
              count={5}
              value={prod?.totalrating}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
            ({prod?.ratings?.length})
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

        <div className="action-bar">
          <button disabled={isLoading}>
            <img src={prodCompare} alt="compare" />
          </button>
          {/* <button disabled={isLoading}>
            <img src={view} alt="view" />
          </button> */}
          <button disabled={isLoading}>
            <img src={add} alt="addCart" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
