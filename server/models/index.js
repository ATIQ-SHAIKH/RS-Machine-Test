"use strict";

const { readdirSync } = require("fs");
const { connect, connection } = require("mongoose");
const logger = require("../logger")("/models/index.js")

const DB_INFO = {
    MONGO_CONNECTING: "Mongo connecting",
    MONGO_CONNECTED: "Mongo connected",
    MONGO_DISCONNECTING: "Mongo disconnecting",
    MONGO_DISCONNECTED: "Mongo disconnected",
}

const CONNECTION_STATUS = {
    CONNECTING: "connecting",
    CONNECTED: "connected",
    DISCONNECTING: "disconnecting",
    DISCONNECTED: "disconnected"
}

const modelObj = {};

readdirSync("./server/models").forEach((file) => {
  if (!file.includes("index")) {
    const fileName = file.replace(".js", "");
    modelObj[fileName] = require(`./${fileName}`);
  }
});

connection.on(CONNECTION_STATUS.CONNECTING, () => {
    logger.info(DB_INFO.MONGO_CONNECTING);
});
connection.on(CONNECTION_STATUS.CONNECTED, () => {
    logger.info(DB_INFO.MONGO_CONNECTED);
});
connection.on(CONNECTION_STATUS.DISCONNECTING, () => {
    logger.info(DB_INFO.MONGO_DISCONNECTING);
});
connection.on(CONNECTION_STATUS.DISCONNECTED, () => {
    logger.info(DB_INFO.MONGO_DISCONNECTED);
});

connect(process.env.DB_URL);

module.exports = modelObj;