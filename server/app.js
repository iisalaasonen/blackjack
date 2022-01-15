const config = require("./utils/config");
const express = require("express");
const middleware = require("./utils/middleware");
const playRouter = require("./controllers/play");

const app = express();
const logger = require("./utils/logger");

app.use(express.static("build"));
app.use(express.json());

app.use(middleware.requestLogger);

app.use(playRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
