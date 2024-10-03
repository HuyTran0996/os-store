import React from "react";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";

const AddProductInfo = ({
  state,
  handleChange,
  style,
  dataAllProductCategory,
  dataAllBrand,
}) => {
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

      {/* Price & Stock */}
      <Paper
        elevation={10}
        sx={{
          marginTop: "10px",
          padding: "20px",
        }}
      >
        <Typography variant="h5">Price & Stock</Typography>

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
    </Box>
  );
};

export default AddProductInfo;
