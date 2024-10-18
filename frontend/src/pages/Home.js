import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

import "../styles/Home.scss";
import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { Loading } from "../components/Loading/Loading";
import { services } from "../data/data";

import { getAllBanner } from "../store/thunks/fetchBanners";
import { useThunk } from "../hook/use-thunk";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getDataAllBanner] = useThunk(getAllBanner);
  const { dataAllBanner } = useSelector((state) => {
    return state.banner;
  });
  const getData = async () => {
    try {
      setIsLoading(true);
      await getDataAllBanner();
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const banners = dataAllBanner?.banners || [];
  const mainBanner =
    banners.length > 0 ? banners[0].images[0]?.url : "images/imageNotFound.png";

  return (
    <ContainerLayout>
      <Meta title="OS Store" />
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <Box className="homePage">
          <Box className="banner">
            <div className="main-banner">
              <img src={mainBanner} alt="main-banner" />
              <div className="main-banner-content">
                <h4>{banners[0]?.title}</h4>
                <h5>{banners[0]?.prodName}</h5>
                <p>{banners[0]?.description}</p>
                <Link
                  to={`/product/${banners[0]?.productID}`}
                  className="button"
                >
                  Buy Now
                </Link>
              </div>
            </div>

            <div className="subBanner">
              {banners.slice(1).map((banner, index) => (
                <Link
                  key={`${index}-banner`}
                  className={`small-banner cl-${index}`}
                  to={`/product/${banner.productID}`}
                >
                  <img src={banner.images[0]?.url} alt="main-banner" />
                  <div className="small-banner-content">
                    <h4>{banner.title}</h4>
                    <h5>{banner.prodName}</h5>
                    <p>{banner.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Box>
        </Box>
      )}
    </ContainerLayout>
  );
};

export default Home;
