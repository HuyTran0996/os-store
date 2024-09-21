import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
  randomEmail,
  randomPhoneNumber,
} from "@mui/x-data-grid-generator";

import { showToast } from "./ToastMessage";
import { useThunk } from "../hook/use-thunk";
import {
  blockUser,
  unblockUser,
  getAllUser,
  updateNameEmail,
  deleteUser,
  changeRole,
} from "../store/thunks/fetchUsers";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { GiSharkBite } from "react-icons/gi";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", age: "", role: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function DataGridTable({ data, isLoading }) {
  const [isLoadingSelf, setIsLoadingSelf] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;

  const [block] = useThunk(blockUser);
  const [unblock] = useThunk(unblockUser);
  const [updateUserNameEmail] = useThunk(updateNameEmail);
  const [changeRoleUser] = useThunk(changeRole);
  const [deleteAUser] = useThunk(deleteUser);
  const [getDataAllUser] = useThunk(getAllUser);

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

  useEffect(() => {
    const dataUpdate = data?.users?.map((user) => {
      return {
        ...user,
        id: user._id,
        createdAt: new Date(user.createdAt),
      };
    });
    setRows(dataUpdate);
  }, [data]);

  //////////////MUI DATA GRID functions, no need to care this//////////
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
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
        phone: newRow.phone,
      })
    );

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 180, editable: true },
    { field: "name", headerName: "Name", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 280 },
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
      width: 180,
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
    <Box
      sx={{
        width: "100%",

        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        loading={isLoading || isLoadingSelf}
        autoHeight
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        hideFooter
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
