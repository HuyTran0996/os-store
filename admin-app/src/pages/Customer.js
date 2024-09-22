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
import { getAllUser, smartUserSearch } from "../store/thunks/fetchUsers";

import DataGridTable from "../components/DataGridTable";
import Paginate from "../components/Pagination";
import { showToast } from "../components/ToastMessage";

const Customer = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  let search = String(searchParams.get("search"));
  const [getDataAllUser] = useThunk(getAllUser);
  const [smartUserSearching] = useThunk(smartUserSearch);
  const { dataAllUser } = useSelector((state) => {
    return state.users;
  });
  const getData = async () => {
    try {
      setIsLoading(true);
      if (search.trim() === "" || search === "null") {
        console.log("empty search");
        await getDataAllUser(page);
      } else {
        console.log("search is", search);
        smartUserSearching({ page, searchField: search.trim() });
      }
    } catch (err) {
      showToast(`err.message`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page, search]);

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
