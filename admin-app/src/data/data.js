import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

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

////////////Dash board///////////
export const monthMap = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  June: 6,
  July: 7,
  Aug: 8,
  Sept: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};
export const datasetOrder = [
  {
    orders: 0,
    month: "Jan",
  },
  {
    orders: 0,
    month: "Feb",
  },
  {
    orders: 0,
    month: "Mar",
  },
  {
    orders: 0,
    month: "Apr",
  },
  {
    orders: 0,
    month: "May",
  },
  {
    orders: 0,
    month: "June",
  },
  {
    orders: 0,
    month: "July",
  },
  {
    orders: 0,
    month: "Aug",
  },
  {
    orders: 0,
    month: "Sept",
  },
  {
    orders: 0,
    month: "Oct",
  },
  {
    orders: 0,
    month: "Nov",
  },
  {
    orders: 0,
    month: "Dec",
  },
];
export const datasetIncome = [
  {
    orders: 0,
    month: "Jan",
  },
  {
    orders: 0,
    month: "Feb",
  },
  {
    orders: 0,
    month: "Mar",
  },
  {
    orders: 0,
    month: "Apr",
  },
  {
    orders: 0,
    month: "May",
  },
  {
    orders: 0,
    month: "June",
  },
  {
    orders: 0,
    month: "July",
  },
  {
    orders: 0,
    month: "Aug",
  },
  {
    orders: 0,
    month: "Sept",
  },
  {
    orders: 0,
    month: "Oct",
  },
  {
    orders: 0,
    month: "Nov",
  },
  {
    orders: 0,
    month: "Dec",
  },
];
////////////END///////////

//////MENU LIST//////////////
export const NAVIGATION = [
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "customers",
    title: "Customers",
    icon: <PersonIcon />,
  },
  {
    segment: "product",
    title: "Catalog",
    icon: <CategoryIcon />,
    children: [
      {
        segment: "addProduct",
        icon: <AddShoppingCartIcon />,
        title: "Add Product",
      },
      {
        segment: "productList",
        icon: <ShoppingCartIcon />,
        title: "Product List",
      },

      {
        segment: "brand",
        icon: <FactoryIcon />,
        title: "Brand",
      },
      {
        segment: "brandList",
        icon: <FactoryIcon />,
        title: "Brand List ",
      },

      {
        segment: "category",
        icon: <WidgetsIcon />,
        title: "Category",
      },
      {
        segment: "productCategoryList",
        icon: <WidgetsIcon />,
        title: " Product Category List",
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
/////END/////

////Header//////////
export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));
//////END///////////

//////Add Product///////
export const internationalSizes = [
  { type: "Clothing", sizes: ["XS", "S", "M", "L", "XL", "XXL"] },
  {
    type: "Shoes",
    sizes: [
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
    ],
  },
  // {
  //   type: "Children's Clothing",
  //   sizes: [
  //     "0-3 months",
  //     "3-6 months",
  //     "6-9 months",
  //     "9-12 months",
  //     "1T",
  //     "2T",
  //     "3T",
  //     "4T",
  //     "5T",
  //     "6T",
  //     "7T",
  //     "8T",
  //     "9T",
  //     "10T",
  //     "11T",
  //     "12T",
  //     "13T",
  //     "14T",
  //     "15T",
  //     "16T",
  //   ],
  // },
  // {
  //   type: "Children's Shoes",
  //   sizes: [
  //     "Infant 0-12 months",
  //     "Toddler 1-2 years",
  //     "Child 2-4 years",
  //     "Child 4-6 years",
  //     "Child 6-8 years",
  //   ],
  // },
];
////////END/////
