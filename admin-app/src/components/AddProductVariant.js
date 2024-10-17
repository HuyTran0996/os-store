import React from "react";
import { HexColorPicker } from "react-colorful";
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  InputAdornment,
  CardMedia,
  CardActions,
  Card,
  Select,
  MenuItem,
} from "@mui/material";
import CarouselShow from "./CarouselShow";

const styleAddProductVariant = {
  bigBox: {
    display: "flex",
    flexDirection: "column",
    width: { lg: "950px", md: "600px", sm: "600px" },
  },
  //variant
  boxThreeInput: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },

  boxWrapColor: {
    display: "flex",
    position: "relative",
    margin: "10px 0",
    width: "100%",
    "& .react-colorful": {
      // maxWidth: "280px",
      width: "80%",
    },
    justifyContent: "space-between",
  },

  boxWrapColorCode: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "120px",
  },

  //render image

  boxDetail: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
  },
  boxColor: {
    borderRadius: "5px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
  },
  boxInfo: {
    backgroundColor: "black",
    color: "#e0dfc8",
    padding: "2px",
    borderRadius: "5px",
  },
};

const AddProductVariant = ({
  isLoading,
  handleFileChange,
  state,
  handleRemoveImage,
  handleChange,
  style,
  colorCode,
  setColorCode,
  wrongColorCode,
}) => {
  return (
    <Box sx={styleAddProductVariant.bigBox}>
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

        <Paper
          elevation={5}
          sx={{
            marginTop: "10px",
            padding: "15px",
            // maxWidth: "380px",
          }}
        >
          <Box sx={styleAddProductVariant.boxThreeInput}>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
            >
              <Typography variant="h6">Tag:</Typography>

              <Select
                value={state.tag}
                onChange={handleChange}
                name="tag"
                sx={{ ...style.input }}
              >
                <MenuItem value="color">Color</MenuItem>
                <MenuItem value="size">Size</MenuItem>
                <MenuItem value="variant">Variant</MenuItem>
              </Select>
            </Box>
            <TextField
              placeholder="Variant Name..."
              type="text"
              name="variantName"
              multiline
              value={state.variantName}
              onChange={handleChange}
              sx={{ ...style.input }}
            />
            <TextField
              placeholder="Color Name..."
              type="text"
              name="colorName"
              value={state.colorName}
              onChange={handleChange}
              sx={{ ...style.input }}
            />

            <TextField
              placeholder="Price..."
              type="number"
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

          <Box sx={styleAddProductVariant.boxWrapColor}>
            <HexColorPicker color={colorCode} onChange={setColorCode} />

            <Box sx={styleAddProductVariant.boxWrapColorCode}>
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
                  state.colorPrice === "" ||
                  state.tag.trim() === ""
                }
              >
                Add Images &<br /> Create Color
                <TextField
                  id="imgForColor"
                  type="file"
                  name="variantDetail"
                  sx={{
                    display: "none",
                  }}
                  slotProps={{
                    htmlInput: {
                      multiple: true,
                      onChange: (e) => handleFileChange(e, "variantDetail"),
                    },
                  }}
                />
              </Button>
            </Box>
          </Box>

          {/* Render Image Color */}

          {state.variantDetail.length > 0 && (
            <Box sx={{ marginTop: "5px" }}>
              <Typography variant="h6">Preview:</Typography>

              {state.variantDetail.map((color, index) => (
                <Paper
                  key={`${index}-line-809`}
                  sx={{
                    margin: "10px 0",
                    padding: "10px",
                  }}
                >
                  {/* detail */}
                  <Box sx={styleAddProductVariant.boxDetail}>
                    <Box
                      sx={{
                        ...styleAddProductVariant.boxColor,
                        backgroundColor: `${color.colorCode}`,
                      }}
                    >
                      <Box sx={styleAddProductVariant.boxInfo}>
                        {color.tag} - {color.variantName} - {color.colorName} -{" "}
                        {color.price} $ -{color.colorCode}
                      </Box>
                    </Box>

                    <Button
                      onClick={() => handleRemoveImage(index, "variantDetail")}
                      variant="contained"
                    >
                      Remove Variant
                    </Button>
                  </Box>

                  <CarouselShow>
                    {color.images.map((image, picIndex) => (
                      <CardMedia
                        key={`${picIndex}-line-858`}
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={URL.createObjectURL(image)}
                      />
                    ))}
                  </CarouselShow>
                </Paper>
              ))}
            </Box>
          )}
        </Paper>
      </Paper>
    </Box>
  );
};

export default AddProductVariant;
