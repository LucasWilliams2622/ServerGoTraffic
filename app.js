let createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mysql = require("mysql2/promise");
var indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
const config = require("./config.json");
const session = require("express-session");
const { Sequelize, DataTypes } = require("sequelize");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");
const payOS = require("./utils/payos");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();
initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database, dialect } = config.database;
  const connection = await mysql.createConnection({ host, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: dialect,
  });

  // init models and add them to the exported db object

  await sequelize.sync({ alter: true });

  try {
    await sequelize.authenticate();
    console.log("===> Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GoTraffic API",
      version: "1.0.0",
      description: "This is Go Traffic API documentation.",
    },
    servers: [
      {
        // url: "http://103.57.129.166:3000",
        url: "http://localhost:3000",

      },
    ],
  },
  apis: ["./routes/api/*.js"],
};

const specs = swaggerJSDoc(options);

// API
let UserAPIRouter = require("./routes/api/UserAPI");
let CarBrandAPIRouter = require("./routes/api/CarBrandAPI");
let CarAPIRouter = require("./routes/api/CarAPI");
let BookingAPIRouter = require("./routes/api/BookingAPI");
let FavoriteCarAPIRouter = require("./routes/api/FavoriteCarAPI");
let ReviewAPIRouter = require("./routes/api/ReviewAPI");
let NotificationAPIRouter = require("./routes/api/NotificationAPI");
let NotificationBookingAPIRouter = require("./routes/api/NotificationBookingAPI");
let AddressAPIRouter = require("./routes/api/AddressAPI");
let PaymentAPIRouter = require("./routes/api/PaymentAPI");
let RevenueAPIRouter = require("./routes/api/RevenueAPI");
let RequestAPIRouter = require("./routes/api/RequestAPI");
let TransactionAPIRouter = require("./routes/api/TransactionAPI");

const db = require("./components/indexModel");
const { log } = require("console");

// CPANEL

var app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use(
  session({
    secret: "iloveyou",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
//body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", indexRouter);
// API
// http://localhost:3000/user/api
app.use("/user/api", UserAPIRouter);

// http://localhost:3000/car-brand/api
app.use("/car-brand/api", CarBrandAPIRouter);

// http://localhost:3000/car/api
app.use("/car/api", CarAPIRouter);

// http://localhost:3000/car/api
app.use("/booking/api", BookingAPIRouter);

// http://localhost:3000/favorite-car/api
app.use("/favorite-car/api", FavoriteCarAPIRouter);

// http://localhost:3000/review/api
app.use("/review/api", ReviewAPIRouter);

// http://localhost:3000/notification/api
app.use("/notification/api", NotificationAPIRouter);

// http://localhost:3000/notification-booking/api
app.use("/notification-booking/api", NotificationBookingAPIRouter);

// http://localhost:3000/address/api
app.use("/address/api", AddressAPIRouter);

// http://localhost:3000/payment/api
app.use("/payment/api", PaymentAPIRouter);

// http://localhost:3000/revenue/api
app.use("/revenue/api", RevenueAPIRouter);

// http://localhost:3000/request/api
app.use("/request/api", RequestAPIRouter);

// http://localhost:3000/request/api
app.use("/transaction/api", TransactionAPIRouter);

app.post("/create-payment-link", async (req, res) => {
  const YOUR_DOMAIN = "http://103.57.129.166:3000";
  const amount = parseInt(req.body.amount) || 1000;
  const idUser = req.query.idUser;

  console.log(typeof amount);
  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: amount,
    description: "Nap tien vao Go Traffic",
    returnUrl: `${YOUR_DOMAIN}/success.html`,
    cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
  };

  try {
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    res.redirect(paymentLinkResponse.checkoutUrl);
  } catch (error) {
    console.error(error);
    res.send("Something went error");
  }
});

app.post("/create", (req, res) => {
  const amount = req.body.amount;
  console.log("Số lượng:", amount);

  res.send("Dữ liệu đã được nhận thành công!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing er~ror in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
