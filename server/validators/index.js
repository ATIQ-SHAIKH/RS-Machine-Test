"use strict";
const validate = require("../utils/validate");
const validators = require("./validators");
const validationRules = {};

Object.keys(validators).forEach((key) => {
    const keyName = key.replace("Rules", "Validation");
    validationRules[keyName] = validate(validators[key]);
});

module.exports = validationRules;
