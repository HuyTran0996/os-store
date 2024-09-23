import React, { useState } from "react";
import {
  Grid2,
  Typography,
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  InputAdornment,
  CardMedia,
  CardContent,
  CardActions,
  Card,
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
import Footer from "../components/Footer";
import ContainerLayout from "../components/ContainerLayout";

const AddProduct = () => {
  const initialState = {
    prodName: "",
    description: "",
    price: "",
    stock: "",
    images: [],
    category: "",
    brand: "",
  };
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [create] = useThunk(createProduct);
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

      await create(formData);
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  const clearForm = () => {
    setState(initialState);
  };

  return (
    <ContainerLayout>
      <Box sx={{ margin: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" sx={{ margin: "20px" }}>
            Add New Product
          </Typography>
          <Grid2 container justifyContent="space-between">
            <Grid2 item xs={12}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Create Product
              </Button>
            </Grid2>
            <Grid2 item xs={12}>
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

        <Grid2 container justifyContent="space-between">
          {/* INFO */}
          <Grid2
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: { md: "39%" },
            }}
          >
            <Paper elevation={10} sx={{ padding: "10px" }}>
              <Typography variant="h5" sx={{ margin: "10px" }}>
                General Information
              </Typography>

              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="h6">Product Name</Typography>

                <TextField
                  sx={{
                    backgroundColor: "rgba(103, 58, 183, 0.5)",
                    borderRadius: "10px",
                    borderStyle: "none",
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                  placeholder="Product Name..."
                  type="text"
                  fullWidth
                  required
                  value={state.prodName}
                  name="prodName"
                  onChange={handleChange}
                />
              </Box>
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="h6">Description</Typography>
                <TextField
                  sx={{
                    backgroundColor: "rgba(103, 58, 183, 0.5)",
                    borderRadius: "10px",
                    borderStyle: "none",
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                  placeholder="Description..."
                  multiline
                  type="text"
                  fullWidth
                  required
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                />
              </Box>
            </Paper>

            <Paper elevation={10} sx={{ padding: "10px", marginTop: "10px" }}>
              <Typography variant="h5">Price & Stock</Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{}}>
                  <Typography variant="h6">Price</Typography>

                  <TextField
                    sx={{
                      maxWidth: "150px",
                      backgroundColor: "rgba(103, 58, 183, 0.5)",
                      borderRadius: "10px",
                      borderStyle: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    placeholder="Product Price..."
                    type="number"
                    required
                    name="price"
                    value={state.price}
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      },
                    }}
                  />
                </Box>
                <Box sx={{}}>
                  <Typography variant="h6">Stock</Typography>
                  <TextField
                    sx={{
                      maxWidth: "120px",
                      backgroundColor: "rgba(103, 58, 183, 0.5)",
                      borderRadius: "10px",
                      borderStyle: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    placeholder="Quantity..."
                    type="number"
                    required
                    name="stock"
                    value={state.stock}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid2>

          {/* IMAGE */}
          <Grid2
            item
            xs={12}
            sm={6}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: { md: "59%" },
            }}
          >
            <Paper elevation={10} sx={{ padding: "10px" }}>
              <Box sx={{ display: "flex" }}>
                <Typography variant="h5" sx={{ margin: "10px" }}>
                  Images
                </Typography>

                <TextField
                  type="file"
                  name="images"
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                  slotProps={{
                    htmlInput: {
                      multiple: true,
                      onChange: handleFileChange,
                    },
                  }}
                  required
                />
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

            <Paper elevation={10} sx={{ padding: "10px", marginTop: "10px" }}>
              <Typography variant="h5" sx={{ margin: "10px" }}>
                Category & Brand
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{}}>
                  <Typography variant="h6">Category</Typography>

                  <Select
                    sx={{
                      minWidth: "120px",
                      backgroundColor: "rgba(103, 58, 183, 0.5)",
                      borderRadius: "10px",
                      borderStyle: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    value={state.category}
                    onChange={handleChange}
                    name="category"
                  >
                    <MenuItem value="Watch">Watch</MenuItem>
                    <MenuItem value="Laptop">Laptop</MenuItem>
                    <MenuItem value="Cellphone">Cellphone</MenuItem>
                  </Select>
                </Box>

                <Box sx={{}}>
                  <Typography variant="h6">Brand</Typography>

                  <Select
                    sx={{
                      minWidth: "120px",
                      backgroundColor: "rgba(103, 58, 183, 0.5)",
                      borderRadius: "10px",
                      borderStyle: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    value={state.brand}
                    onChange={handleChange}
                    name="brand"
                  >
                    <MenuItem value="Watch">Dell</MenuItem>
                    <MenuItem value="Laptop">HP</MenuItem>
                    <MenuItem value="Cellphone">Asus</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </ContainerLayout>
  );
};

export default AddProduct;
