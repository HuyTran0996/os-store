const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { urlNotFound, errorHandler } = require("./middlewares/errorHandler");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/prodcategoryRoute");
const blogcategoryRouter = require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");
const orderRouter = require("./routes/orderRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
// const uploadRouter = require('./routes/uploadRoute');

dbConnect();
app.use(morgan("dev"));

const allowedOrigins = ["http://localhost:3000"];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/order", orderRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);

// app.use('/api/upload', uploadRouter);

app.use(urlNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
  if (process.env.NODE_ENV !== "production")
    console.log("you are in environment:", process.env.NODE_ENV);
});
