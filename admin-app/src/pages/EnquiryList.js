import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useThunk } from "../hook/use-thunk";

import {
  getAllEnquiries,
  smartEnquirySearch,
} from "../store/thunks/fetchEnquiry";

import DataGridTable from "../components/DataGridTable";
import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";
import Paginate from "../components/Pagination";

import EditIcon from "@mui/icons-material/Edit";

import { EditToolbarEnquiryList } from "../components/EditToolbar/EditToolbarEnquiryList";

const EnquiryList = () => {
  ///////////// declare///////////////
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [rows, setRows] = useState([]);
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  let search = String(searchParams.get("search"));

  const [getDataAllEnquiries] = useThunk(getAllEnquiries);

  const [smartEnquirySearching] = useThunk(smartEnquirySearch);

  const { dataAllEnquiries } = useSelector((state) => {
    return state.enquiries;
  });
  /////////////End declare///////////////

  const getData = async () => {
    try {
      setIsLoading(true);
      if (search.trim() === "" || search === "null") {
        const params =
          filter === "all" ? `page=${page}` : `status=${filter}&page=${page}`;

        await getDataAllEnquiries(params);
      } else {
        await smartEnquirySearching({
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
  }, [search, filter, page]);

  //convert data to for table//////
  useEffect(() => {
    const dataUpdate = dataAllEnquiries.enquiries?.map((enquiry) => {
      return {
        ...enquiry,
        id: enquiry._id,
        createdAt: new Date(enquiry.createdAt),
      };
    });
    setRows(dataUpdate);
  }, [dataAllEnquiries]);
  //////////////////////

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "name",
      headerName: "Contact Name",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "message",
      headerName: "Message",
      width: 200,
    },

    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        let status = params.row.status;

        let color =
          status === "Submitted"
            ? "#1976d2" // Blue
            : status === "Contacted"
              ? "#ff9800" // Orange
              : status === "Processing"
                ? "#c1b502" // Yellow
                : status === "Resolved"
                  ? "#4caf50" // Green
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
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => navigate(`/enquiries/${params.row.id}`)}
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
          Enquiries
        </Typography>

        <DataGridTable
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          EditToolbar={EditToolbarEnquiryList}
          filter={filter}
          setFilter={setFilter}
        />

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Paginate data={dataAllEnquiries} />
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default EnquiryList;
