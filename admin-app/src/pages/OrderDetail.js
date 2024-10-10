import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { useThunk } from "../hook/use-thunk";
import { getOrderById } from "../store/thunks/fetchOrders";

import { showToast } from "../components/ToastMessage";

import DataGridTable from "../components/DataGridTable";

import ContainerLayout from "../components/ContainerLayout";

import EditIcon from "@mui/icons-material/Edit";

import { EditToolbarOrderList } from "../components/EditToolbar/EditToolbarOrderList";

const OrderDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [getDataOrder] = useThunk(getOrderById);

  const { dataOrder } = useSelector((state) => {
    return state.orders;
  });

  const getData = async () => {
    try {
      setIsLoading(true);
      await getDataOrder(params.id);
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
        console.log("aaaa", prodName);
        return <div>{prodName?.variantName || "No variant"}</div>;
      },
    },
    {
      headerName: "Product Brand",
      width: 200,
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
      headerName: "Price",
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
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            // onClick={() => navigate(`/order/${params.row.orderCode}`)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <ContainerLayout>
      <Box sx={{ margin: "20px" }}>
        <Typography variant="h3" sx={{ marginBottom: "20px" }}>
          Order {dataOrder._id}
        </Typography>

        <DataGridTable
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          rowHeight={80}
          // EditToolbar={EditToolbarOrderList}
        />
      </Box>
    </ContainerLayout>
  );
};

export default OrderDetail;
