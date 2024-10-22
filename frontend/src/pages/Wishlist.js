import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import "../styles/Wishlist.scss";
import { useThunk } from "../hook/use-thunk";
import { userWishList } from "../store/thunks/fetchUsers";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { showToast } from "../components/ToastMessage";
import { Loading } from "../components/Loading/Loading";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [getUserWishList] = useThunk(userWishList);
  const { dataUserWishList } = useSelector((state) => {
    return state.users;
  });

  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

  const getData = async () => {
    try {
      setIsLoading(true);
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
