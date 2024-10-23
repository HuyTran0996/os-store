import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

import "../styles/Home.scss";
import { showToast } from "../components/ToastMessage";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ContainerLayout from "../components/ContainerLayout";
import BlogCard from "../components/BlogCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import CarouselShow from "../components/CarouselShow";
import { Loading } from "../components/Loading/Loading";
import { services } from "../data/data";

import { getAllBanner } from "../store/thunks/fetchBanners";
import { getAllCategory } from "../store/thunks/fetchProductCategories";
import { getAllBrand } from "../store/thunks/fetchBrands";
import { getAllProduct } from "../store/thunks/fetchProduct";
import { userWishList } from "../store/thunks/fetchUsers";
import { useThunk } from "../hook/use-thunk";

import imageNotFound from "../images/imageNotFound.png";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bestProduct, setBestProduct] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  /////////// thunk////////////
  const [getDataAllBanner] = useThunk(getAllBanner);
  const [getDataAllCategory] = useThunk(getAllCategory);
  const [getDataAllBrand] = useThunk(getAllBrand);
  const [getDataAllProduct] = useThunk(getAllProduct);
  const [getUserWishList] = useThunk(userWishList);
  ////////////////////

  ////////////data////////////
  const { dataAllBanner } = useSelector((state) => {
    return state.banner;
  });
  const { dataAllProductCategory } = useSelector((state) => {
    return state.productCategories;
  });
  const { dataAllBrand } = useSelector((state) => {
    return state.brands;
  });
  const { dataAllProduct } = useSelector((state) => {
    return state.products;
  });
  ////////////////
  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

  const getData = async () => {
    try {
      setIsLoading(true);
      await getDataAllBanner();
      await getDataAllCategory();
      await getDataAllBrand();
      setBestProduct(await getDataAllProduct(`sort=-sold&page=1`));
      setNewProduct(await getDataAllProduct(`sort=-createdAt&page=1`));
      if (parsedUserData && !parsedUserData.note) {
        await getUserWishList();
      }
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
  const categories = dataAllProductCategory?.categories || [];
  const brands = dataAllBrand?.brands || [];
  const mainBanner =
    banners.length > 0 ? banners[0].images[0]?.url : imageNotFound;

  return (
    <>
      <Meta title="OS Store" />
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <Box className="homePage">
          <Box className="banner px">
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

          <Box className="contents">
            <Box className="services px">
              {services.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <img src={item.image} alt="services" />
                    <div>
                      <h6>{item.title}</h6>
                      <p className="mb-0">{item.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </Box>

            <Box className="bestSeller px">
              <h3 className="section-heading">Best Sellers</h3>
              <CarouselShow>
                {bestProduct.products?.length > 0 &&
                  bestProduct.products?.map((prod, index) => (
                    <ProductCard key={`best-${index}`} prod={prod} />
                  ))}
              </CarouselShow>
            </Box>

            <Box className="brands">
              <Marquee autoFill={true} className="marquee">
                {brands.map((brand, index) => (
                  <Link
                    to={`/product?category=${brand.title}`}
                    key={`brand-${index}`}
                    className="element"
                  >
                    <img src={brand.images[0].url} alt="brand" />
                  </Link>
                ))}
              </Marquee>
            </Box>

            <Box className="newArrivals px">
              <h3 className="section-heading">New Arrivals</h3>
              <CarouselShow>
                {newProduct.products?.length > 0 &&
                  newProduct.products?.map((prod, index) => (
                    <ProductCard key={`best-${index}`} prod={prod} />
                  ))}
              </CarouselShow>
            </Box>

            <Box className="categories px">
              <h3 className="section-heading">Categories</h3>
              <div className="wrapper">
                {categories.map((category, index) => (
                  <Link
                    to={`/product?category=${category.title}`}
                    key={`category-${index}`}
                  >
                    <div>
                      <h5 className="title">{category.title}</h5>
                      <p>view all</p>
                    </div>
                    <img src={category.images[0].url} alt="category" />
                  </Link>
                ))}
              </div>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Home;
