import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

import "../styles/Home.scss";
import { showToast } from "../components/ToastMessage";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import ContainerLayout from "../components/ContainerLayout";
import { Loading } from "../components/Loading/Loading";
import { services } from "../data/data";

const Home = () => {
  return (
    <ContainerLayout>
      <Box className="homePage">
        <Box className="banner">
          <div className="main-banner">
            <img src="/images/main-banner-1.jpg" alt="main-banner" />
            <div className="main-banner-content">
              <h4>SUPERCHARGED FOR PROS</h4>
              <h5>iPad S13+ Pro.</h5>
              <p>From $999.00 or $41.62/mo.</p>
              <Link className="button">Buy Now</Link>
            </div>
          </div>

          <div className="subBanner">
            <div className="small-banner">
              <img src="/images/catbanner-01.jpg" alt="main-banner" />
              <div className="small-banner-content">
                <h4>Best Sake</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>
                  From $999.00 <br /> or $41.62/mo.
                </p>
              </div>
            </div>

            <div className="small-banner">
              <img src="/images/catbanner-02.jpg" alt="main-banner" />
              <div className="small-banner-content">
                <h4>New Arrival</h4>
                <h5>Buy Ipad Air.</h5>
                <p>
                  From $999.00 <br />
                  or $41.62/mo.
                </p>
              </div>
            </div>

            <div className="small-banner">
              <img src="/images/catbanner-03.jpg" alt="main-banner" />
              <div className="small-banner-content">
                <h4>SUPERCHARGED FOR PROS</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>
                  From $999.00 <br />
                  or $41.62/mo.
                </p>
              </div>
            </div>

            <div className="small-banner">
              <img src="/images/catbanner-04.jpg" alt="main-banner" />
              <div className="small-banner-content">
                <h4>SUPERCHARGED FOR PROS</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>
                  From $999.00 <br />
                  or $41.62/mo.
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default Home;
