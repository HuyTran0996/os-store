import React from "react";
import { Link } from "react-router-dom";

import "../styles/SingleBlogPage.scss";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { HiOutlineArrowLeft } from "react-icons/hi";

const SingleBlog = () => {
  return (
    <div className="singleBlogPage">
      <Meta title="Dynamic Blog Name" />
      <BreadCrumb title="Dynamic Blog Name" />
      <div className="blog-wrapper py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="single-blog-card">
                <Link to="/blogs" className="d-flex align-items-center gap-10">
                  <HiOutlineArrowLeft className="fs-4" />
                  Go back to Blogs
                </Link>
                <h3 className="title">
                  How to Write a Blog Post Your Readers Will Love in 5 Steps
                </h3>
                <img
                  className="img-fluid w-100 my-4"
                  src="/images/blog-1.jpg"
                  alt="blog"
                />
                <p>
                  What You Need to Know about the Facebook Product Design
                  Interview and What to do about it Vinyl lumbersexual hella hot
                  chicken aesthetic, intelligentsia raclette gentrify activated
                  charcoal VHS. Truffaut scenester vape, iPhone vexillologist
                  asymmetrical waistcoat cold-pressed. Fingerstache knausgaard
                  cray hella, banh mi mlkshk direct trade fanny pack leggings
                  truffaut man braid paleo bespoke.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
