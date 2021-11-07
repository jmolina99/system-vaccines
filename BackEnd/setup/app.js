const express = require("express"),
  passport = require("passport"),
  cors = require("cors");

require("../config/database");

let app = express();

/**
 * Import Routes
 */
let userRoutes = require("../routes/user.routes"),
  employeeRoutes = require("../routes/employee.routes"),
  relationUserEmployeeRoutes = require("../routes/relation-user-employee.routes");

let session = require("express-session"),
  sess = {
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: "sessionID",
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.TIME),
    },
  };

let corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(cors(corsOptions));

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

/**
 * Export Routes
 */
app.use("/api", userRoutes);
app.use("/api", employeeRoutes);
app.use("/api", relationUserEmployeeRoutes);

module.exports = app;
