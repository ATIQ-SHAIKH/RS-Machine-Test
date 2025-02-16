"use strict";

const { validationResult } = require("express-validator");
const logger = require("../logger")("/utils/validate");

const validate = (validationRules) => {
  return async (request, response, next) => {
    try {
      const error = {};
      await Promise.all(
        validationRules.map((validation) => validation.run(request))
      );
      const errors = validationResult(request);

      if (errors.isEmpty()) {
        return next();
      }

      error.errors = errors.array();
      logger.error(JSON.stringify(error));
      return response.status(400).json({ error });
    } catch (e) {
      logger.error(e);
      return response
        .status(400)
        .json({ message: "Invalid Input" });
    }
  };
};

module.exports = validate;
