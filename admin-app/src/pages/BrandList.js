import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useThunk } from "../hook/use-thunk";
import {
  getAllBrand,
  updateBrand,
  deleteBrand,
  smartBrandSearch,
} from "../store/thunks/fetchBrands";
import { getAllCategory } from "../store/thunks/fetchProductCategories";

import DataGridTable from "../components/DataGridTable";
import Paginate from "../components/Pagination";
import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";
import imageNotFound from "../images/imageNotFound.png";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import { EditToolbarBrandList } from "../components/EditToolbar/EditToolbarBrandList";

const style = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },

  removeTagButton: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "red",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
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
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState(params.row.tag);
  const [update] = useThunk(updateBrand);
  const [getDataAllBrand] = useThunk(getAllBrand);
  const [getAllProdCategory] = useThunk(getAllCategory);
  const { dataAllProductCategory } = useSelector(
    (state) => state.productCategories
  );

  useEffect(() => {
    const getCategory = async () => {
      try {
        setIsLoadingSelf(true);
        const result = await getAllProdCategory(1, 10000);
        setCategory(result?.categories[0]?.title);
      } catch (err) {
        showToast(`${err.message}`, "error");
      } finally {
        setIsLoadingSelf(false);
      }
    };
    getCategory();
  }, []);

  let image;
  if (imageChange !== "") {
    image = URL.createObjectURL(imageChange[0]);
  } else image = params.row.images[0]?.url || imageNotFound;

  const handleChangeBrand = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingSelf(true);
      const formData = new FormData();
      formData.append("brandId", params.row.id);
      formData.append("title", title);
      formData.append("tag", JSON.stringify(tag));
      if (imageChange.length > 0) {
        imageChange.forEach((image) => {
          formData.append(`images`, image);
        });
      }
      await update(formData);
      await getDataAllBrand();
      showToast(`Update brand successfully`, "success");
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoadingSelf(false);
      handleClose(false);
      setImageChange("");
      setTitle("");
    }
  };

  const handleAddTag = () => {
    if (!category.trim()) return;

    setTag((prevState) => {
      const find = prevState.findIndex((item) => item.title === category);
      if (find !== -1) {
        showToast("Duplicate tag", "error");
        return prevState;
      }
      return [...prevState, { title: category }];
    });
  };

  const handleRemoveFromTag = (categoryToRemove) => {
    setTag((prevState) =>
      prevState.filter((tag) => tag.title !== categoryToRemove)
    );
  };

  return (
    <form onSubmit={handleChangeBrand}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style.modal}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="h4">Title:</Typography>
            <TextField
              className="input"
              placeholder="Title..."
              type="text"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>

          {/* Add Tag */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4">Tag:</Typography>
            <Select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              sx={{
                ...style.input,
                minWidth: "120px",
                height: "36px",
                margin: "0 10px",
              }}
              // variant="standard"
            >
              {dataAllProductCategory.categories?.map((category, index) => {
                const categoryValue = category.title;
                return (
                  <MenuItem key={index} value={categoryValue}>
                    {category.title}
                  </MenuItem>
                );
              })}
            </Select>
            <Button
              variant="contained"
              disabled={isLoadingSelf}
              onClick={handleAddTag}
            >
              Add Tag
            </Button>
          </Box>

          {/* Render tag list */}
          {tag.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                margin: "15px 0",
              }}
            >
              {tag.map((category, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: "blue",
                    position: "relative",
                    width: "80px",
                    borderRadius: "7px",
                  }}
                >
                  <Box
                    sx={{
                      padding: "5px",
                      position: "relative",
                      textAlign: "center",
                    }}
                  >
                    {category.title}
                  </Box>
                  <Box
                    sx={style.removeTagButton}
                    onClick={() => handleRemoveFromTag(category.title)}
                  >
                    &times;
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* IMAGE */}
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

const BrandList = () => {
  ///////////// declare///////////////
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelf, setIsLoadingSelf] = useState(false);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState(null);

  let [searchParams] = useSearchParams();

  let search = String(searchParams.get("search"));

  const [getDataAllBrand] = useThunk(getAllBrand);
  const [brandDelete] = useThunk(deleteBrand);
  const [smartBrandSearching] = useThunk(smartBrandSearch);

  const { dataAllBrand } = useSelector((state) => {
    return state.brands;
  });
  /////////////End declare///////////////

  const getData = async () => {
    try {
      setIsLoading(true);
      if (search.trim() === "" || search === "null") {
        await getDataAllBrand();
      } else {
        smartBrandSearching({ searchField: search.trim() });
      }
    } catch (err) {
      showToast(`${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [search]);

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
      await getDataAllBrand();
    } catch (err) {
      showToast(`${err.message}`, "error", 3000);
    } finally {
      setIsLoadingSelf(false);
    }
  };

  const handleDeleteABrand = (id) => async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this brand?"
    );

    if (confirmed) {
      await action(brandDelete(id));
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
      field: "tag",
      headerName: "Tag",
      flex: 1,
      width: 200,
      renderCell: (params) => {
        const arrayTag = params.row.tag;
        return (
          <Box
            sx={{
              //Note: do not use wrap because the height of row is fix
              display: "flex",
              gap: 1.5,
            }}
          >
            {arrayTag.map((tag, index) => (
              <Typography
                variant="p"
                sx={{ height: "30px", padding: "0", margin: "0" }}
                key={index}
              >
                {tag.title}
              </Typography>
            ))}
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
          Brands
        </Typography>

        <DataGridTable
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          isLoadingSelf={isLoadingSelf}
          setIsLoadingSelf={setIsLoadingSelf}
          EditToolbar={EditToolbarBrandList}
          rowHeight={120}
        />
        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Paginate data={dataAllBrand} />
        </Box> */}
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

export default BrandList;
