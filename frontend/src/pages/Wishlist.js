import React, { useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import "../styles/Wishlist.scss";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import { Loading } from "../components/Loading/Loading";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { dataUserWishList } = useSelector((state) => {
    return state.users;
  });

  return (
    <Box className="wishlistPage">
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <div className="wishlist-wrapper">
          {dataUserWishList.map((prod, index) => {
            return (
              <div
                className="wish"
                key={`product-${index}`}
                style={{ "--i": `${index + 1}` }}
              >
                <ProductCard key={`product-${index}`} prod={prod} />
              </div>
            );
          })}
        </div>
      )}
    </Box>
  );
};

export default Wishlist;
