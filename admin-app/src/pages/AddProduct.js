import React, { useState } from "react";
import {
  Grid2,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  InputAdornment,
  CardMedia,
  CardActions,
  Card,
  Badge,
  Container,
  CardContent,
  IconButton,
  InputLabel,
  Slide,
  CircularProgress,
  Input,
} from "@mui/material";

import { useThunk } from "../hook/use-thunk";
import { createProduct } from "../store/thunks/fetchProduct";
import { showToast } from "../components/ToastMessage";
import CarouselShow from "../components/CarouselShow";
import ContainerLayout from "../components/ContainerLayout";
import { internationalSizes } from "../data/data";

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
  sizeName: "",
  sizePrice: "",
  versionName: "",
  versionPrice: "",
  images: [],
  size: [],
  version: [],
};

const AddProduct = () => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [create] = useThunk(createProduct);

  const handleAddToArray = (array) => {
    let name;
    let price;
    if (array === "size") {
      name = "sizeName";
      price = "sizePrice";
    }
    if (array === "version") {
      name = "versionName";
      price = "versionPrice";
    }

    setState((prevState) => ({
      ...prevState,
      [array]: [
        ...prevState[array],
        { name: state[name].toLowerCase(), price: state[price] },
      ],
    }));
  };

  const handleRemoveFromArray = (array, name) => {
    setState((prevState) => ({
      ...prevState,
      [array]: prevState[array].filter((s) => s.name !== name.toLowerCase()),
    }));
  };

  console.log("size", state.size);
  console.log("variant", state.variant);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      images: Array.from(event.target.files),
    }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setState((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const clearForm = () => {
    setState(initialState);
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
      formData.append("size", JSON.stringify(state.size));
      formData.append("version", JSON.stringify(state.version));
      state.images.forEach((image) => {
        formData.append(`images`, image);
      });

      await create(formData);
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerLayout>
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
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Create Product
              </Button>
            </Grid2>
            <Grid2 xs={12} sm={6} md={6}>
              <Button
                variant="outlined"
                onClick={clearForm}
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
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
                    value={state.category}
                    onChange={handleChange}
                    name="category"
                    sx={{ ...style.input, minWidth: "120px" }}
                  >
                    <MenuItem value="Watch">Watch</MenuItem>
                    <MenuItem value="Laptop">Laptop</MenuItem>
                    <MenuItem value="Cellphone">Cellphone</MenuItem>
                  </Select>
                </Box>

                <Box>
                  <Typography variant="h6">Brand</Typography>

                  <Select
                    value={state.brand}
                    onChange={handleChange}
                    name="brand"
                    sx={{ ...style.input, minWidth: "120px" }}
                  >
                    <MenuItem value="Watch">Dell</MenuItem>
                    <MenuItem value="Laptop">HP</MenuItem>
                    <MenuItem value="Cellphone">Asus</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* IMAGE */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
              width: { lg: "950px", md: "600px", sm: "600px" },
            }}
          >
            {/* Add Images */}
            <Paper elevation={10} sx={{ padding: "20px" }}>
              <Box>
                <Button
                  component="label"
                  variant="contained"
                  disabled={isLoading}
                >
                  Add Images
                  <TextField
                    id="img"
                    type="file"
                    name="images"
                    sx={{
                      display: "none",
                    }}
                    slotProps={{
                      htmlInput: {
                        multiple: true,
                        onChange: handleFileChange,
                      },
                    }}
                    required
                  />
                </Button>
              </Box>

              {state.images.length > 0 && (
                <Box sx={{ marginTop: "5px" }}>
                  <Typography variant="h6">Preview:</Typography>
                  <CarouselShow>
                    {state.images.map((image, index) => (
                      <Card key={index} sx={{ maxWidth: 200 }}>
                        <CardMedia
                          component="img"
                          alt="green iguana"
                          height="140"
                          image={URL.createObjectURL(image)}
                        />

                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => handleRemoveImage(index)}
                          >
                            Remove
                          </Button>
                        </CardActions>
                      </Card>
                    ))}
                  </CarouselShow>
                </Box>
              )}
            </Paper>

            {/* Variants */}
            <Paper
              elevation={10}
              sx={{
                marginTop: "10px",
                padding: "20px",
              }}
            >
              <Typography variant="h5">Variants</Typography>

              <Grid2 container justifyContent="space-between">
                {/* SIZE */}
                <Grid2 item>
                  <Paper
                    elevation={5}
                    sx={{
                      marginTop: "10px",
                      padding: "15px",
                      maxWidth: "280px",
                    }}
                  >
                    <Typography variant="h5">Size</Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">Name-Price</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <TextField
                          placeholder="Size..."
                          type="text"
                          required
                          name="sizeName"
                          value={state.sizeName}
                          onChange={handleChange}
                          sx={{ ...style.input }}
                        />

                        <TextField
                          placeholder="Price..."
                          type="number"
                          required
                          name="sizePrice"
                          value={state.sizePrice}
                          onChange={handleChange}
                          sx={{ ...style.input }}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Box>
                      <Button
                        onClick={() => handleAddToArray("size")}
                        variant="contained"
                        sx={{ width: "100%", margin: "10px 0" }}
                      >
                        Create Size
                      </Button>
                    </Box>

                    {/* Render Size */}
                    <Box
                      sx={{
                        marginTop: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        gap: "15px",
                      }}
                    >
                      {state.size.map((size) => {
                        return (
                          <Badge
                            key={`size-${size}`}
                            color="error"
                            badgeContent={"X"}
                            onClick={() =>
                              handleRemoveFromArray("size", size.name)
                            }
                            sx={{ cursor: "pointer" }}
                          >
                            <Button
                              component="div"
                              variant="outlined"
                              key={size}
                            >
                              {size.name} <br />
                              {size.price}$
                            </Button>
                          </Badge>
                        );
                      })}
                    </Box>
                  </Paper>
                </Grid2>

                {/* Version */}
                <Grid2 item>
                  <Paper
                    elevation={5}
                    sx={{
                      marginTop: "10px",
                      padding: "15px",
                      maxWidth: "280px",
                    }}
                  >
                    <Typography variant="h5">Version</Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">Version-Price</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <TextField
                          placeholder="Size..."
                          type="text"
                          required
                          name="versionName"
                          value={state.versionName}
                          onChange={handleChange}
                          sx={{ ...style.input }}
                        />

                        <TextField
                          placeholder="Price..."
                          type="number"
                          required
                          name="versionPrice"
                          value={state.versionPrice}
                          onChange={handleChange}
                          sx={{ ...style.input }}
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Box>
                      <Button
                        onClick={() => handleAddToArray("version")}
                        variant="contained"
                        sx={{ width: "100%", margin: "10px 0" }}
                      >
                        Create Version
                      </Button>
                    </Box>

                    {/* Render Size */}
                    <Box
                      sx={{
                        marginTop: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        gap: "15px",
                      }}
                    >
                      {state.version.map((version) => {
                        return (
                          <Badge
                            color="error"
                            badgeContent={"X"}
                            onClick={() =>
                              handleRemoveFromArray("version", version.name)
                            }
                            sx={{ cursor: "pointer" }}
                          >
                            <Button
                              component="div"
                              variant="outlined"
                              key={version}
                            >
                              {version.name} <br />
                              {version.price}$
                            </Button>
                          </Badge>
                        );
                      })}
                    </Box>
                  </Paper>
                </Grid2>
              </Grid2>
            </Paper>
          </Box>
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default AddProduct;
