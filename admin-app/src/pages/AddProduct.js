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
  images: [],
  category: "",
  brand: "",
};

const AddProduct = () => {
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
            <Grid2 item xs={12} sm={6} md={6}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Create Product
              </Button>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={6}>
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

            <Paper
              elevation={10}
              sx={{
                marginTop: "10px",
                padding: "20px",
              }}
            >
              <Typography variant="h5">Price & Stock</Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{}}>
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
                <Box sx={{}}>
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
          </Box>

          {/* IMAGE */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: { lg: "850px", md: "600px", sm: "600px" },
            }}
          >
            <Paper elevation={10} sx={{ padding: "20px" }}>
              <Box>
                <label htmlFor="img">
                  <Button variant="contained">Add Images</Button>
                </label>
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

            <Paper elevation={10} sx={{ padding: "20px", marginTop: "10px" }}>
              <Typography variant="h5" sx={{ margin: "10px" }}>
                Category & Brand
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{}}>
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

                <Box sx={{}}>
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
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default AddProduct;
