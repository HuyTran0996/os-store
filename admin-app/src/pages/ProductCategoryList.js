import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box, Button, Modal, TextField } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useThunk } from "../hook/use-thunk";
import {
  getAllCategory,
  updateCategory,
  deleteCategory,
  smartCategorySearch,
} from "../store/thunks/fetchProductCategories";

import DataGridTable from "../components/DataGridTable";
import Paginate from "../components/Pagination";
import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";
import imageNotFound from "../images/imageNotFound.png";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import { EditToolbarProductCategoryList } from "../components/EditToolbar/EditToolbarProductCategoryList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({
  open,
  handleClose,
  params,
  isLoadingSelf,
  setIsLoadingSelf,
}) => {
  const [title, setTitle] = useState(params.row.title);
  const [imageChange, setImageChange] = useState("");
  const [update] = useThunk(updateCategory);
  const [getDataAllCategory] = useThunk(getAllCategory);

  let image;
  if (imageChange !== "") {
    image = URL.createObjectURL(imageChange[0]);
  } else image = params.row.images[0]?.url || imageNotFound;

  const handleChangeBrand = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingSelf(true);
      const formData = new FormData();
      formData.append("categoryId", params.row.id);
      formData.append("title", title);
      if (imageChange.length > 0) {
        imageChange.forEach((image) => {
          formData.append(`images`, image);
        });
      }
      await update(formData);
      await getDataAllCategory();
      showToast(`Update category successfully`, "success");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoadingSelf(false);
      handleClose(false);
      setImageChange("");
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleChangeBrand}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            className="input"
            placeholder="Title..."
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
              src={image}
              alt="brand"
              style={{
                height: "200px",
                objectFit: "contain",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                height: "50px",
                width: "100%",
              }}
            >
              <Button
                component="label"
                variant="outlined"
                disabled={isLoadingSelf}
              >
                Change Image
                <TextField
                  id="img"
                  type="file"
                  name="images"
                  sx={{
                    display: "none",
                  }}
                  slotProps={{
                    htmlInput: {
                      multiple: true,
                      onChange: (e) =>
                        setImageChange(Array.from(e.target.files)),
                    },
                  }}
                  required
                />
              </Button>

              <Button
                variant="contained"
                type="submit"
                onClick={(e) => {
                  handleChangeBrand(e);
                }}
                disabled={isLoadingSelf}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </form>
  );
};

const ProductCategoryList = () => {
  ///////////// declare///////////////
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelf, setIsLoadingSelf] = useState(false);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState(null);

  let [searchParams] = useSearchParams();
  let page = parseInt(searchParams.get("page")) || 1;
  let search = String(searchParams.get("search"));

  const [getDataAllCategory] = useThunk(getAllCategory);
  const [categoryDelete] = useThunk(deleteCategory);
  const [smartCategorySearching] = useThunk(smartCategorySearch);

  const { dataAllProductCategory } = useSelector((state) => {
    return state.productCategories;
  });
  /////////////End declare///////////////

  const getData = async () => {
    try {
      setIsLoading(true);
      if (search.trim() === "" || search === "null") {
        await getDataAllCategory(page);
      } else {
        smartCategorySearching({ page, searchField: search.trim() });
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
    const dataUpdate = dataAllProductCategory.categories?.map((brand) => {
      return {
        ...brand,
        id: brand._id,
        createdAt: new Date(brand.createdAt),
      };
    });
    setRows(dataUpdate);
  }, [dataAllProductCategory]);
  //////////////////////

  const action = async (functionA) => {
    try {
      setIsLoadingSelf(true);
      await functionA;
      await getDataAllCategory(page);
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
      await action(categoryDelete(id));
    }
  };

  const handleEditClick = (params) => {
    setModalParams(params);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalParams(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "images",
      headerName: "Images",
      width: 180,
      renderCell: (params) => {
        const imageUrl = params.row.images[0]?.url || imageNotFound;

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
              src={imageUrl}
              alt="brand"
              style={{
                height: "100px",
                objectFit: "contain",
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
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
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(params)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteABrand(params.row.id)}
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
          Product Categories
        </Typography>

        <DataGridTable
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          isLoadingSelf={isLoadingSelf}
          setIsLoadingSelf={setIsLoadingSelf}
          EditToolbar={EditToolbarProductCategoryList}
          rowHeight={120}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Paginate data={dataAllProductCategory} />
        </Box>
      </Box>
      {modalParams && (
        <BasicModal
          open={modalOpen}
          handleClose={handleCloseModal}
          params={modalParams}
          isLoadingSelf={isLoadingSelf}
          setIsLoadingSelf={setIsLoadingSelf}
        />
      )}
    </ContainerLayout>
  );
};

export default ProductCategoryList;
