import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid2, Typography, Box, Button } from "@mui/material";

import { useThunk } from "../hook/use-thunk";

import { createProduct, addVariant } from "../store/thunks/fetchProduct";
import { getAllBrand } from "../store/thunks/fetchBrands";
import { getAllCategory } from "../store/thunks/fetchProductCategories";

import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";
import AddProductInfo from "../components/AddProductInfo";
import AddProductVariant from "../components/AddProductVariant";
import { Loading } from "../components/Loading/Loading";

const style = {
  input: {
    backgroundColor: "rgba(103, 58, 183, 0.5)",
    borderRadius: "10px",
    borderStyle: "none",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  },
};
const initialState = {
  prodName: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  brand: "",
  variantName: "",
  colorName: "",
  colorPrice: "",
  images: [],
  variantDetail: [],
};

const AddProduct = () => {
  ///////////// declare///////////////
  const [state, setState] = useState(initialState);
  const [colorCode, setColorCode] = useState("#7a763d");
  const [isLoading, setIsLoading] = useState(false);
  const [wrongColorCode, setWrongColorCode] = useState(null);
  const [create] = useThunk(createProduct);
  const [addVariantToProduct] = useThunk(addVariant);
  const [getDataAllBrand] = useThunk(getAllBrand);
  const [getDataAllCategory] = useThunk(getAllCategory);

  const { dataAllBrand } = useSelector((state) => {
    return state.brands;
  });
  const { dataAllProductCategory } = useSelector((state) => {
    return state.productCategories;
  });

  ////////////////

  useEffect(() => {
    const getCategory = async () => {
      try {
        setIsLoading(true);
        const categories = await getDataAllCategory();
        setState((prevState) => ({
          ...prevState,
          category: categories?.categories[0]?.title,
        }));
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    const getBrand = async () => {
      try {
        setIsLoading(true);
        const brands = await getDataAllBrand(state.category);
        setState((prevState) => ({
          ...prevState,
          brand: brands?.brands[0]?.title,
        }));
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getBrand();
  }, [state.category]);

  const isValidHexColor = (hexCode) => {
    const hexColorRegex = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;

    return hexColorRegex.test(hexCode);
  };
  useEffect(() => {
    if (!isValidHexColor(colorCode)) {
      setWrongColorCode("Invalid hex color code");
    } else {
      setWrongColorCode(null);
    }
  }, [colorCode]);

  //control input value
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event, array) => {
    if (array === "images") {
      setState((prevState) => ({
        ...prevState,
        [array]: Array.from(event.target.files),
      }));
    }

    if (array === "variantDetail") {
      setState((prevState) => {
        const checkDuplicate = prevState[array].find(
          (item) => item.variantName.trim() === state.variantName.trim()
        );

        if (checkDuplicate) {
          showToast("Duplicate name", "error");
          return { ...prevState };
        } else {
          return {
            ...prevState,
            [array]: [
              ...prevState[array],
              {
                variantName: state.variantName.toLowerCase(),
                colorName: state.colorName.toLowerCase(),
                price: state.colorPrice,
                colorCode: colorCode,
                images: Array.from(event.target.files),
              },
            ],
          };
        }
      });
    }
  };

  const handleRemoveImage = (indexToRemove, array) => {
    setState((prevState) => ({
      ...prevState,
      [array]: prevState[array].filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("title", state.prodName);
      formData.append("description", state.description);
      formData.append("price", state.price);
      formData.append("quantity", state.stock);
      formData.append("category", state.category);
      formData.append("brand", state.brand);

      state.images.forEach((image) => {
        formData.append(`images`, image);
      });

      const product = await create(formData);

      if (state.variantDetail.length > 0) {
        state.variantDetail.forEach(async (color) => {
          const formData = new FormData();
          formData.append("variantName", color.variantName);
          formData.append("colorName", color.colorName);
          formData.append("price", color.price);
          formData.append("colorCode", color.colorCode);
          formData.append("prodId", product._id);
          color.images.forEach((image) => {
            formData.append(`images`, image);
          });

          await addVariantToProduct({ formData });
        });
      }

      showToast("Create Product Successfully", "success");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerLayout>
      {isLoading ? <Loading message="Processing" /> : ""}
      <form onSubmit={handleSubmit}>
        <Box sx={{ margin: "20px" }}>
          {/* Page Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" sx={{ margin: "20px 0" }}>
              Add New Product
            </Typography>
            <Grid2
              container
              spacing={2}
              sx={{ justifyContent: { md: "center" } }}
            >
              <Grid2 xs={12} sm={6} md={6}>
                <Button type="submit" variant="contained" disabled={isLoading}>
                  Create Product
                </Button>
              </Grid2>
              <Grid2 xs={12} sm={6} md={6}>
                <Button
                  variant="outlined"
                  onClick={() => setState(initialState)}
                  disabled={isLoading}
                >
                  Clear Form
                </Button>
              </Grid2>
            </Grid2>
          </Box>

          {/* Form */}
          <Box
            sx={{
              display: { lg: "flex", md: "flex", sm: "column" },
              justifyContent: "space-between",
            }}
          >
            {/* INFO */}
            <AddProductInfo
              state={state}
              handleChange={handleChange}
              style={style}
              dataAllProductCategory={dataAllProductCategory}
              dataAllBrand={dataAllBrand}
            />

            {/* IMAGE */}
            <AddProductVariant
              isLoading={isLoading}
              handleFileChange={handleFileChange}
              state={state}
              handleRemoveImage={handleRemoveImage}
              handleChange={handleChange}
              style={style}
              colorCode={colorCode}
              setColorCode={setColorCode}
              wrongColorCode={wrongColorCode}
            />
          </Box>
        </Box>
      </form>
    </ContainerLayout>
  );
};

export default AddProduct;
