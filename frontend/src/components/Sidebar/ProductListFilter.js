import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  TextField,
  Collapse,
  Button,
  Paper,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { showToast } from "../ToastMessage";

const style = {
  filterCard: {
    borderRadius: "10px",
    padding: "15px 15px 25px",
    marginBottom: "3px",
  },
  filterTitle: {
    fontSize: "16px",
    lineHeight: "20px",
    fontWeight: "600",
  },
  list: {
    fontSize: "13px",
    lineHeight: "30px",
  },
};

const NestedList = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <Typography sx={style.filterTitle}>{title}</Typography>
        {open ? <ExpandLess /> : <ExpandMore />}
      </Button>

      {
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box>{children}</Box>
        </Collapse>
      }
    </>
  );
};

const ProductListFilter = ({
  dataAllProductCategory,
  dataAllBrand,
  setFilterString,
  filter,
  setFilter,
  initialState,
}) => {
  const navigate = useNavigate();
  const handleChange = (name, value) => {
    if (name === "priceFrom" || name === "priceTo") {
      setFilter((prevFilters) => ({
        ...prevFilters,
        [name]: Number(value),
      }));
    } else {
      setFilter((prevFilters) => ({
        ...prevFilters,
        [name]: prevFilters[name].includes(value)
          ? prevFilters[name].filter((v) => v !== value)
          : [...prevFilters[name], value],
      }));
    }
  };

  let queryString = "";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (filter.priceFrom > filter.priceTo || filter.priceFrom < 0) {
      return showToast("Bad price request", "error");
    }
    if (filter.category.length > 0) {
      filter.category.forEach((category) => {
        queryString += `category=${category}&`;
      });
    }
    if (filter.brand.length > 0) {
      filter.brand.forEach((brand) => {
        queryString += `brand=${brand}&`;
      });
    }
    if (filter.priceTo > 0) {
      queryString += `price[gte]=${filter.priceFrom}&price[lte]=${filter.priceTo}`;
    }
    setFilterString(queryString);
    navigate(`/productList?&page=${1}`);
  };

  const handleClearFilter = () => {
    setFilter(initialState);
    setFilterString("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper
        elevation={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: "350px",
          padding: "10px",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button variant="outlined" onClick={handleClearFilter}>
            Clear Filter
          </Button>
          <Button variant="contained" type="submit">
            Apply Filter
          </Button>
        </Box>

        {/* Categories */}
        <Card sx={style.filterCard}>
          <NestedList title="Shop By Categories">
            <Box
              sx={{
                ...style.list,
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(100px, auto))",
                gap: "5px",
                marginTop: "10px",
              }}
            >
              {dataAllProductCategory.categories?.map((category, index) => {
                return (
                  <FormControlLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "& .MuiTypography-root": {
                        color: filter.category.includes(category.title)
                          ? "#00e676"
                          : "#777777",
                      },
                    }}
                    key={index}
                    name="category"
                    control={
                      <Checkbox
                        checked={filter.category.includes(category.title)}
                        onChange={() =>
                          handleChange("category", category.title)
                        }
                      />
                    }
                    label={category.title}
                  />
                );
              })}
            </Box>
          </NestedList>
        </Card>

        {/* Brands */}
        <Card sx={style.filterCard}>
          <NestedList title="Shop By Brands">
            <Box
              sx={{
                ...style.list,
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(100px, auto))",
                gap: "5px",
                marginTop: "10px",
              }}
            >
              {dataAllBrand.brands?.map((brand, index) => {
                return (
                  <FormControlLabel
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      "& .MuiTypography-root": {
                        color: filter.brand.includes(brand.title)
                          ? "#00e676"
                          : "#777777",
                      },
                    }}
                    key={index}
                    name="brand"
                    control={
                      <Checkbox
                        checked={filter.brand.includes(brand.title)}
                        onChange={() => handleChange("brand", brand.title)}
                      />
                    }
                    label={brand.title}
                  />
                );
              })}
            </Box>
          </NestedList>
        </Card>

        {/* Price */}
        <Card sx={style.filterCard}>
          <NestedList title="Shop By Price">
            <Box
              sx={{
                ...style.list,
                display: "flex",
                gap: "5px",
                marginTop: "10px",
              }}
            >
              <TextField
                required
                type="number"
                value={filter.priceFrom}
                placeholder="From..."
                onChange={(e) => handleChange("priceFrom", e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                required
                type="number"
                value={filter.priceTo}
                placeholder="To..."
                onChange={(e) => handleChange("priceTo", e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </NestedList>
        </Card>
      </Paper>
    </form>
  );
};

export default ProductListFilter;
