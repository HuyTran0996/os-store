import React, { useEffect, useState } from "react";
import {
  Grid2,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { useThunk } from "../hook/use-thunk";
import { getAllUser } from "../store/thunks/fetchUsers";

import DataGridTable from "../components/DataGridTable";
import Paginate from "../components/Pagination";
import { showToast } from "../components/ToastMessage";

const Customer = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  const [getDataAllUser] = useThunk(getAllUser);
  const { dataAllUser } = useSelector((state) => {
    return state.users;
  });
  const getData = async () => {
    try {
      setIsLoading(true);
      await getDataAllUser(page);
    } catch (err) {
      console.log("err is", err.message);
      if (err.message === "Please log in to get access") {
        showToast("Your Session Is Expired, Please Login Again", "error", 5000);
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <>
      <Container maxWidth="xl" sx={{ padding: "20px" }}>
        <Typography variant="h3" sx={{ marginBottom: "20px" }}>
          Customers
        </Typography>

        <DataGridTable data={dataAllUser} isLoading={isLoading} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Paginate data={dataAllUser} />
        </Box>
      </Container>
    </>
  );
};

export default Customer;
