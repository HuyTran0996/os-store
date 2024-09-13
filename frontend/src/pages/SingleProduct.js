import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

import "../styles/SingleProduct.scss";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";

const SingleProduct = () => {
  const [orderedProduct, setOrderedProduct] = useState(!false);
  return (
    <div className="singleProductPage">
      <Meta title="Dynamic Product Name" />
      <BreadCrumb title="Dynamic Product Name" />
      <div className="main-product-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>

      <div className="description-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description:</h4>
              <div className="bg-white p-3">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                  at accusamus et facere maxime ullam! Assumenda, mollitia neque
                  laboriosam modi repellat odit deserunt sapiente esse!
                  Provident magnam eos enim temporibus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="review-wrapper">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Reviews:</h4>
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
        </div>
      </section>

      <section className="popular-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
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
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;
