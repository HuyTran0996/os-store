import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useThunk } from "../hook/use-thunk";
import { getAllOrders, smartOrderSearch } from "../store/thunks/fetchOrders";

import DataGridTable from "../components/DataGridTable";
import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";

import EditIcon from "@mui/icons-material/Edit";

import { EditToolbarOrderList } from "../components/EditToolbar/EditToolbarOrderList";

const OrderList = () => {
  ///////////// declare///////////////
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [rows, setRows] = useState([]);
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  let search = String(searchParams.get("search"));

  const [getDataAllOrders] = useThunk(getAllOrders);

  const [smartOrderSearching] = useThunk(smartOrderSearch);

  const { dataAllOrders } = useSelector((state) => {
    return state.orders;
  });
  /////////////End declare///////////////

  const getData = async () => {
    try {
      setIsLoading(true);
      if (search.trim() === "" || search === "null") {
        const params =
          filter === "all"
            ? `page=${page}`
            : `orderStatus=${filter}&page=${page}`;

        await getDataAllOrders(params);
      } else {
        await smartOrderSearching({
          page,
          searchField: search.trim(),
          ...(filter !== "all" && { filter }),
        });
      }
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [search, filter]);

  //convert data to for table//////
  useEffect(() => {
    const dataUpdate = dataAllOrders.orders?.map((order) => {
      return {
        ...order,
        id: order._id,
        createdAt: new Date(order.createdAt),
      };
    });
    setRows(dataUpdate);
  }, [dataAllOrders]);
  //////////////////////

  const columns = [
    { field: "orderCode", headerName: "Order Code", width: 220 },

    {
      field: "orderbyEmail",
      headerName: "Order By",
      width: 200,
    },
    {
      field: "paymentIntent",
      headerName: "Payment Method",
      width: 200,
      renderCell: (params) => {
        let method = params.row.paymentIntent.method;
        return <div>{method}</div>;
      },
    },
    {
      headerName: "Order Value",
      width: 200,
      renderCell: (params) => {
        let amount = params.row.paymentIntent.amount;
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
      field: "orderStatus",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        let status = params.row.orderStatus;
        let color =
          status === "Processing"
            ? "#afb42b"
            : status === "Delivered"
              ? "#388e3c"
              : status === "Cancelled"
                ? "#e53935"
                : "";
        return (
          <Box
            sx={{
              color: color,
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {status}
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "date",
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toISOString().split("T")[0].replace(/-/g, "_");
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
            onClick={() => navigate(`/order/${params.row.orderCode}`)}
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
          Orders
        </Typography>

        <DataGridTable
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          EditToolbar={EditToolbarOrderList}
          filter={filter}
          setFilter={setFilter}
        />
      </Box>
    </ContainerLayout>
  );
};

export default OrderList;
