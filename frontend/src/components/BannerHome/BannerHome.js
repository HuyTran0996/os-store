import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./BannerHome.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 720 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 720, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const BannerHome = () => {
  const { dataAllBanner } = useSelector((state) => {
    return state.banner;
  });

  const data = dataAllBanner?.banners || [];

  return (
    <Carousel
      className="carouselBanner"
      responsive={responsive}
      transitionDuration={300}
      infinite={true}
      ssr={true}
      autoPlay={true}
      autoPlaySpeed={5000}
    >
      {data?.map((item) => {
        return (
          <div className="banner">
            <img src={item.images[0].url} alt="backdrop_path" />

            <div className="blurring"></div>

            <div className="content">
              <h1 className="title">{item.prodName}</h1>
              <p className="overview">{item.title} </p>
              <div className="ratingAndView">
                <p className="rating">{item.description}</p>
              </div>
              <Link to={`/product/${item.productID}`} className="detail">
                View Detail
              </Link>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default BannerHome;
