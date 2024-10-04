import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid2, Typography, Box, Button } from "@mui/material";

import { useThunk } from "../hook/use-thunk";

import {
  addVariant,
  getAProduct,
  updateProduct,
  deleteImages,
  deleteProductVariant,
} from "../store/thunks/fetchProduct";
import { getAllBrand } from "../store/thunks/fetchBrands";
import { getAllCategory } from "../store/thunks/fetchProductCategories";

import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";
import ProductDetailInfo from "../components/ProductDetailInfo";
import ProductDetailVariant from "../components/ProductDetailVariant";
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
  sold: "",
  category: "",
  brand: "",
  variantName: "",
  colorName: "",
  colorPrice: "",
  images: [],
  variantDetail: [],
  oldImages: [],
  oldVariantDetail: [],
};

const ProductDetail = () => {
  ///////////// declare///////////////
  const params = useParams();
  const [state, setState] = useState(initialState);
  const [colorCode, setColorCode] = useState("#7a763d");
  const [isLoading, setIsLoading] = useState(false);
  const [wrongColorCode, setWrongColorCode] = useState(null);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [variantsToDelete, setVariantsToDelete] = useState([]);

  const [addVariantToProduct] = useThunk(addVariant);
  const [getDataAllBrand] = useThunk(getAllBrand);
  const [getDataAllCategory] = useThunk(getAllCategory);
  const [getAProductById] = useThunk(getAProduct);
  const [update] = useThunk(updateProduct);
  const [deleteImage] = useThunk(deleteImages);
  const [deleteVariant] = useThunk(deleteProductVariant);

  const { dataAllBrand } = useSelector((state) => {
    return state.brands;
  });
  const { dataAllProductCategory } = useSelector((state) => {
    return state.productCategories;
  });
  const { dataProduct } = useSelector((state) => {
    return state.products;
  });

  ////////////////

  const getData = async () => {
    try {
      setIsLoading(true);
      await getDataAllCategory();
      const product = await getAProductById(params.id);
      setState({
        ...initialState,
        setImagesToDelete: [],
        setVariantsToDelete: [],
        prodName: product?.title,
        description: product?.description,
        price: product?.price,
        stock: product?.quantity,
        sold: product?.sold,
        category: product?.category,
        brand: product?.brand,
        oldVariantDetail: product?.variant,
        oldImages: product?.images,
      });
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getBrand = async () => {
      try {
        setIsLoading(true);
        await getDataAllBrand(state.category);
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
        const checkDuplicateOldVariantDetail = prevState.oldVariantDetail.find(
          (item) => item.variantName.trim() === state.variantName.trim()
        );
        if (checkDuplicate || checkDuplicateOldVariantDetail) {
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

  const handleRemoveImage = (indexToRemove, array, public_idOrName) => {
    setState((prevState) => {
      if (array === "oldImages") {
        setImagesToDelete((prevStateImgToDelete) => [
          ...prevStateImgToDelete,
          public_idOrName,
        ]);
      }
      if (array === "oldVariantDetail") {
        setVariantsToDelete((prevStateVariantToDelete) => [
          ...prevStateVariantToDelete,
          public_idOrName,
        ]);
      }

      return {
        ...prevState,
        [array]: prevState[array].filter((_, index) => index !== indexToRemove),
      };
    });
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
      formData.append("sold", state.sold);
      formData.append("category", state.category);
      formData.append("brand", state.brand);

      state.images.forEach((image) => {
        formData.append(`images`, image);
      });

      const product = await update({ id: params.id, formData });

      if (state.variantDetail.length > 0) {
        state.variantDetail.forEach(async (variant) => {
          const formData1 = new FormData();
          formData1.append("variantName", variant.variantName);
          formData1.append("colorName", variant.colorName);
          formData1.append("price", variant.price);
          formData1.append("colorCode", variant.colorCode);

          variant.images.forEach((image) => {
            formData1.append(`images`, image);
          });

          await addVariantToProduct({
            prodId: product._id,
            formData: formData1,
          });
        });
      }

      if (imagesToDelete.length > 0) {
        imagesToDelete.forEach(async (image) => {
          await deleteImage({ productId: params.id, publicId: image });
        });
      }

      if (variantsToDelete.length > 0) {
        variantsToDelete.forEach(async (variant) => {
          await deleteVariant({ productId: params.id, variantName: variant });
        });
      }

      showToast("Update Product Successfully", "success");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
      await getData();
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
              Edit Product
            </Typography>
            <Grid2
              container
              spacing={2}
              sx={{ justifyContent: { md: "center" } }}
            >
              <Grid2 xs={12} sm={6} md={6}>
                <Button type="submit" variant="contained" disabled={isLoading}>
                  Update Product
                </Button>
              </Grid2>
              <Grid2 xs={12} sm={6} md={6}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    setState({
                      ...initialState,
                      setImagesToDelete: [],
                      setVariantsToDelete: [],
                      prodName: dataProduct?.title,
                      description: dataProduct?.description,
                      price: dataProduct?.price,
                      stock: dataProduct?.quantity,
                      sold: dataProduct?.sold,
                      category: dataProduct?.category,
                      brand: dataProduct?.brand,
                      oldVariantDetail: dataProduct?.variant,
                      oldImages: dataProduct?.images,
                    })
                  }
                  disabled={isLoading}
                >
                  Cancel
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
            <ProductDetailInfo
              state={state}
              handleChange={handleChange}
              style={style}
              dataAllProductCategory={dataAllProductCategory}
              dataAllBrand={dataAllBrand}
            />

            {/* IMAGE */}

            <ProductDetailVariant
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

export default ProductDetail;
