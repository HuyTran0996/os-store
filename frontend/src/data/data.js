import DashboardIcon from "@mui/icons-material/Dashboard";

import StoreIcon from "@mui/icons-material/Store";
import BookIcon from "@mui/icons-material/Book";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import service from "../images/service/service.png";
import service2 from "../images/service/service-02.png";
import service3 from "../images/service/service-03.png";
import service4 from "../images/service/service-04.png";
import service5 from "../images/service/service-05.png";

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
    segment: "profile",
    title: "User",
    icon: <AccountCircleIcon />,
  },
];
////////menu list end//////////

//////home/////
export const services = [
  {
    image: service,
    title: "Free Shipping",
    tagline: "From all orders over $100",
  },
  {
    image: service2,
    title: "Daily Surprise Offer",
    tagline: "Save up to 25% off",
  },
  {
    image: service3,
    title: "Support 24/7",
    tagline: "Shop with an expert",
  },
  {
    image: service4,
    title: "Affordable Prices",
    tagline: "Get Factory direct price",
  },
  {
    image: service5,
    title: "Secure Payments",
    tagline: "100% protected payments",
  },
];
