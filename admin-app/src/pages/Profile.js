import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

import { useThunk } from "../hook/use-thunk";
import {
  getYourInfo,
  updateYourNamePhone,
  blockYourself,
} from "../store/thunks/fetchUsers";
import { getAllOrdersOfYou } from "../store/thunks/fetchOrders";

import { showToast } from "../components/ToastMessage";
import DataGridTable from "../components/DataGridTable";
import ContainerLayout from "../components/ContainerLayout";
import Paginate from "../components/Pagination";

import "../styles/Profile.scss";

const style = {
  boxInput: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  boxButton: { display: "flex", flexWrap: "wrap", gap: "15px" },
  boxPagination: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
};

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [getUser] = useThunk(getYourInfo);
  const [updateUser] = useThunk(updateYourNamePhone);
  const [block] = useThunk(blockYourself);
  const [getOrders] = useThunk(getAllOrdersOfYou);

  const userInfo = localStorage.getItem("adminData");
  const parsedUserData = JSON.parse(userInfo);

  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;

  const getData = async (action) => {
    try {
      setIsLoading(true);
      if (parsedUserData) {
        await action;
        const result = await getUser();
        setName(result.name);
        setPhone(result.phone);
        setEmail(result.email);
      } else {
        showToast("Please Login to your account", "error");
        return;
      }
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setIsLoadingTable(true);
        const result = await getOrders(`page=${page}`);
        setDataOrder(result);
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoadingTable(false);
      }
    };
    getProduct();
  }, [page]);

  //convert data to for table//////
  useEffect(() => {
    const dataUpdate = dataOrder.orders?.map((order) => {
      return {
        ...order,
        id: order._id,
        createdAt: new Date(order.createdAt),
      };
    });
    setRows(dataUpdate);
  }, [dataOrder]);

  const columns = [
    { field: "orderCode", headerName: "Order Code", width: 220 },
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
        let amount = params.row.paymentIntent.totalAfterDiscount;
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
            ? "#f9a825" // Bright yellow
            : status === "Delivered"
              ? "#4caf50" // Green
              : status === "Cancelled"
                ? "#d32f2f" // red
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
      headerName: "Detail",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <Button
            disabled={isLoadingTable || isLoading}
            variant="contained"
            className="button"
            onClick={() => navigate(`/order/${params.row.orderCode}`)}
          >
            View Detail
          </Button>,
        ];
      },
    },
  ];
  //////////////////////

  const handleChangeInfo = async () => {
    alert("Confirm your action");
    getData(updateUser({ name, phone }));
  };
  const handleBlockUser = async () => {
    alert("Confirm your action");
    try {
      setIsLoading(true);
      if (parsedUserData) {
        await block();
        navigate("/login");
      } else {
        showToast("Please Login to your account", "error");
        return;
      }
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContainerLayout>
      <Box sx={{ margin: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          My Info:
        </Typography>

        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          User Email: {email}
        </Typography>

        <Box sx={style.boxInput}>
          <Typography variant="h5">User Name:</Typography>

          <TextField
            className="input"
            placeholder="Name..."
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box sx={style.boxInput} className="phone">
          <Typography variant="h5">User Phone:</Typography>

          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}
          />
        </Box>

        <Box sx={style.boxButton}>
          <Button
            variant="contained"
            disabled={isLoading}
            onClick={handleChangeInfo}
          >
            Update Info
          </Button>
          <Button
            href="/changePassword"
            variant="contained"
            disabled={isLoading}
          >
            Change Password
          </Button>

          <Button
            variant="contained"
            disabled={isLoading}
            onClick={handleBlockUser}
          >
            Remove Account
          </Button>
        </Box>

        <Box sx={{ marginTop: "50px" }}>
          <Typography variant="h5" sx={{ margin: "20px 0" }}>
            My Orders:
          </Typography>
          <DataGridTable
            rows={rows}
            columns={columns}
            isLoading={isLoadingTable}
          />
          <Box sx={style.boxPagination}>
            <Paginate data={dataOrder} />
          </Box>
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default Profile;
