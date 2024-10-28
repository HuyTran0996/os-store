import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box, Select, MenuItem, Button } from "@mui/material";

import { useThunk } from "../hook/use-thunk";

import {
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from "../store/thunks/fetchEnquiry";

import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";

const EnquiryDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [getDataEnquiry] = useThunk(getEnquiryById);
  const [updateEnquiryById] = useThunk(updateEnquiry);
  const [deleteMessage] = useThunk(deleteEnquiry);

  const { dataEnquiry } = useSelector((state) => {
    return state.enquiries;
  });

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getDataEnquiry(params.id);
      setStatus(data.status);
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [params.id]);

  const handleUpdateStatus = async () => {
    try {
      setIsLoading(true);
      await updateEnquiryById({ id: params.id, status });
      await getData();
      showToast(`Update successfully`, "success");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteMessage(params.id);
      navigate("/enquiries");
      showToast(`Delete successfully`, "success");
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
          Enquiry Detail
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
              Name: {dataEnquiry.name} <br /> Email: {dataEnquiry.email}
              <br /> Phone: {dataEnquiry.phone} <br />
              Create at:{" "}
              {new Date(dataEnquiry.createdAt).toLocaleDateString("en-CA", {
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
                  justifyContent: "end",
                }}
              >
                <Typography variant="p">Status:</Typography>

                <Select
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{
                    margin: "10px",
                  }}
                >
                  <MenuItem value="Submitted">Submitted</MenuItem>
                  <MenuItem value="Contacted">Contacted</MenuItem>
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                </Select>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                }}
              >
                <Button
                  variant="contained"
                  disabled={isLoading}
                  onClick={handleUpdateStatus}
                >
                  {isLoading ? "Updating..." : "Update Status"}
                </Button>
                <Button
                  variant="contained"
                  disabled={isLoading}
                  color="error"
                  onClick={handleDelete}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </Button>
              </Box>
            </Box>
          </Box>

          {/* message */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
              border: "0.5px solid",
              borderRadius: "7px",
              padding: "10px",
            }}
          >
            {/* order info */}
            <Typography variant="h5">Message:</Typography>
            <Typography variant="h6">{dataEnquiry.message}</Typography>
            {/* Status */}
          </Box>
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default EnquiryDetail;
