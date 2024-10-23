import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import "../styles/Wishlist.scss";
import { useThunk } from "../hook/use-thunk";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { showToast } from "../components/ToastMessage";
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
            return <ProductCard key={`product-${index}`} prod={prod} />;
          })}
        </div>
      )}
    </Box>
  );
};

export default Wishlist;
