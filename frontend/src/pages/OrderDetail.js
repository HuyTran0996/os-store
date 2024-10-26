import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Select, MenuItem } from "@mui/material";

import "../styles/OrderDetail.scss";
import { useThunk } from "../hook/use-thunk";

import { getOrderById } from "../store/thunks/fetchOrders";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { showToast } from "../components/ToastMessage";
import { Loading } from "../components/Loading/Loading";

import DataGridTable from "../components/DataGridTable";

const OrderDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [rows, setRows] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [getDataOrder] = useThunk(getOrderById);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getDataOrder(params.id);
      setDataOrder(data);
      setOrderStatus(data.orderStatus);
      setPaymentStatus(data.paymentIntent.status);
    } catch (err) {
      showToast(`${err.message}`, "error");
      if (err.message === "User cannot view orders of other accounts") {
        navigate("/");
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [params.id]);

  useEffect(() => {
    const dataUpdate = dataOrder.products?.map((product, index) => {
      return {
        ...product,
        id: product._id,
      };
    });
    setRows(dataUpdate);
  }, [dataOrder]);

  const columns = [
    {
      field: "product",
      headerName: "Product Name",
      width: 350,
      renderCell: (params) => {
        const product = params.row.product;
        const title = product.title;
        const id = product._id;

        const imageUrl =
          product.images && product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/150";
        return (
          <div
            onClick={() => navigate(`/product/${id}`)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={imageUrl}
              alt={title}
              style={{ width: "70px", height: "70px", objectFit: "cover" }}
            />
            {title}
          </div>
        );
      },
    },
    {
      field: "variantSelected",
      headerName: "Variant",
      width: 300,
      renderCell: (params) => {
        let id = params.row.variantSelected;
        const prodName = params.row.product.variant.find((v) => v._id === id);
        return <div>{prodName?.variantName || "No variant"}</div>;
      },
    },
    {
      field: "",
      headerName: "Product Brand",
      width: 150,
      renderCell: (params) => {
        let brand = params.row.product.brand;
        return <div>{brand}</div>;
      },
    },
    {
      field: "count",
      headerName: "Quantity",
    },
    {
      field: "price",
      headerName: "Unit Price",
      width: 150,
      renderCell: (params) => {
        let amount = params.row.price;
        return (
          <div>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)}
          </div>
        );
      },
    },
    {
      headerName: "Total",
      flex: 1,
      renderCell: (params) => {
        let amount = params.row.price;
        let quantity = params.row.count;
        let total = amount * quantity;
        return (
          <div>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </div>
        );
      },
    },
  ];

  return (
    <Box className="orderDetailPage">
      <Meta title="Order Detail" />
      <BreadCrumb title="Order Detail" />
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <div className="orderDetail-wrapper">
          <div className="myOrders">
            <h4>Orders Code: {params.id}</h4>
            <Box>
              <Box
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                {/* order info */}
                <Typography variant="h7">
                  Order by: {dataOrder.orderby?.name} - Email:{" "}
                  {dataOrder.orderby?.email} <br /> Phone:{" "}
                  {dataOrder.orderby?.phone}
                  <br />
                  Shipping Address: {dataOrder.shippingAddress}
                  <br />
                  Order date:{" "}
                  {new Date(dataOrder.createdAt).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZone: "Asia/Bangkok",
                  })}{" "}
                  (GMT+7)
                </Typography>
                {/* Status */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="p">
                      Order Status: {orderStatus}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="p">
                      Payment Status: {paymentStatus}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* product list */}
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <DataGridTable
                  rows={rows}
                  columns={columns}
                  isLoading={isLoading}
                  rowHeight={80}
                />

                <Typography
                  variant="p"
                  sx={{ textAlign: "right", margin: "20px 15px 0 0" }}
                >
                  Subtotal:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(dataOrder.paymentIntent?.subtotal)}
                  <br />
                  Coupon: {dataOrder.paymentIntent?.couponName} - Discount:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(dataOrder.paymentIntent?.discount)}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ textAlign: "right", marginRight: "15px" }}
                >
                  Total Order:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(dataOrder.paymentIntent?.totalAfterDiscount)}
                </Typography>
              </Box>
            </Box>
          </div>
        </div>
      )}
    </Box>
  );
};

export default OrderDetail;
