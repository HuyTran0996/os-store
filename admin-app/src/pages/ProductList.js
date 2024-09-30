import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid2, Box, Typography } from "@mui/material";

import { useThunk } from "../hook/use-thunk";
import { createProduct, addColor } from "../store/thunks/fetchProduct";
import { getAllCategory } from "../store/thunks/fetchProductCategories";

import { showToast } from "../components/ToastMessage";
import { Loading } from "../components/Loading/Loading";
import ContainerLayout from "../components/ContainerLayout";
import ProductListFilter from "../components/Sidebar/ProductListFilter";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [getDataAllCategory] = useThunk(getAllCategory);
  const { dataAllProductCategory } = useSelector((state) => {
    return state.productCategories;
  });

  const getData = async () => {
    try {
      setIsLoading(true);
      await getDataAllCategory();
    } catch (err) {
      showToast(`err.message`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ContainerLayout>
      <Box sx={{ margin: "20px" }}>
        <Grid2 container spacing={2}>
          {/* Filter sidebar */}
          <Grid2
            item
            md={3}
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          >
            <ProductListFilter
              dataAllProductCategory={dataAllProductCategory}
            />
          </Grid2>

          {/* Main */}
          <Grid2 item md={9} sm={12}>
            <Typography variant="h4">Main</Typography>
          </Grid2>
        </Grid2>
      </Box>
    </ContainerLayout>
  );
};

export default ProductList;
