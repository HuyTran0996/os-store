import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
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

const NestedList = ({ item, depth = 1.5 }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    if (!item.children) {
      navigate(`/${item.segment}`);
    } else {
      setOpen(!open);
    }
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: depth * 2 }}>
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.title} />
        {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((childItem) => (
              <NestedList
                key={childItem.segment}
                item={childItem}
                depth={depth + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default function MenuList() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280 }} role="presentation">
          <List>
            {NAVIGATION.map((item) => (
              <NestedList key={item.segment} item={item} />
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
