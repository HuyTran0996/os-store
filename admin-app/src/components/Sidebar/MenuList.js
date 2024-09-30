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

import { NAVIGATION } from "../../data/data";

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
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280 }}>
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
