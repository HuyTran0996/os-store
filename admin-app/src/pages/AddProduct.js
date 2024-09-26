import React, { useEffect, useState } from "react";
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
import { HexColorPicker } from "react-colorful";
import { useThunk } from "../hook/use-thunk";
import { createProduct, addColor } from "../store/thunks/fetchProduct";
import { showToast } from "../components/ToastMessage";
import CarouselShow from "../components/CarouselShow";
import ContainerLayout from "../components/ContainerLayout";
import { Loading } from "../components/Loading/Loading";
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
  colorName: "",
  colorPrice: "",
  images: [],
  size: [],
  version: [],
  colorDetail: [],
};

const AddProduct = () => {
  const [state, setState] = useState(initialState);
  const [colorCode, setColorCode] = useState("#7a763d");
  const [isLoading, setIsLoading] = useState(false);
  const [wrongColorCode, setWrongColorCode] = useState(null);
  const [create] = useThunk(createProduct);
  const [addColorToProduct] = useThunk(addColor);

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

    setState((prevState) => {
      const checkDuplicate = prevState[array].find(
        (item) =>
          item.name === state.sizeName || state.versionName || state.colorName
      );

      if (checkDuplicate) {
        showToast("Duplicate name", "error");
        return { ...prevState };
      } else {
        return {
          ...prevState,
          [array]: [
            ...prevState[array],
            { name: state[name].toLowerCase(), price: state[price] },
          ],
        };
      }
    });
  };

  const handleRemoveFromArray = (array, name) => {
    setState((prevState) => ({
      ...prevState,
      [array]: prevState[array].filter((s) => s.name !== name.toLowerCase()),
    }));
  };

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
    if (array === "colorDetail") {
      setState((prevState) => ({
        ...prevState,
        [array]: [
          ...prevState[array],
          {
            name: state.colorName.toLowerCase(),
            price: state.colorPrice,
            colorCode: colorCode,
            images: Array.from(event.target.files),
          },
        ],
      }));
    }
  };

  const handleRemoveImage = (indexToRemove, array, picIndex) => {
    if (array === "colorDetailInside") {
      setState((prevState) => ({
        ...prevState,
        colorDetail: prevState.colorDetail.map((color, index) =>
          index === indexToRemove
            ? {
                ...color,
                images: color.images.filter((_, i) => i !== picIndex),
              }
            : color
        ),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [array]: prevState[array].filter((_, index) => index !== indexToRemove),
      }));
    }
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

      const product = await create(formData);

      state.colorDetail.forEach(async (color) => {
        const formData = new FormData();

        formData.append("name", color.name);
        formData.append("price", color.price);
        formData.append("colorCode", color.colorCode);
        formData.append("prodId", product._id);
        color.images.forEach((image) => {
          formData.append(`images`, image);
        });

        await addColorToProduct(formData);
      });
      showToast("Create Product Successfully", "success");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerLayout>
      {isLoading ? <Loading /> : ""}
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
                <Button
                  type="submit"
                  variant="contained"
                  // onClick={handleSubmit}
                  disabled={isLoading}
                >
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
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                // justifyContent: "space-between",
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
                      <MenuItem value="Watch">Watch</MenuItem>
                      <MenuItem value="Laptop">Laptop</MenuItem>
                      <MenuItem value="Cellphone">Cellphone</MenuItem>
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
                          onChange: (e) => handleFileChange(e, "images"),
                        },
                      }}
                      required
                    />
                  </Button>
                </Box>
                {/* RENDER IMAGE */}
                {state.images.length > 0 && (
                  <Box sx={{ marginTop: "5px" }}>
                    <Typography variant="h6">Preview:</Typography>
                    <CarouselShow>
                      {state.images.map((image, index) => (
                        <Card key={`${index}-line-436`} sx={{ maxWidth: 200 }}>
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image={URL.createObjectURL(image)}
                          />

                          <CardActions>
                            <Button
                              size="small"
                              onClick={() => handleRemoveImage(index, "images")}
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
                  <Grid2 item>
                    {/* SIZE */}
                    <Paper
                      elevation={5}
                      sx={{
                        marginTop: "10px",
                        padding: "15px",
                        maxWidth: "300px",
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
                        {state.size.map((size, index) => {
                          return (
                            <Badge
                              key={`size-${index}-line-548`}
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
                                sx={{ width: "20px" }}
                              >
                                {size.name} <br />
                                {size.price}$
                              </Button>
                            </Badge>
                          );
                        })}
                      </Box>
                    </Paper>

                    {/* Version */}
                    <Paper
                      elevation={5}
                      sx={{
                        marginTop: "10px",
                        padding: "15px",
                        maxWidth: "300px",
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

                      {/* Render Version */}
                      <Box
                        sx={{
                          marginTop: "10px",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          gap: "15px",
                        }}
                      >
                        {state.version.map((version, index) => {
                          return (
                            <Badge
                              key={`${index}-line-648`}
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
                                sx={{ width: "120px" }}
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

                  {/* COLOR */}
                  <Grid2 item>
                    <Paper
                      elevation={5}
                      sx={{
                        marginTop: "10px",
                        padding: "15px",
                        maxWidth: "380px",
                      }}
                    >
                      <Typography variant="h5">Color</Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <Typography variant="h6">Name-Price-Code</Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <TextField
                            placeholder="Name..."
                            type="text"
                            required
                            name="colorName"
                            value={state.colorName}
                            onChange={handleChange}
                            sx={{ ...style.input }}
                          />

                          <TextField
                            placeholder="Price..."
                            type="number"
                            required
                            name="colorPrice"
                            value={state.colorPrice}
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
                        <Box
                          sx={{
                            display: "flex",
                            position: "relative",
                            margin: "10px 0",
                            width: "100%",
                            "& .react-colorful": {
                              maxWidth: "280px",
                            },
                            justifyContent: "space-between",
                          }}
                        >
                          <HexColorPicker
                            color={colorCode}
                            onChange={setColorCode}
                          />

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              width: "120px",
                            }}
                          >
                            {wrongColorCode && (
                              <div style={{ color: "red", fontSize: "12px" }}>
                                {wrongColorCode}
                              </div>
                            )}
                            <TextField
                              placeholder="color code..."
                              type="text"
                              required
                              name="colorCode"
                              value={colorCode}
                              onChange={(e) => setColorCode(e.target.value)}
                              sx={{ ...style.input }}
                            />

                            <Button
                              component="label"
                              variant="contained"
                              disabled={
                                isLoading ||
                                state.colorName.trim() === "" ||
                                state.colorPrice === ""
                              }
                            >
                              Add Images &<br /> Create Color
                              <TextField
                                id="imgForColor"
                                type="file"
                                name="colorDetail"
                                sx={{
                                  display: "none",
                                }}
                                slotProps={{
                                  htmlInput: {
                                    multiple: true,
                                    onChange: (e) =>
                                      handleFileChange(e, "colorDetail"),
                                  },
                                }}
                                required
                              />
                            </Button>
                          </Box>
                        </Box>
                      </Box>

                      {/* Render Image Color */}

                      {state.colorDetail.length > 0 && (
                        <Box sx={{ marginTop: "5px" }}>
                          <Typography variant="h6">Preview:</Typography>

                          {state.colorDetail.map((color, index) => (
                            <Paper
                              // elevation={5}
                              key={`${index}-line-809`}
                              sx={{
                                margin: "10px 0",
                                padding: "10px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                  marginBottom: "10px",
                                }}
                              >
                                <Box
                                  sx={{
                                    backgroundColor: `${color.colorCode}`,
                                    borderRadius: "5px",
                                    padding: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      backgroundColor: "black",
                                      color: "#e0dfc8",
                                      // fontSize: "12px",
                                      padding: "2px",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    {color.name} - {color.price} $ -
                                    {color.colorCode}
                                  </Box>
                                </Box>
                                <Button
                                  onClick={() =>
                                    handleRemoveImage(index, "colorDetail")
                                  }
                                  variant="contained"
                                >
                                  Remove Color
                                </Button>
                              </Box>
                              <CarouselShow>
                                {color.images.map((image, picIndex) => (
                                  <>
                                    <CardMedia
                                      key={`${picIndex}-line-858`}
                                      component="img"
                                      alt="green iguana"
                                      height="140"
                                      image={URL.createObjectURL(image)}
                                    />

                                    <CardActions>
                                      <Button
                                        size="small"
                                        onClick={() =>
                                          handleRemoveImage(
                                            index,
                                            "colorDetailInside",
                                            picIndex
                                          )
                                        }
                                      >
                                        Remove
                                      </Button>
                                    </CardActions>
                                  </>
                                ))}
                              </CarouselShow>
                            </Paper>
                          ))}
                        </Box>
                      )}
                    </Paper>
                  </Grid2>
                </Grid2>
              </Paper>
            </Box>
          </Box>
        </Box>
      </form>
    </ContainerLayout>
  );
};

export default AddProduct;
