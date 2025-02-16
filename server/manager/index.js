"use strict";

const models = require("../models");
const Manager = require("./manager");
const logger = require("../logger")("/manager/index.js");

class DBFactory {
  static getModel(modelName) {
    try {
      if (!modelName) throw new Error("Model Name is required");
      const model = models[`${modelName}`];
      if (!model) throw new Error("Model does not exists");
      return new Manager(model);
    } catch (e) {
      logger.error(e.message);
    }
  }
}

module.exports = DBFactory;
