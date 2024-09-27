import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, TextField, IconButton, Button, Modal } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { useThunk } from "../../hook/use-thunk";
import { getAllBrand, createBrand } from "../../store/thunks/fetchBrands";

import { showToast } from "../ToastMessage";

import imageNotFound from "../../images/imageNotFound.png";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const EditToolbarBrandList = (props) => {
  const { isLoadingSelf, setIsLoadingSelf } = props;
  const navigate = useNavigate();
  const [imageChange, setImageChange] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const [getDataAllBrand] = useThunk(getAllBrand);
  const [create] = useThunk(createBrand);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let image;
  if (imageChange !== "") {
    image = URL.createObjectURL(imageChange[0]);
  } else image = imageNotFound;

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/customers?search=${searchValue.trim()}&page=${1}`);
  };
  const handleAddBrand = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingSelf(true);
      const formData = new FormData();
      formData.append("title", title);
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

  return (
    <>
      <form onSubmit={handleAddBrand}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              className="input"
              placeholder="Title..."
              type="text"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
                    console.log("Button clicked");
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

      <GridToolbarContainer
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "7px",
        }}
      >
        <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
          Add brand
        </Button>

        <form onSubmit={handleSubmit} style={{ width: "60%" }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              className="input"
              placeholder="Search User..."
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
