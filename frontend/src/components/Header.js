import React from "react";
import { NavLink, Link } from "react-router-dom";

import "../styles/Header.scss";
import { BsSearch } from "react-icons/bs";
// import logo from "../../public/images/logo.png";

const Header = () => {
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Return
              </p>
            </div>
            <div className="col-6">
              <p className="text-white text-end mb-0">
                Hotline:{" "}
                <a className="text-white" href="tel:+84123456789">
                  (+84) 123 456 789
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="d-flex align-items-center justify-content-between">
            {/* logo */}

            <Link to="/">
              <h3 className="text-white d-flex align-items-center">
                <img
                  style={{
                    width: "50px",
                    marginRight: "5px",
                  }}
                  src="/images/logo.png"
                  alt="logo"
                />
                <span className="d-none d-lg-inline">OS Store</span>
              </h3>
            </Link>

            {/* search box */}
            <div className="d-none d-lg-inline">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>

            {/* other */}

            <div className="header-upper-links d-flex align-items-center justify-content-between">
              <Link
                to="/compare-product"
                className="d-flex align-items-center gap-10 text-white"
              >
                <img src="/images/compare.svg" alt="compare" />

                <p className="mb-0 d-none d-lg-inline">
                  Compare <br />
                  Products
                </p>
              </Link>

              <Link
                to="/wishlist"
                className="d-flex align-items-center gap-10 text-white"
              >
                <img src="/images/wishlist.svg" alt="wishlist" />
                <p className="mb-0 d-none d-lg-inline">
                  Favorite <br />
                  Wishlist
                </p>
              </Link>

              <Link
                to="/login"
                className="d-flex align-items-center gap-10 text-white"
              >
                <img src="/images/user.svg" alt="user" />
                <p className="mb-0 d-none d-lg-inline">
                  Log in <br />
                  My Account
                </p>
              </Link>

              <Link
                to="/cart"
                className="d-flex align-items-center gap-10 text-white"
              >
                <img src="/images/cart.svg" alt="cart" />
                <div className="d-flex flex-column gap-10">
                  <span className="badge bg-white text-dark">0</span>
                  <p className="mb-0">$ 500</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="/images/menu.svg" alt="menu" />
                    <span className="d-inline-block">Shop Categories</span>
                  </button>

                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item text-white" to="">
                        Action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="">
                        Another action
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="">
                        Something else here
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="menu-links">
                  <div className="d-flex align-items-center gap-30">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
