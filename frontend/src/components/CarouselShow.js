import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  xl: {
    breakpoint: { max: 1536, min: 1300 },
    items: 5,
    slidesToSlide: 5, // optional, default to 1.
  },
  lg: {
    breakpoint: { max: 1300, min: 1150 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  md: {
    breakpoint: { max: 1150, min: 660 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  sm: {
    breakpoint: { max: 660, min: 0 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
};
const prodPage = {
  xl: {
    breakpoint: { max: 1536, min: 1300 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  lg: {
    breakpoint: { max: 1300, min: 1150 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  md: {
    breakpoint: { max: 1150, min: 660 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  sm: {
    breakpoint: { max: 660, min: 0 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
};

const CarouselShow = ({ children, addStyle }) => {
  let res;
  if (addStyle === "prodPage") {
    res = prodPage;
  } else {
    res = responsive;
  }
  return (
    <Carousel
      responsive={res}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      transitionDuration={500}
      infinite={true}
      ssr={true}
    >
      {children}
    </Carousel>
  );
};

export default CarouselShow;
