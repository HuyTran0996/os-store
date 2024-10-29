import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

import "../styles/Profile.scss";
import { useThunk } from "../hook/use-thunk";

import {
  getUserInfo,
  updateNamePhone,
  blockUser,
} from "../store/thunks/fetchUsers";
import { getAllOrders } from "../store/thunks/fetchOrders";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { showToast } from "../components/ToastMessage";
import { Loading } from "../components/Loading/Loading";
import Paginate from "../components/Pagination";
import DataGridTable from "../components/DataGridTable";

const style = {
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
  const [getUser] = useThunk(getUserInfo);
  const [updateUser] = useThunk(updateNamePhone);
  const [block] = useThunk(blockUser);
  const [getOrders] = useThunk(getAllOrders);

  const userInfo = localStorage.getItem("userData");
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
        navigate("/");
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
    <Box className="profilePage">
      <Meta title="Profile" />
      <BreadCrumb title="Profile" />
      {isLoading ? (
        <Loading message="Loading..." />
      ) : (
        <div className="profile-wrapper">
          <div className="info">
            <h4>My Info:</h4>
            <h5>User Email: {email}</h5>
            <div>
              <h5>User Name:</h5>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <h5>User Phone:</h5>

              <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
              />
            </div>
            <div className="function">
              <button
                disabled={isLoading}
                className="button"
                onClick={handleChangeInfo}
              >
                Update Info
              </button>
              <Link to="/changePassword" className="button">
                Change Password
              </Link>
              <button
                disabled={isLoading}
                className="button"
                onClick={handleBlockUser}
              >
                Remove Account
              </button>
            </div>
          </div>

          <div className="myOrders">
            <h4>My Orders:</h4>
            <DataGridTable
              rows={rows}
              columns={columns}
              isLoading={isLoadingTable}
            />
            {/* Pagination */}
            <Box sx={style.boxPagination}>
              <Paginate data={dataOrder} />
            </Box>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Profile;
