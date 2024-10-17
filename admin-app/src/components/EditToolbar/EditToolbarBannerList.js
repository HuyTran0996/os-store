import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GridToolbarContainer } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  IconButton,
  Button,
  Modal,
  Typography,
} from "@mui/material";

import { useThunk } from "../../hook/use-thunk";
import { getAllBanner, createBanner } from "../../store/thunks/fetchBanners";

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

export const EditToolbarBannerList = (props) => {
  const { isLoadingSelf, setIsLoadingSelf } = props;
  const navigate = useNavigate();
  const [imageChange, setImageChange] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [title, setTitle] = useState("");
  const [prodName, setProdName] = useState("");
  const [productID, setProductID] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false);

  const [getDataAllBanner] = useThunk(getAllBanner);
  const [create] = useThunk(createBanner);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let image;
  if (imageChange !== "") {
    image = URL.createObjectURL(imageChange[0]);
  } else image = imageNotFound;

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/banner?search=${searchValue.trim()}`);
  };

  const handleAddBrand = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingSelf(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("prodName", prodName);
      formData.append("productID", productID);
      formData.append("description", description);

      imageChange.forEach((image) => {
        formData.append(`images`, image);
      });
      await create(formData);
      await getDataAllBanner();
      showToast(`Create brand successfully`, "success");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoadingSelf(false);
      setOpen(false);
      setImageChange("");
      setTitle("");
      setProdName("");
      setProductID("");
      setDescription("");
    }
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
                width: "100%",
              }}
            >
              <Typography variant="h6">Title:</Typography>
              <TextField
                className="input"
                type="text"
                value={title}
                variant="standard"
                sx={{ margin: "5px" }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="h6">Product Name:</Typography>
              <TextField
                className="input"
                type="text"
                value={prodName}
                variant="standard"
                sx={{ margin: "5px" }}
                onChange={(e) => setProdName(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="h6">Product ID:</Typography>
              <TextField
                className="input"
                type="text"
                value={productID}
                variant="standard"
                sx={{ margin: "5px" }}
                onChange={(e) => setProductID(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="h6">Description:</Typography>
              <TextField
                className="input"
                type="text"
                value={description}
                variant="standard"
                sx={{ margin: "5px" }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>

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
          Add banner
        </Button>

        <form onSubmit={handleSubmit} style={{ width: "60%" }}>
          <Box sx={style.box1}>
            <TextField
              className="input"
              placeholder="Search Banner..."
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
