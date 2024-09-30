import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import {
  Box,
  Grid2,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  Badge,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FilterList, ViewModule, ViewStream } from "@mui/icons-material";

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
    color: "#777777",
  },
};

const ProductListFilter = ({ dataAllProductCategory }) => {
  return (
    <Box>
      <Card sx={{ minWidth: 275 }}>
        <CardContent sx={style.filterCard}>
          <Typography sx={style.filterTitle}>Shop By Categories</Typography>
          {/* <Box> */}
          <List sx={style.list}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Trash" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary="Spam" />
              </ListItemButton>
            </ListItem>
          </List>
          {/* </Box> */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductListFilter;
