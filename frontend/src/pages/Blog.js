import React from "react";
import { Box } from "@mui/material";
import "../styles/Blog.scss";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";

import underConstruction from "../images/underConstruction.png";

const Blog = () => {
  return (
    <div className="blogPage">
      <Meta title="Blog" />
      <BreadCrumb title="Blog" />

      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "0 50px" }}
      >
        <img
          style={{ width: "100%", objectFit: "contain" }}
          src={underConstruction}
          alt="under-construction"
        />
      </Box>
    </div>
  );
};

export default Blog;
