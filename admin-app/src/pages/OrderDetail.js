import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box, Select, MenuItem, Button } from "@mui/material";

import { useThunk } from "../hook/use-thunk";
import { getOrderById, updateOrder } from "../store/thunks/fetchOrders";

import { showToast } from "../components/ToastMessage";
import DataGridTable from "../components/DataGridTable";
import ContainerLayout from "../components/ContainerLayout";

const OrderDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [getDataOrder] = useThunk(getOrderById);
  const [updateOrderById] = useThunk(updateOrder);

  const { dataOrder } = useSelector((state) => {
    return state.orders;
  });

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getDataOrder(params.id);
      setOrderStatus(data.orderStatus);
      setPaymentStatus(data.paymentIntent.status);
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [params.id]);

  useEffect(() => {
    const dataUpdate = dataOrder.products?.map((product) => {
      return {
        ...product,
        id: product._id,
      };
    });
    setRows(dataUpdate);
  }, [dataOrder]);
  const columns = [
    // { field: "id", headerName: "Product ID", width: 220 },

    {
      field: "product",
      headerName: "Product Name",
      width: 200,
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
            onClick={() => navigate(`/productList/${id}`)}
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
      width: 200,
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

  const handleUpdateStatus = async () => {
    try {
      setIsLoading(true);
      await updateOrderById({ orderId: params.id, orderStatus, paymentStatus });
      await getData();
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerLayout>
      <Box sx={{ margin: "20px" }}>
        <Typography variant="h3" sx={{ marginBottom: "20px" }}>
          Order Detail
        </Typography>

        <Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              border: "0.5px solid",
              borderRadius: "7px",
              padding: "10px",
            }}
          >
            {/* order info */}
            <Typography variant="h7">
              Order Code: {dataOrder._id} <br />
              Order by: {dataOrder.orderby?.name} - Email:{" "}
              {dataOrder.orderby?.email} - role: {dataOrder.orderby?.role}{" "}
              <br /> Phone: {dataOrder.orderby?.phone}
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
                <Typography variant="p">Order Status:</Typography>

                <Select
                  required
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  sx={{
                    margin: "10px",
                  }}
                >
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="p">Payment Status:</Typography>
                <Select
                  required
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  sx={{
                    margin: "10px",
                  }}
                >
                  <MenuItem value="Unpaid">Unpaid</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                </Select>
              </Box>
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                disabled={isLoading}
                onClick={handleUpdateStatus}
              >
                Update Status
              </Button>
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
              sx={{ textAlign: "right", margin: "10px 15px 0 0" }}
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
      </Box>
    </ContainerLayout>
  );
};

export default OrderDetail;
