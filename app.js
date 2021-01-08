require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const verifyToken = require("./middlewares/verifyToken");
const can = require("./middlewares/permission");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const coursesRouter = require("./routes/courses");
const chaptersRouter = require("./routes/chapters");
const lesssonsRouter = require("./routes/lessons");
const mediaRouter = require("./routes/media");
const orderPaymentsRouter = require("./routes/orderPayments");
const mentorsRouter = require("./routes/mentors");
const imageCoursesRouter = require("./routes/imageCourses");
const myCoursesRouter = require("./routes/myCourses");
const reviewsRouter = require("./routes/reviews");

const webhookRouter = require("./routes/webhook");

const refreshTokensRouter = require("./routes/refreshToken");

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/courses", coursesRouter);
app.use("/chapters", verifyToken, can("admin"), chaptersRouter);
app.use("/lessons", verifyToken, can("admin"), lesssonsRouter);
app.use("/media", verifyToken, can("admin", "student"), mediaRouter);
app.use("/orders", verifyToken, can("admin", "student"), orderPaymentsRouter);
app.use("/mentors", verifyToken, can("admin"), mentorsRouter);
app.use("/image-courses", verifyToken, can("admin"), imageCoursesRouter);
app.use("/my-courses", verifyToken, can("admin", "student"), myCoursesRouter);
app.use("/reviews", verifyToken, can("admin", "student"), reviewsRouter);
app.use("/webhook", webhookRouter);
app.use("/refresh-tokens", refreshTokensRouter);

module.exports = app;
