import React from "react";
import { HexColorPicker } from "react-colorful";
import {
  Grid2,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  InputAdornment,
  CardMedia,
  CardActions,
  Card,
  Badge,
} from "@mui/material";
import CarouselShow from "./CarouselShow";

const AddProductVariant = ({
  isLoading,
  handleFileChange,
  state,
  handleRemoveImage,
  handleChange,
  style,
  handleAddToArray,
  handleRemoveFromArray,
  colorCode,
  setColorCode,
  wrongColorCode,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { lg: "950px", md: "600px", sm: "600px" },
      }}
    >
      {/* Add Images */}
      <Paper elevation={10} sx={{ padding: "20px" }}>
        <Box>
          <Button component="label" variant="contained" disabled={isLoading}>
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
                          <InputAdornment position="start">$</InputAdornment>
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
                      onClick={() => handleRemoveFromArray("size", size.name)}
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
                          <InputAdornment position="start">$</InputAdornment>
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
                          <InputAdornment position="start">$</InputAdornment>
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
                  <HexColorPicker color={colorCode} onChange={setColorCode} />

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
                            onChange: (e) => handleFileChange(e, "colorDetail"),
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
                            {color.name} - {color.price} $ -{color.colorCode}
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
  );
};

export default AddProductVariant;
