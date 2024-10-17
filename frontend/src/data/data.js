import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StoreIcon from "@mui/icons-material/Store";
import BookIcon from "@mui/icons-material/Book";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import PersonIcon from "@mui/icons-material/Person";

//////MENU LIST//////////////
export const NAVIGATION = [
  {
    segment: "",
    title: "Home",
    icon: <DashboardIcon />,
  },
  {
    segment: "product",
    title: "Our Store",
    icon: <StoreIcon />,
  },
  {
    segment: "blogs",
    title: "Blogs",
    icon: <BookIcon />,
  },
  {
    segment: "contact",
    title: "Contact",
    icon: <ConnectWithoutContactIcon />,
  },
  {
    segment: "customers",
    title: "User",
    icon: <PersonIcon />,
    children: [
      {
        segment: "orders",
        title: "Orders",
        icon: <AssignmentIcon />,
      },
    ],
  },
];
