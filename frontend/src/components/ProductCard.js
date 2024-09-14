import React from "react";
import { Link, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import "../styles/ProductCard.scss";

const ProductCard = (props) => {
  const { grid } = props;
  const location = useLocation();

  return (
    <div
      className={`${location.pathname === "/product" ? `gr-${grid}` : "col-3"}`}
    >
      <Link to="/product/:id" className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <button className="border-0 bg-transparent">
            <img src="/images/wish.svg" alt="wishlist" />
          </button>
        </div>

        <div className="product-image">
          <img
            className="img-fluid"
            src="/images/watch.jpg"
            alt="product-image"
          />
          <img
            className="img-fluid"
            src="/images/watch-1.avif"
            alt="product-image"
          />
        </div>

        <div className="product-details">
          <h6 className="brand">Havels</h6>
          <h5 className="product-title">
            Kids headphones bulk 10 pack multi colored for students
          </h5>
          <ReactStars
            count={5}
            // onChange={ratingChanged}
            value={3}
            edit={false}
            size={24}
            activeColor="#ffd700"
          />
          <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
            possimus commodi consequuntur nulla reprehenderit alias quas. Velit
            neque aliquam enim iure, possimus nisi alias incidunt animi placeat
            dolores iusto perspiciatis?
          </p>
          <p className="price">$100.00</p>
        </div>

        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <button className="border-0 bg-transparent">
              <img src="/images/prodcompare.svg" alt="compare" />
            </button>
            <button className="border-0 bg-transparent">
              <img src="/images/view.svg" alt="view" />
            </button>
            <button className="border-0 bg-transparent">
              <img src="/images/add-cart.svg" alt="addCart" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
