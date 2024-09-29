import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GridToolbarContainer } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  IconButton,
  Button,
  Modal,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import { useThunk } from "../../hook/use-thunk";
import { getAllBrand, createBrand } from "../../store/thunks/fetchBrands";
import { getAllCategory } from "../../store/thunks/fetchProductCategories";

import { showToast } from "../ToastMessage";

import imageNotFound from "../../images/imageNotFound.png";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const style = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  input: {
    backgroundColor: "rgba(103, 58, 183, 0.5)",
    borderRadius: "10px",
    borderStyle: "none",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  },
  removeTagButton: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "red",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  // GridToolbarContainer//////
  gridToolbarContainer: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "7px",
  },
  box1: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  ///////////////////
};

export const EditToolbarBrandList = (props) => {
  const { isLoadingSelf, setIsLoadingSelf } = props;
  const navigate = useNavigate();
  const [imageChange, setImageChange] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState([]);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const [getDataAllBrand] = useThunk(getAllBrand);
  const [create] = useThunk(createBrand);
  const [getAllProdCategory] = useThunk(getAllCategory);
  const { dataAllProductCategory } = useSelector((state) => {
    return state.productCategories;
  });

  useEffect(() => {
    const getCategory = async () => {
      try {
        setIsLoadingSelf(true);
        const result = await getAllProdCategory(1, 10000);
        setCategory(result.categories[0]?.title);
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoadingSelf(false);
      }
    };
    getCategory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let image;
  if (imageChange !== "") {
    image = URL.createObjectURL(imageChange[0]);
  } else image = imageNotFound;

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/brandList?search=${searchValue.trim()}&page=${1}`);
  };
  const handleAddBrand = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingSelf(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("tag", JSON.stringify(tag));
      imageChange.forEach((image) => {
        formData.append(`images`, image);
      });
      await create(formData);
      await getDataAllBrand();
      showToast(`Create brand successfully`, "success");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoadingSelf(false);
      setOpen(false);
      setImageChange("");
      setTitle("");
    }
  };

  const handleAddTag = () => {
    if (!category.trim()) return;

    setTag((prevState) => {
      const find = prevState.findIndex((item) => item.title === category);
      if (find !== -1) {
        showToast("Duplicate tag", "error");
        return prevState;
      }
      return [...prevState, { title: category }];
    });
  };

  const handleRemoveFromTag = (categoryToRemove) => {
    setTag((prevState) =>
      prevState.filter((tag) => tag.title !== categoryToRemove)
    );
  };

  return (
    <>
      <form onSubmit={handleAddBrand}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.modal}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="h4">Title:</Typography>
              <TextField
                className="input"
                type="text"
                value={title}
                variant="standard"
                sx={{ marginLeft: "5px" }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            {/* Add Tag */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h4">Tag:</Typography>
              <Select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                sx={{
                  ...style.input,
                  minWidth: "120px",
                  height: "36px",
                  margin: "0 10px",
                }}
                // variant="standard"
              >
                {dataAllProductCategory.categories?.map((category, index) => {
                  const categoryValue = category.title;
                  return (
                    <MenuItem key={index} value={categoryValue}>
                      {category.title}
                    </MenuItem>
                  );
                })}
              </Select>
              <Button
                variant="contained"
                disabled={isLoadingSelf}
                onClick={handleAddTag}
              >
                Add Tag
              </Button>
            </Box>

            {tag.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  margin: "15px 0",
                }}
              >
                {tag.map((category, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: "blue",
                      position: "relative",
                      width: "80px",
                      borderRadius: "7px",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "5px",
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {category.title}
                    </Box>
                    <Box
                      sx={style.removeTagButton}
                      onClick={() => handleRemoveFromTag(category.title)}
                    >
                      &times;
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

            {/* Change Image */}
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "7px",
              }}
            >
              <img
                src={image}
                alt="brand"
                style={{
                  height: "200px",
                  objectFit: "contain",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: "50px",
                  width: "100%",
                }}
              >
                <Button
                  component="label"
                  variant="outlined"
                  disabled={isLoadingSelf}
                >
                  Change Images
                  <TextField
                    id="img"
                    type="file"
                    name="images"
                    sx={{
                      display: "none",
                    }}
                    slotProps={{
                      htmlInput: {
                        multiple: false,
                        onChange: (e) =>
                          setImageChange(Array.from(e.target.files)),
                      },
                    }}
                    required
                  />
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  onClick={(e) => {
                    handleAddBrand(e);
                  }}
                  disabled={isLoadingSelf}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </form>

      <GridToolbarContainer sx={style.gridToolbarContainer}>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
          Add brand
        </Button>

        <form onSubmit={handleSubmit} style={{ width: "60%" }}>
          <Box sx={style.box1}>
            <TextField
              className="input"
              placeholder="Search Brand..."
              type="text"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <IconButton
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoadingSelf}
              sx={{ position: "absolute", right: "7px" }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </form>
      </GridToolbarContainer>
    </>
  );
};
