import React from "react";
import { Link } from "react-router-dom";
import { Box, Paper, Rating } from "@mui/material";
import "../styles/ProductCard.scss";

const ProductCard = (props) => {
  const { grid, product } = props;

  return (
    <Link to={`/productList/${product._id}`} className={`gr-${grid}`}>
      <Paper className="product-card">
        <Box className="product-image">
          <img src={product?.images[0]?.url} alt="product-image" />
          <img src={product?.images[1]?.url} alt="product-image" />
        </Box>

        <Box className="product-details">
          <h6 className="brand">{product.brand}</h6>
          <h5 className="product-title">{product.title}</h5>

          <Rating value={product.totalrating} precision={0.5} readOnly />
          <p
            className="description"
            style={{ display: grid === 12 ? "block" : "none" }}
          >
            {product.description}
          </p>

          <p className="price">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price)}
          </p>
        </Box>
      </Paper>
    </Link>
  );
};

export default ProductCard;
