import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";

import { Box, Typography, createTheme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

import { showToast } from "./ToastMessage";
import { useThunk } from "../hook/use-thunk";
import { logoutAdmin } from "../store/thunks/fetchUsers";
import Loading from "./Logout/Loading";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FactoryIcon from "@mui/icons-material/Factory";
import WidgetsIcon from "@mui/icons-material/Widgets";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SellIcon from "@mui/icons-material/Sell";
import CreateIcon from "@mui/icons-material/Create";
import SubjectIcon from "@mui/icons-material/Subject";

const NAVIGATION = [
  {
    //Note: to navigate to "/", segment must be " ", not ""
    segment: " ",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "customers",
    title: "Customers",
    icon: <PersonIcon />,
  },
  {
    segment: "catalog",
    title: "Catalog",
    icon: <CategoryIcon />,
    children: [
      {
        segment: "product",
        icon: <AddShoppingCartIcon />,
        title: "Add Product",
      },
      {
        segment: "list-product",
        icon: <ShoppingCartIcon />,
        title: "Product List",
      },

      {
        segment: "brand",
        icon: <FactoryIcon />,
        title: "Brand",
      },
      {
        segment: "list-brand",
        icon: <FactoryIcon />,
        title: "Brand List ",
      },

      {
        segment: "category",
        icon: <WidgetsIcon />,
        title: "Category",
      },
      {
        segment: "list-category",
        icon: <WidgetsIcon />,
        title: "Category List",
      },

      {
        segment: "color",
        icon: <FormatColorFillIcon />,
        title: "Color",
      },
      {
        segment: "list-color",
        icon: <FormatColorFillIcon />,
        title: "Color List",
      },
    ],
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <AssignmentIcon />,
  },
  {
    segment: "marketing",
    title: "Marketing",
    icon: <LocalActivityIcon />,
    children: [
      {
        segment: "coupon",
        title: "Add Coupon",
        icon: <AddCircleIcon />,
      },
      {
        segment: "coupon-list",
        title: "Coupon List",
        icon: <SellIcon />,
      },
    ],
  },
  {
    segment: "blogs",
    title: "Blogs",
    icon: <CreateIcon />,
    children: [
      {
        segment: "blog",
        icon: <AddCircleIcon />,
        title: "Add Blog",
      },
      {
        segment: "blog-list",
        icon: <SubjectIcon />,
        title: "Blog List",
      },
      {
        segment: "blog-category",
        icon: <AddCircleIcon />,
        title: "Add Blog Category",
      },
      {
        segment: "blog-category-list",
        icon: <SubjectIcon />,
        title: "Blog Category List",
      },
    ],
  },
  {
    segment: "enquiries",
    title: "Enquiries",
    icon: <LayersIcon />,
  },
];
const brand = {
  logo: (
    <img
      src="./images/logo.png"
      alt="logo"
      style={{
        paddingLeft: "10px",
      }}
    />
  ),
  title: "OS Store",
};

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  // colorSchemes: { light: true, dark: true },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#F9F9FE",
          paper: "#EEEEF9",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#2A4364",
          paper: "#112E4D",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100vw",
        backgroundColor: theme.palette.background.paper,
        padding: "1rem",
        textAlign: "center",
        zIndex: 9999,
        borderTop: "1px solid #828599",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} OS Store - Powered by: OS Store
      </Typography>
    </Box>
  );
};

const MainLayout = () => {
  const navigateReact = useNavigate();
  const [logOut, setLogOut] = useState(false);
  const adminInfo = localStorage.getItem("adminData");
  const [signout, isLoading] = useThunk(logoutAdmin);

  const [session, setSession] = useState({
    user: {
      name: "",
      email: "",
      image: "",
    },
  });

  useEffect(() => {
    if (!adminInfo) {
      showToast("Something goes wrong, please login again", "error");
      navigateReact("/login");
    } else {
      const parsedAdminData = JSON.parse(adminInfo);
      setSession({
        user: {
          name: parsedAdminData.name,
          email: parsedAdminData.email,
          image: "https://avatars.githubusercontent.com/u/19550456",
        },
      });
    }
  }, []);

  const router = {
    navigate: (path) => {
      navigateReact(path);
    },
    //Note: remove  pathname: "", browser will show a warning
    pathname: "",
  };

  const authentication = {
    signIn: () => {
      navigateReact("/login");
    },
    signOut: async () => {
      setSession(null);
      try {
        setLogOut(true);
        await signout();
        navigateReact("/login");
      } catch (err) {
        showToast("Sign Out Failed", "error");
      } finally {
        setLogOut(false);
      }
    },
  };

  if (logOut) {
    return <Loading />;
  } else {
    return (
      <AppProvider
        navigation={NAVIGATION}
        branding={brand}
        router={router}
        theme={demoTheme}
        authentication={authentication}
        session={session}
      >
        <DashboardLayout disableCollapsibleSidebar>
          <Outlet />
          <Footer />
        </DashboardLayout>
      </AppProvider>
    );
  }
};

export default MainLayout;
