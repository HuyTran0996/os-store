import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  TextField,
  IconButton,
  Button,
  CardMedia,
  Modal,
} from "@mui/material";
import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import { useThunk } from "../hook/use-thunk";
import { getAllBrand } from "../store/thunks/fetchBrands";

import DataGridTable from "../components/DataGridTable";
import Paginate from "../components/Pagination";
import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";
import imageNotFound from "../images/imageNotFound.png";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
// import PersonIcon from "@mui/icons-material/Person";
// import PersonOffIcon from "@mui/icons-material/PersonOff";
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import SearchIcon from "@mui/icons-material/Search";
// import AddIcon from "@mui/icons-material/Add";
// import { GiSharkBite } from "react-icons/gi";
import { EditToolbarBrandList } from "../components/EditToolbar/EditToolbarBrandList";

const BrandList = () => {
  ///////////// declare///////////////
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelf, setIsLoadingSelf] = useState(false);
  const [imageChange, setImageChange] = useState("");
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  let search = String(searchParams.get("search"));

  const [getDataAllBrand] = useThunk(getAllBrand);
  // const [smartUserSearching] = useThunk(smartUserSearch);
  // const [updateUserNameEmail] = useThunk(updateNameEmail);
  // const [deleteAUser] = useThunk(deleteUser);

  const { dataAllBrand } = useSelector((state) => {
    return state.brands;
  });
  /////////////End declare///////////////

  const getData = async () => {
    try {
      setIsLoading(true);
      if (search.trim() === "" || search === "null") {
        await getDataAllBrand(page);
      } else {
        // smartUserSearching({ page, searchField: search.trim() });
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
    const dataUpdate = dataAllBrand.brands?.map((brand) => {
      return {
        ...brand,
        id: brand._id,
        createdAt: new Date(brand.createdAt),
      };
    });
    setRows(dataUpdate);
  }, [dataAllBrand]);
  //////////////////////

  const action = async (functionA) => {
    try {
      setIsLoadingSelf(true);
      await functionA;
      await getDataAllBrand(page);
    } catch (err) {
      showToast(`${err.message}`, "error", 3000);
    } finally {
      setIsLoadingSelf(false);
    }
  };

  const handleDeleteABrand = (id) => async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      // await action(deleteAUser(id));
    }
  };

  //Note: the only way to get input value to update name and phone in back-end is to use newRow value of MUI in this function
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

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
    {
      field: "images",
      type: "images",
      headerName: "Images",
      width: 180,
      editable: true,
      renderCell: (params) => {
        let image;
        if (imageChange !== "") {
          image = URL.createObjectURL(imageChange[0]);
        } else {
          image = params.row.images[0]?.url;
        }

        return (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "7px",
            }}
          >
            <img
              src={image || imageNotFound}
              alt="brand"
              style={{
                height: "100px",
                objectFit: "contain",
              }}
            />

            <Button component="label" variant="contained" disabled={isLoading}>
              Change Images
              <TextField
                id="img"
                type="file"
                name="images"
                sx={{
                  display: "none",
                }}
                slotProps={{
                  htmlInput: {
                    multiple: false,
                    onChange: (e) => setImageChange(Array.from(e.target.files)),
                  },
                }}
                required
              />
            </Button>
          </Box>
        );
      },
    },
    { field: "title", headerName: "Title", width: 200, editable: true },

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
            onClick={handleDeleteABrand(id)}
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
          Brands
        </Typography>

        <DataGridTable
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          isLoadingSelf={isLoadingSelf}
          setIsLoadingSelf={setIsLoadingSelf}
          rowModesModel={rowModesModel}
          handleRowModesModelChange={handleRowModesModelChange}
          processRowUpdate={processRowUpdate}
          EditToolbar={EditToolbarBrandList}
          rowHeight={160}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Paginate data={dataAllBrand} />
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default BrandList;
