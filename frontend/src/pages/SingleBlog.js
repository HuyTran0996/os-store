import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import "../styles/SingleBlogPage.scss";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

import { HiOutlineArrowLeft } from "react-icons/hi";
import underConstruction from "../images/underConstruction.png";

const SingleBlog = () => {
  return (
    <div className="singleBlogPage">
      <Meta title="Dynamic Blog Name" />
      <BreadCrumb title="Dynamic Blog Name" />
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

export default SingleBlog;
