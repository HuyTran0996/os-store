import React from "react";

import "../styles/Wishlist.scss";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

const Wishlist = () => {
  return (
    <div className="wishlistPage">
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <div className="wishlist-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />

                <div className="wishlist-card-image">
                  <img
                    className="img-fluid w-100"
                    src="images/watch.jpg"
                    alt="watch"
                  />
                </div>

                <div className="py-3 px-3">
                  <h5 className="title">
                    Apple Airpods Pro (2nd Gen) with MagSafe Charging Case
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />

                <div className="wishlist-card-image">
                  <img
                    className="img-fluid w-100"
                    src="images/watch.jpg"
                    alt="watch"
                  />
                </div>

                <div className="py-3 px-3">
                  <h5 className="title">
                    Apple Airpods Pro (2nd Gen) with MagSafe Charging Case
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="wishlist-card position-relative">
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />

                <div className="wishlist-card-image">
                  <img
                    className="img-fluid w-100"
                    src="images/watch.jpg"
                    alt="watch"
                  />
                </div>

                <div className="py-3 px-3">
                  <h5 className="title">
                    Apple Airpods Pro (2nd Gen) with MagSafe Charging Case
                  </h5>
                  <h6 className="price">$ 100</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
