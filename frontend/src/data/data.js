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
////////menu list end//////////

//////home/////
export const services = [
  {
    image: "/images/service.png",
    title: "Free Shipping",
    tagline: "From all orders over $100",
  },
  {
    image: "/images/service-02.png",
    title: "Daily Surprise Offer",
    tagline: "Save up to 25% off",
  },
  {
    image: "/images/service-03.png",
    title: "Support 24/7",
    tagline: "Shop with an expert",
  },
  {
    image: "/images/service-04.png",
    title: "Affordable Prices",
    tagline: "Get Factory direct price",
  },
  {
    image: "/images/service-05.png",
    title: "Secure Payments",
    tagline: "100% protected payments",
  },
];
