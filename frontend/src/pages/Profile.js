import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import "../styles/Profile.scss";
import { useThunk } from "../hook/use-thunk";
import {
  getUserInfo,
  updateNamePhone,
  blockUser,
} from "../store/thunks/fetchUsers";

import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { showToast } from "../components/ToastMessage";
import { Loading } from "../components/Loading/Loading";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [getUser] = useThunk(getUserInfo);
  const [updateUser] = useThunk(updateNamePhone);
  const [block] = useThunk(blockUser);

  const userInfo = localStorage.getItem("userData");
  const parsedUserData = JSON.parse(userInfo);

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
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <button
              disabled={isLoading}
              className="button"
              onClick={handleBlockUser}
            >
              Remove Account
            </button>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Profile;
