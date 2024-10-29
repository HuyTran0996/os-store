import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import { useThunk } from "../hook/use-thunk";

import { getAProduct } from "../store/thunks/fetchProduct";
import { updateCompareList } from "../store/thunks/fetchUsers";
import { Loading } from "../components/Loading/Loading";

import "../styles/CompareProduct.scss";
import { showToast } from "../components/ToastMessage";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

const CompareProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);

  const [updateCompareListUser] = useThunk(updateCompareList);
  const [getAProductById] = useThunk(getAProduct);
  const { dataUserCompare } = useSelector((state) => {
    return state.users;
  });

  const getData = async (action) => {
    try {
      setIsLoading(true);
      await action;

      const products = await Promise.all(
        dataUserCompare.map(async (item) => {
          const response = await getAProductById(item.id);
          return response;
        })
      );
      setProductList(products);
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [dataUserCompare]);

  const handleToggleCompare = (id) => {
    const compareList = JSON.parse(localStorage.getItem("compareList") || "[]");
    const checkIfAdd = compareList.findIndex((item) => item.id === id);
    if (checkIfAdd >= 0) {
      compareList.splice(checkIfAdd, 1);
    } else {
      compareList.push({ id: id });
    }

    updateCompareListUser(compareList);

    localStorage.setItem("compareList", JSON.stringify(compareList));
  };

  return (
    <div className="compareProductPage">
      <Meta title="Compare Products" />
      <BreadCrumb title="Compare Products" />
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <Box className="compare-product-wrapper">
          {productList.map((prod, index) => {
            const colors = prod.variant.filter((v) => v.tag === "color");
            const sizes = prod.variant.filter((v) => v.tag === "size");
            const variants = prod.variant.filter((v) => v.tag === "variant");

            return (
              <div
                key={`product-${index}`}
                className="compare-product-card"
                style={{ "--i": `${index + 1}` }}
              >
                <img
                  src="images/cross.svg"
                  alt="cross"
                  className="cross"
                  onClick={() => handleToggleCompare(prod._id)}
                />
                <div className="product-card-image">
                  <img src={prod.images[0].url} alt="product" />
                </div>

                <div className="compare-product-detail">
                  <h5 className="title">{prod.title}</h5>
                  <h6 className="price">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(prod.price)}
                  </h6>

                  <div className="product-detail">
                    <h5>Brand:</h5>
                    <p>{prod.brand}</p>
                  </div>

                  <div className="product-detail">
                    <h5>Type:</h5>
                    <p>{prod.category}</p>
                  </div>

                  <div className="product-detail">
                    <h5>Availability:</h5>
                    <p>{prod.quantity}</p>
                  </div>

                  <div className="product-detail">
                    <h5>Color:</h5>
                    <div className="wrapper">
                      {colors?.map((c, index) => {
                        return (
                          <div
                            key={`color-${index}`}
                            className="color"
                            style={{
                              backgroundColor: c.colorCode,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="product-detail">
                    <h5>Size:</h5>
                    <div className="wrapper">
                      {sizes?.map((s, index) => {
                        return (
                          <span key={`size-${index}`} className="size">
                            {s.variantName}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="product-detail variant">
                    <h5>Variant:</h5>
                    <div className="wrapper">
                      {variants?.map((s, index) => {
                        return (
                          <span key={`size-${index}`} className="size">
                            {s.variantName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Box>
      )}
    </div>
  );
};

export default CompareProduct;
