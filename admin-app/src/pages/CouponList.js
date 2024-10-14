import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Typography, Box } from "@mui/material";
import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import { useThunk } from "../hook/use-thunk";
import {
  getAllUser,
  smartUserSearch,
  blockUser,
  unblockUser,
  updateNameEmail,
  deleteUser,
  changeRole,
} from "../store/thunks/fetchUsers";
import {
  getAllCoupons,
  blockCoupon,
  unblockCoupon,
  deleteCoupon,
} from "../store/thunks/fetchCoupons";

import DataGridTable from "../components/DataGridTable";
import Paginate from "../components/Pagination";
import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import AirplanemodeInactiveIcon from "@mui/icons-material/AirplanemodeInactive";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { GiSharkBite } from "react-icons/gi";

import { EditToolbarCustomer } from "../components/EditToolbar/EditToolbarCustomer";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CouponList = () => {
  ///////////// declare///////////////
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelf, setIsLoadingSelf] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  let search = String(searchParams.get("search"));

  const [getDataAllCoupon] = useThunk(getAllCoupons);
  const [smartUserSearching] = useThunk(smartUserSearch);
  const [block] = useThunk(blockCoupon);
  const [unblock] = useThunk(unblockCoupon);
  const [updateUserNameEmail] = useThunk(updateNameEmail);
  const [changeRoleUser] = useThunk(changeRole);
  const [deleteACoupon] = useThunk(deleteCoupon);

  const { dataAllCoupon } = useSelector((state) => {
    return state.coupons;
  });
  /////////////End declare///////////////

  const getData = async () => {
    try {
      setIsLoading(true);
      if (search.trim() === "" || search === "null") {
        await getDataAllCoupon(`page=${page}`);
      } else {
        smartUserSearching({ page, searchField: search.trim() });
      }
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData(page);
  }, [page, search]);

  //convert data to for table//////
  useEffect(() => {
    const dataUpdate = dataAllCoupon.coupons?.map((coupon) => {
      return {
        ...coupon,
        id: coupon._id,
        expiry: new Date(coupon.expiry),
        createdAt: new Date(coupon.createdAt),
      };
    });
    setRows(dataUpdate);
  }, [dataAllCoupon]);
  //////////////////////

  const action = async (functionA) => {
    try {
      setIsLoadingSelf(true);
      await functionA;
      await getDataAllCoupon(`page=${page}`);
    } catch (err) {
      showToast(`${err.message}`, "error", 3000);
    } finally {
      setIsLoadingSelf(false);
    }
  };

  const handleBlockCoupon = (id) => async () => {
    action(block(id));
  };
  const handleUnBlockCoupon = (id) => async () => {
    action(unblock(id));
  };

  const handleDeleteCoupon = (id) => async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this coupon?"
    );

    if (confirmed) {
      await action(deleteACoupon(id));
    }
  };

  //Note: the only way to get input value to update name and phone in back-end is to use newRow value of MUI in this function
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    console.log("eeee", newRow);
    // action(
    //   updateUserNameEmail({
    //     id: newRow.id,
    //     name: newRow.name,
    //     phone: newRow.phone.toString(),
    //   })
    // );

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  //////////////MUI DATA GRID functions, no need to care this//////////
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  ///////////////////////////

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 200, editable: true },
    {
      field: "discount",
      headerName: "Discount",
      width: 150,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Create date",
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toISOString().split("T")[0].replace(/-/g, "_");
      },
    },
    {
      field: "expiry",
      headerName: "Expiration date (yyyy/mm/dd)",
      width: 250,
      //note: MobileDatePicker won't work as expected of editable: true
      // editable: true,
      renderCell: (params) => {
        const handleDateChange = (id, newValue) => {
          const updatedRows = rows.map((row) =>
            row.id === id ? { ...row, expiry: newValue.toDate() } : row
          );
          setRows(updatedRows);
        };
        return (
          <div onClick={handleEditClick(params.row.id)}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
                defaultValue={dayjs(params.value)}
                onChange={(newValue) =>
                  handleDateChange(params.row.id, newValue)
                }
                format="YYYY_MM_DD"
              />
            </LocalizationProvider>
          </div>
        );
      },
    },

    {
      field: "isActive",
      headerName: "Status",
      type: "actions",
      width: 120,
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<AirplanemodeActiveIcon />}
            onClick={row.isActive === false && handleUnBlockCoupon(id)}
            sx={row.isActive ? { backgroundColor: "#4caf50" } : ""}
          />,
          <GridActionsCellItem
            icon={<AirplanemodeInactiveIcon />}
            onClick={row.isActive && handleBlockCoupon(id)}
            sx={row.isActive ? "" : { backgroundColor: "#f44336" }}
          />,
        ];
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteCoupon(id)}
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
          Customers
        </Typography>

        <DataGridTable
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          isLoadingSelf={isLoadingSelf}
          rowModesModel={rowModesModel}
          handleRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          // EditToolbar={EditToolbarCustomer}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Paginate data={dataAllCoupon} />
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default CouponList;
