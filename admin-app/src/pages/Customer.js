import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
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
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { GiSharkBite } from "react-icons/gi";

import { EditToolbarCustomer } from "../components/EditToolbar/EditToolbarCustomer";

const Customer = () => {
  ///////////// declare///////////////
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelf, setIsLoadingSelf] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  let search = String(searchParams.get("search"));

  const [getDataAllUser] = useThunk(getAllUser);
  const [smartUserSearching] = useThunk(smartUserSearch);
  const [block] = useThunk(blockUser);
  const [unblock] = useThunk(unblockUser);
  const [updateUserNameEmail] = useThunk(updateNameEmail);
  const [changeRoleUser] = useThunk(changeRole);
  const [deleteAUser] = useThunk(deleteUser);

  const { dataAllUser } = useSelector((state) => {
    return state.users;
  });
  /////////////End declare///////////////

  const getData = async () => {
    try {
      setIsLoading(true);
      if (search.trim() === "" || search === "null") {
        await getDataAllUser(page);
      } else {
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

  //convert data to for table//////
  useEffect(() => {
    const dataUpdate = dataAllUser.users?.map((user) => {
      return {
        ...user,
        id: user._id,
        phone: user.phone.replace(/"/g, ""),
        createdAt: new Date(user.createdAt),
      };
    });
    setRows(dataUpdate);
  }, [dataAllUser]);
  //////////////////////

  const action = async (functionA) => {
    try {
      setIsLoadingSelf(true);
      await functionA;
      await getDataAllUser(page);
    } catch (err) {
      showToast(`${err.message}`, "error", 3000);
    } finally {
      setIsLoadingSelf(false);
    }
  };

  const handleBlockUser = (id) => async () => {
    action(block(id));
  };
  const handleUnBlockUser = (id) => async () => {
    action(unblock(id));
  };
  const handleChangeRoleUser = (id, role) => async () => {
    action(changeRoleUser({ userId: id, role }));
  };
  const handleDeleteAUser = (id) => async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      await action(deleteAUser(id));
    }
  };

  //Note: the only way to get input value to update name and phone in back-end is to use newRow value of MUI in this function
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    action(
      updateUserNameEmail({
        id: newRow.id,
        name: newRow.name,
        phone: newRow.phone.toString(),
      })
    );

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
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "phone",
      headerName: "Phone",
      type: "phone",
      width: 150,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      type: "actions",

      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<PersonIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleChangeRoleUser(id, "user")}
            sx={row.role === "user" ? { backgroundColor: "#4caf50" } : ""}
          />,

          <GridActionsCellItem
            icon={<SupportAgentIcon />}
            label="Delete"
            onClick={handleChangeRoleUser(id, "admin")}
            sx={row.role === "admin" ? { backgroundColor: "#4caf50" } : ""}
          />,
          <GridActionsCellItem
            icon={<GiSharkBite style={{ fontSize: "22px" }} />}
            label="Delete"
            onClick={handleChangeRoleUser(id, "manager")}
            sx={row.role === "manager" ? { backgroundColor: "#afb42b" } : ""}
          />,
        ];
      },
    },
    {
      field: "isBlocked",
      headerName: "Status",
      type: "actions",
      width: 120,
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<PersonIcon />}
            label="Edit"
            className="textPrimary"
            onClick={row.isBlocked && handleUnBlockUser(id)}
            sx={row.isBlocked ? "" : { backgroundColor: "#4caf50" }}
          />,
          <GridActionsCellItem
            icon={<PersonOffIcon />}
            label="Delete"
            onClick={row.isBlocked === false && handleBlockUser(id)}
            sx={row.isBlocked ? { backgroundColor: "#f44336" } : ""}
          />,
        ];
      },
    },
    {
      field: "createdAt",
      headerName: "Join date",
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
            onClick={handleDeleteAUser(id)}
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
          EditToolbar={EditToolbarCustomer}
        />
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
      </Box>
    </ContainerLayout>
  );
};

export default Customer;
