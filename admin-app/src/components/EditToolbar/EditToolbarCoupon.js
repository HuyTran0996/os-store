import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { GridToolbarContainer } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  IconButton,
  Button,
  Modal,
  Typography,
  InputAdornment,
} from "@mui/material";

import { useThunk } from "../../hook/use-thunk";
import { createCoupon, getAllCoupons } from "../../store/thunks/fetchCoupons";

import { showToast } from "../ToastMessage";

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

export const EditToolbarCoupon = (props) => {
  const { isLoadingSelf, setIsLoadingSelf } = props;
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [discount, setDiscount] = useState(0);
  const [title, setTitle] = useState("");
  const [expirationDate, setExpirationDate] = useState(() => dayjs(new Date()));
  const [open, setOpen] = useState(false);

  const [create] = useThunk(createCoupon);
  const [getDataAllCoupon] = useThunk(getAllCoupons);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/couponList?search=${searchValue.trim()}`);
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingSelf(true);
      await create({ name: title, expiry: expirationDate, discount });
      await getDataAllCoupon(`page=1`);
      showToast(`Create coupon successfully`, "success");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoadingSelf(false);
      setOpen(false);
      setTitle("");
      setDiscount(0);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={handleAddCoupon}>
          <Box sx={style.modal}>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h6">Name:</Typography>
              <TextField
                className="input"
                type="text"
                value={title}
                variant="standard"
                sx={{ marginLeft: "5px" }}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>

            <Box sx={{ display: "flex", marginTop: "10px" }}>
              <Typography variant="h6">Discount:</Typography>
              <TextField
                className="input"
                type="number"
                value={discount}
                variant="standard"
                sx={{ marginLeft: "5px" }}
                onChange={(e) => setDiscount(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box sx={{ marginTop: "15px" }}>
              <Typography variant="h6">Expiration date:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  label="Expiration date:"
                  value={expirationDate}
                  onChange={(newValue) => setExpirationDate(newValue)}
                />
              </LocalizationProvider>
            </Box>

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Modal>

      <GridToolbarContainer sx={style.gridToolbarContainer}>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
          Add coupon
        </Button>

        <form onSubmit={handleSubmit} style={{ width: "80%" }}>
          <Box sx={style.box1}>
            <TextField
              className="input"
              placeholder="Search Coupon..."
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
