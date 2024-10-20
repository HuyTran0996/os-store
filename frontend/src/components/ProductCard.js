import React from "react";
import { Link, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import "../styles/ProductCard.scss";
import wish from "../images/wish.svg";
import prodCompare from "../images/prodCompare.svg";
import view from "../images/view.svg";
import add from "../images/add-cart.svg";

const ProductCard = (props) => {
  const { grid, prod } = props;
  const location = useLocation();

  return (
    <div
      className={`${
        location.pathname === "/product" ? `gr-${grid}` : "forCarousel"
      }`}
    >
      <Link to="/product/:id" className="product-card position-relative">
        <div className="wishlist-icon">
          <button>
            <img src={wish} alt="wishlist" />
          </button>
        </div>

        <div className="product-image">
          <img src={prod.images[0].url} alt="product-image" />
          <img src={prod.images[1].url} alt="product-image" />
        </div>

        <div className="product-details">
          <h6 className="brand">{prod.brand}</h6>
          <h5 className="product-title">{prod.title}</h5>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ReactStars
              count={5}
              // onChange={ratingChanged}
              value={prod.totalrating}
              edit={false}
              size={24}
              activeColor="#ffd700"
            />
            ({prod.ratings?.length})
          </div>
          <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
            {prod.description}
          </p>
          <p className="price">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(prod.price)}
          </p>
        </div>

        <div className="action-bar">
          <button>
            <img src={prodCompare} alt="compare" />
          </button>
          <button>
            <img src={view} alt="view" />
          </button>
          <button>
            <img src={add} alt="addCart" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
