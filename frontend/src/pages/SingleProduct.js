import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";

import "../styles/SingleProduct.scss";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";

import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";

const SingleProduct = () => {
  const props = {
    // width: 400,
    height: 600,
    zoomWidth: 600,
    // zoomPosition: "original",
    img: "https://media.wired.com/photos/61bd571ff6b645152a4dc4ad/master/pass/Evolution-Luxury-Watches-Oris.jpg",
  };
  const [orderedProduct, setOrderedProduct] = useState(!false);

  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <div className="singleProductPage">
      <Meta title="Dynamic Product Name" />
      <BreadCrumb title="Dynamic Product Name" />

      <Container class1="main-product-wrapper py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div className="imageZoom">
                <ReactImageZoom {...props} />
              </div>
            </div>

            <div className="other-product-images d-flex flex-wrap gap-15">
              <div>
                <img
                  src="/images/watch.jpg"
                  alt="watch"
                  className="img-fluid"
                />
              </div>
              <div>
                <img
                  src="/images/watch.jpg"
                  alt="watch"
                  className="img-fluid"
                />
              </div>
              <div>
                <img
                  src="/images/watch.jpg"
                  alt="watch"
                  className="img-fluid"
                />
              </div>
              <div>
                <img
                  src="/images/watch.jpg"
                  alt="watch"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="main-product-detail">
              <div className="border-bottom">
                <h3 className="title">
                  SwapME Braided Nylon Woven Smart Watch
                </h3>
              </div>

              <div className="border-bottom py-3">
                <p className="price">$ 100</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    // onChange={ratingChanged}
                    value={3}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(2 reviews)</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a review
                </a>
              </div>

              <div className="border-bottom py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type:</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand:</h3>
                  <p className="product-data">Havels</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category:</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tag:</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availability:</h3>
                  <p className="product-data">In Stock</p>
                </div>

                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size:</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color:</h3>
                  <Color />
                </div>

                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading">Quantity:</h3>
                  <div>
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      style={{ width: "70px" }}
                      id=""
                      className="form-control"
                    />
                  </div>

                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button className="button border-0" type="submit">
                      Add To Cart
                    </button>
                    <button className="button signup">Buy It Now</button>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" />
                      Add To Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" />
                      Add To Wishlist
                    </a>
                  </div>
                </div>

                <div className="d-flex gap-10 flex-column my-3">
                  <h3 className="product-heading">Shipping & Return:</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br />
                    We ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>

                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        "https://media.wired.com/photos/61bd571ff6b645152a4dc4ad/master/pass/Evolution-Luxury-Watches-Oris.jpg"
                      );
                      alert("link is copied");
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <h4>Description:</h4>
            <div className="bg-white p-3">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, at
                accusamus et facere maxime ullam! Assumenda, mollitia neque
                laboriosam modi repellat odit deserunt sapiente esse! Provident
                magnam eos enim temporibus.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="review-wrapper">
        <div className="row">
          <div className="col-12">
            <h4 id="review">Reviews:</h4>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex gap-10 align-items-center">
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      value={3}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 reviews</p>
                  </div>
                </div>

                {orderedProduct && (
                  <div>
                    <a
                      className="text-dark text-decoration-underline"
                      href="/#"
                    >
                      Write a review
                    </a>
                  </div>
                )}
              </div>

              <div className="review-form py-4">
                <h4>Write a review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      value={3}
                      edit={true}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols={30}
                      rows={4}
                      placeholder="Comment..."
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>

              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Navdeep</h6>
                    <ReactStars
                      count={5}
                      // onChange={ratingChanged}
                      value={3}
                      edit={false}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Soluta doloremque hic facere aliquam. Unde excepturi, quia
                    vitae iure nihil facere vero sed, itaque delectus repellat
                    earum aspernatur, saepe minus facilis?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>

        <div className="row">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
    </div>
  );
};

export default SingleProduct;
