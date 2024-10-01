import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid2,
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import ReactStars from "react-rating-stars-component";

import { useThunk } from "../hook/use-thunk";
import { getAllCategory } from "../store/thunks/fetchProductCategories";
import { getAllBrand } from "../store/thunks/fetchBrands";
import { getAllProduct } from "../store/thunks/fetchProduct";

import { showToast } from "../components/ToastMessage";
import { Loading } from "../components/Loading/Loading";
import ContainerLayout from "../components/ContainerLayout";
import ProductListFilter from "../components/Sidebar/ProductListFilter";
import gr4 from "../images/gr4.svg";
import gr3 from "../images/gr3.svg";
import gr2 from "../images/gr2.svg";
import gr from "../images/gr.svg";

const initialState = {
  category: [],
  brand: [],
  priceFrom: 0,
  priceTo: 0,
};

const style = {
  paper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  },

  select: {
    // width: "250px",
    height: "38px",
    padding: "6px 36px 6px 12px",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5",
  },

  icon: {
    display: "block",
    objectFit: "contain",
    width: "35px",
    height: "35px",
    padding: "8px",
  },
};

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filterString, setFilterString] = useState("");
  const [filter, setFilter] = useState(initialState);
  const [sort, setSort] = useState("created");

  const [getDataAllCategory] = useThunk(getAllCategory);
  const [getDataAllBrand] = useThunk(getAllBrand);
  const [getDataAllProduct] = useThunk(getAllProduct);

  const { dataAllProductCategory } = useSelector((state) => {
    return state.productCategories;
  });
  const { dataAllBrand } = useSelector((state) => {
    return state.brands;
  });
  const { dataAllProduct } = useSelector((state) => {
    return state.products;
  });

  // get category and brand for sidebar
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        await getDataAllCategory();
        await getDataAllBrand();
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  /////

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoading(true);
        await getDataAllProduct(`${filterString}&sort=${sort}`);
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [filterString, sort]);

  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };
  console.log("sada", sort);

  return (
    <ContainerLayout>
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <Box
          sx={{
            margin: "20px",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* Filter sidebar */}
          <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            <ProductListFilter
              dataAllProductCategory={dataAllProductCategory}
              dataAllBrand={dataAllBrand}
              setFilterString={setFilterString}
              filter={filter}
              setFilter={setFilter}
              initialState={initialState}
            />
          </Box>

          {/* Main */}
          <Box sx={{ width: "100%" }}>
            <Paper elevation={10} sx={style.paper}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="p"
                  sx={{ width: "70px", fontSize: "16px" }}
                >
                  Sort By:
                </Typography>
                <Select
                  sx={style.select}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => handleChangeSort(e)}
                  defaultValue="created"
                >
                  <MenuItem value="-sold">Best selling</MenuItem>
                  <MenuItem value="title">Alphabetically, A-Z</MenuItem>
                  <MenuItem value="-title">Alphabetically, Z-A</MenuItem>
                  <MenuItem value="price">Price, low to high</MenuItem>
                  <MenuItem value="-price">Price, high to low</MenuItem>
                  <MenuItem value="-created">Date, old to new</MenuItem>
                  <MenuItem value="created">Date, new to old</MenuItem>
                </Select>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="p"
                  sx={{ width: "100px", fontSize: "16px" }}
                >
                  {dataAllProduct?.total} Products
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton>
                    <img style={style.icon} src={gr4} alt="grid" />
                  </IconButton>
                  <IconButton>
                    <img style={style.icon} src={gr3} alt="grid" />
                  </IconButton>
                  <IconButton>
                    <img style={style.icon} src={gr2} alt="grid" />
                  </IconButton>
                  <IconButton>
                    <img style={style.icon} src={gr} alt="grid" />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}
    </ContainerLayout>
  );
};

export default ProductList;
