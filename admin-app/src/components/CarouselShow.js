import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  bigScreen: {
    breakpoint: { max: 1536, min: 1200 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 1200, min: 900 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CarouselShow = ({ children }) => {
  return (
    <Carousel
      responsive={responsive}
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
