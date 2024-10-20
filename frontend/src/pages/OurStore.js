import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Drawer,
} from "@mui/material";

import { useThunk } from "../hook/use-thunk";
import { getAllCategory } from "../store/thunks/fetchProductCategories";
import { getAllBrand } from "../store/thunks/fetchBrands";
import {
  getAllProduct,
  smartProductSearch,
} from "../store/thunks/fetchProduct";

import "../styles/OurStore.scss";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { showToast } from "../components/ToastMessage";
import { Loading } from "../components/Loading/Loading";
import ProductListFilter from "../components/Sidebar/ProductListFilter";
import ProductCard from "../components/ProductCard";
import Paginate from "../components/Pagination";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
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
  bigBox: {
    margin: "20px",
    display: "flex",
    justifyContent: "space-between",
    gap: 2,
  },
  paper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  },
  boxSort: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "300px",
  },
  boxGrid: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },

  select: {
    height: "38px",
    padding: "6px 36px 6px 12px",
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5",
  },

  icon: {
    display: "block",
    objectFit: "contain",
    width: "25px",
    height: "25px",
    padding: "4px",
  },

  boxProduct: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: "20px 0",
    width: "100%",
    position: "relative",
  },

  boxPagination: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
};

const OurStore = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [grid, setGrid] = useState(6);
  const [filterString, setFilterString] = useState("");
  const [filter, setFilter] = useState(initialState);
  const [sort, setSort] = useState("created");

  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  let search = String(searchParams.get("search"));

  const [getDataAllCategory] = useThunk(getAllCategory);
  const [getDataAllBrand] = useThunk(getAllBrand);
  const [getDataAllProduct] = useThunk(getAllProduct);
  const [smartProductSearching] = useThunk(smartProductSearch);

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

        if (search.trim() === "" || search === "null") {
          await getDataAllProduct(`${filterString}&sort=${sort}&page=${page}`);
        } else {
          smartProductSearching({ sort, page, searchField: search.trim() });
        }
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [filterString, sort, page, search]);

  // Set grid size based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 600px)").matches) {
        setGrid(6); // show 2 items
      } else if (window.matchMedia("(max-width: 900px)").matches) {
        setGrid(6); // show 2 items
      } else if (window.matchMedia("(max-width: 1200px)").matches) {
        setGrid(4); // show 3 items
      } else if (window.matchMedia("(max-width: 1536px)").matches) {
        setGrid(3); // show 4 items
      }
    };

    handleResize(); // Set initial grid size
    window.addEventListener("resize", handleResize); // Update grid size on resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
    };
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="ourStorePage">
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />
      <Box className="px">
        {isLoading ? (
          <Loading message="Loading..." />
        ) : (
          <Box sx={style.bigBox}>
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
            <Box sx={{ width: "100%", position: "relative" }}>
              {/* Sort and Grid bar */}
              <Paper elevation={5} sx={style.paper}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {/* ToggleFilter menu for small screen */}
                  <Box>
                    <IconButton
                      onClick={toggleDrawer(true)}
                      sx={{ display: { xs: "block", sm: "block", md: "none" } }}
                    >
                      <FilterAltIcon fontSize="large" />
                    </IconButton>

                    <Drawer
                      open={open}
                      onClose={toggleDrawer(false)}
                      anchor="right"
                    >
                      <Box
                        sx={{
                          width: 370,
                          height: "100vh",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                        role="presentation"
                      >
                        <Box sx={style.boxSort}>
                          <Typography
                            variant="p"
                            sx={{ margin: "0 5px", fontSize: "16px" }}
                          >
                            Sort By:
                          </Typography>
                          <Select
                            sx={style.select}
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            defaultValue="created"
                          >
                            <MenuItem value="-sold">Best selling</MenuItem>
                            <MenuItem value="title">
                              Alphabetically, A-Z
                            </MenuItem>
                            <MenuItem value="-title">
                              Alphabetically, Z-A
                            </MenuItem>
                            <MenuItem value="price">
                              Price, low to high
                            </MenuItem>
                            <MenuItem value="-price">
                              Price, high to low
                            </MenuItem>
                            <MenuItem value="-created">
                              Date, old to new
                            </MenuItem>
                            <MenuItem value="created">
                              Date, new to old
                            </MenuItem>
                          </Select>
                        </Box>

                        <ProductListFilter
                          dataAllProductCategory={dataAllProductCategory}
                          dataAllBrand={dataAllBrand}
                          setFilterString={setFilterString}
                          filter={filter}
                          setFilter={setFilter}
                          initialState={initialState}
                        />
                      </Box>
                    </Drawer>
                  </Box>

                  {/* Sort */}
                  <Box
                    sx={{
                      ...style.boxSort,
                      display: { xs: "none", sm: "none", md: "flex" },
                    }}
                  >
                    <Typography
                      variant="p"
                      sx={{ margin: "0 5px", fontSize: "16px" }}
                    >
                      Sort By:
                    </Typography>
                    <Select
                      sx={style.select}
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
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
                </Box>

                {/* Grid */}
                <Box sx={style.boxGrid}>
                  <Typography
                    variant="p"
                    sx={{ margin: "0 5px", fontSize: "16px" }}
                  >
                    {dataAllProduct?.total} Products
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <IconButton
                      onClick={() => setGrid(3)}
                      sx={{
                        backgroundColor: grid === 3 ? "aqua" : "none",
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "none",
                          lg: "block",
                          xl: "block",
                        },
                      }}
                    >
                      <img style={style.icon} src={gr4} alt="grid" />
                    </IconButton>

                    <IconButton
                      onClick={() => setGrid(4)}
                      sx={{
                        backgroundColor: grid === 4 ? "aqua" : "none",
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "block",
                          lg: "block",
                          xl: "block",
                        },
                      }}
                    >
                      <img style={style.icon} src={gr3} alt="grid" />
                    </IconButton>

                    <IconButton
                      onClick={() => setGrid(6)}
                      sx={{
                        backgroundColor: grid === 6 ? "aqua" : "none",
                        display: "block",
                      }}
                    >
                      <img style={style.icon} src={gr2} alt="grid" />
                    </IconButton>

                    <IconButton
                      onClick={() => setGrid(12)}
                      sx={{
                        backgroundColor: grid === 12 ? "aqua" : "none",
                        display: "block",
                      }}
                    >
                      <img style={style.icon} src={gr} alt="grid" />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>

              {/* Product */}
              <Box sx={style.boxProduct}>
                {dataAllProduct?.products?.map((product) => (
                  <ProductCard grid={grid} prod={product} />
                ))}
              </Box>

              {/* Pagination */}
              <Box sx={style.boxPagination}>
                <Paginate data={dataAllProduct} />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default OurStore;
