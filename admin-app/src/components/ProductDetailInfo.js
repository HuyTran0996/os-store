import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Rating,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useThunk } from "../hook/use-thunk";

import { deleteRating } from "../store/thunks/fetchProduct";
import { showToast } from "./ToastMessage";
const ProductDetailInfo = ({
  state,
  handleChange,
  style,
  // dataAllProductCategory,
  // dataAllBrand,
}) => {
  const navigate = useNavigate();
  const [ratings, setRating] = useState([]);
  const { dataAllBrand } = useSelector((state) => {
    return state.brands;
  });
  const { dataAllProductCategory } = useSelector((state) => {
    return state.productCategories;
  });
  const { dataProduct } = useSelector((state) => {
    return state.products;
  });
  const [removeRating, isLoading] = useThunk(deleteRating);

  useEffect(() => {
    setRating(dataProduct.ratings || []);
  }, [dataProduct]);

  const handleDeleteRating = async (id) => {
    try {
      const product = await removeRating({
        prodId: dataProduct._id,
        userID: id,
      });

      setRating(product.ratings || []);
    } catch (err) {
      showToast(`${err.message}`, "error");
    }
  };
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: { lg: "450px", md: "300px", sm: "600px" },
      }}
    >
      {/* General Information */}
      <Paper
        elevation={10}
        sx={{
          position: "relative",
          padding: "20px",
        }}
      >
        <Typography variant="h5" sx={{ margin: "10px" }}>
          General Information
        </Typography>

        <Box
          sx={{
            marginTop: "10px",
          }}
        >
          <Typography variant="h6">Product Name</Typography>

          <TextField
            fullWidth
            required
            value={state.prodName}
            name="prodName"
            onChange={handleChange}
            placeholder="Product Name..."
            type="text"
            sx={style.input}
          />
        </Box>

        <Box sx={{ marginTop: "10px" }}>
          <Typography variant="h6">Description</Typography>
          <TextField
            fullWidth
            required
            name="description"
            value={state.description}
            onChange={handleChange}
            placeholder="Description..."
            multiline
            type="text"
            sx={style.input}
          />
        </Box>
      </Paper>

      {/* Price & Stock & Sold */}
      <Paper
        elevation={10}
        sx={{
          marginTop: "10px",
          padding: "20px",
        }}
      >
        <Typography variant="h5">Price Stock & Sold</Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">Price</Typography>
            <TextField
              placeholder="Product Price..."
              type="number"
              required
              name="price"
              value={state.price}
              onChange={handleChange}
              sx={{ ...style.input, maxWidth: "150px" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="h6">Stock</Typography>
            <TextField
              placeholder="Quantity..."
              type="number"
              required
              name="stock"
              value={state.stock}
              onChange={handleChange}
              sx={{ ...style.input, maxWidth: "120px" }}
            />
          </Box>

          <Box>
            <Typography variant="h6">Sold</Typography>
            <TextField
              placeholder="Quantity..."
              type="number"
              required
              name="sold"
              value={state.sold}
              onChange={handleChange}
              sx={{ ...style.input, maxWidth: "120px" }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Category & Brand */}
      <Paper
        elevation={10}
        sx={{
          marginTop: "10px",
          padding: "20px",
        }}
      >
        <Typography variant="h5">Category & Brand</Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6">Category</Typography>

            <Select
              required
              value={state.category}
              onChange={handleChange}
              name="category"
              sx={{ ...style.input, minWidth: "120px" }}
            >
              {dataAllProductCategory.categories?.map((category, index) => (
                <MenuItem key={`${index}-category`} value={category.title}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
            <Typography variant="h6">Brand</Typography>

            <Select
              required
              value={state.brand}
              onChange={handleChange}
              name="brand"
              sx={{ ...style.input, minWidth: "120px" }}
            >
              {dataAllBrand.brands?.map((brand, index) => (
                <MenuItem key={`${index}-brand`} value={brand.title}>
                  {brand.title}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Paper>

      {/* Review*/}
      <Paper
        elevation={10}
        sx={{
          marginTop: "10px",
          padding: "20px",
        }}
      >
        <Typography variant="h5">Customer Reviews</Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {ratings.map((rating, index) => (
              <div
                key={`review-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",

                  marginBottom: "20px",
                  padding: "10px 0",
                }}
              >
                <div className="nameAndStar">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <h3
                      className="name"
                      onClick={() =>
                        navigate(
                          `/customers?search=${rating.postedby.email}&page=1`
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {rating.postedby.name} ({rating.postedby.email})
                    </h3>

                    <Button
                      disabled={isLoading}
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteRating(rating.postedby._id)}
                    >
                      Delete
                    </Button>
                  </div>

                  <Rating value={rating.star} precision={0.5} readOnly />
                  <p className="comment">{rating.comment}</p>
                </div>
              </div>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProductDetailInfo;
