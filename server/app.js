const express = require("express");
const cookieParser = require("cookie-parser")
const connectWithDatabase = require("./config/db")

const dotenv = require("dotenv").config();
const app = express();

// connect with DB
connectWithDatabase();

// swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const user = require("./routes/user");
const project = require("./routes/project");

app.use("/api/v1", user);
app.use("/api/v1", project);

module.exports = app