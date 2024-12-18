import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Box, Button, Modal, TextField } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useThunk } from "../hook/use-thunk";
import {
  getAllBanner,
  updateBanner,
  deleteBanner,
  smartBannerSearch,
} from "../store/thunks/fetchBanners";

import DataGridTable from "../components/DataGridTable";

import { showToast } from "../components/ToastMessage";
import ContainerLayout from "../components/ContainerLayout";
import imageNotFound from "../images/imageNotFound.png";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import { EditToolbarBannerList } from "../components/EditToolbar/EditToolbarBannerList";

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
  const [prodName, setProdName] = useState(params.row.prodName);
  const [productID, setProductID] = useState(params.row.productID);
  const [description, setDescription] = useState(params.row.description);

  const [imageChange, setImageChange] = useState("");
  const [update] = useThunk(updateBanner);
  const [getDataAllBanner] = useThunk(getAllBanner);

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
      formData.append("prodName", prodName);
      formData.append("productID", productID);
      formData.append("description", description);

      if (imageChange.length > 0) {
        imageChange.forEach((image) => {
          formData.append(`images`, image);
        });
      }
      await update(formData);
      await getDataAllBanner();
      showToast(`Update banner successfully`, "success");
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
        <Box sx={style.modal}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6">Title:</Typography>
            <TextField
              className="input"
              type="text"
              value={title}
              variant="standard"
              sx={{ margin: "5px" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6">Product Name:</Typography>
            <TextField
              className="input"
              type="text"
              value={prodName}
              variant="standard"
              sx={{ margin: "5px" }}
              onChange={(e) => setProdName(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6">Product ID:</Typography>
            <TextField
              className="input"
              type="text"
              value={productID}
              variant="standard"
              sx={{ margin: "5px" }}
              onChange={(e) => setProductID(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6">Description:</Typography>
            <TextField
              className="input"
              type="text"
              value={description}
              variant="standard"
              sx={{ margin: "5px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

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

const BannerList = () => {
  ///////////// declare///////////////
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelf, setIsLoadingSelf] = useState(false);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState(null);

  let [searchParams] = useSearchParams();

  let search = String(searchParams.get("search"));

  const [getDataAllBanner] = useThunk(getAllBanner);
  const [bannerDelete] = useThunk(deleteBanner);
  const [smartBannerSearching] = useThunk(smartBannerSearch);

  const { dataAllBanner } = useSelector((state) => {
    return state.banner;
  });
  /////////////End declare///////////////

  const getData = async () => {
    try {
      setIsLoading(true);
      if (search.trim() === "" || search === "null") {
        await getDataAllBanner();
      } else {
        smartBannerSearching({ searchField: search.trim() });
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
    const dataUpdate = dataAllBanner.banners?.map((banner) => {
      return {
        ...banner,
        id: banner._id,
        createdAt: new Date(banner.createdAt),
      };
    });
    setRows(dataUpdate);
  }, [dataAllBanner]);
  //////////////////////

  const action = async (functionA) => {
    try {
      setIsLoadingSelf(true);
      await functionA;
      await getDataAllBanner();
    } catch (err) {
      showToast(`${err.message}`, "error", 3000);
    } finally {
      setIsLoadingSelf(false);
    }
  };

  const handleDeleteABrand = (id) => async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this banner?"
    );

    if (confirmed) {
      await action(bannerDelete(id));
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
    { field: "id", headerName: "ID", width: 20 },
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
      field: "prodName",
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "productID",
      headerName: "product ID",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description",
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
          Brands
        </Typography>

        <DataGridTable
          rows={rows}
          columns={columns}
          isLoading={isLoading}
          isLoadingSelf={isLoadingSelf}
          setIsLoadingSelf={setIsLoadingSelf}
          EditToolbar={EditToolbarBannerList}
          rowHeight={120}
        />
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

export default BannerList;
