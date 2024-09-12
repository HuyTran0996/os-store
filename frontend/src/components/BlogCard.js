import React from "react";
import { Link } from "react-router-dom";
import "../styles/BlogCard.scss";

const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="cart-image">
        <img className="img-fluid w-100" src="images/blog-1.jpg" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">1 Dec, 2024</p>
        <h5 className="title">A beautiful Sunday morning renaissance</h5>
        <p className="desc">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
          sapiente exercitationem praesentium numquam impedit tempore.
        </p>
        <Link to="/" className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
