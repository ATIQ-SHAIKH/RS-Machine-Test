"use strict";

const { query } = require("express-validator");

const getSuggestedDayPlanPendingActivityCountRules = [
    query("day").isInt({ min: 1, max: 31 }).toInt().withMessage("Invalid day")
]

const getSuggestedDayPlanRules = [
    query("day").isInt({ min: 1, max: 31 }).toInt().withMessage("Invalid day")
];

const updateActivityStatusValidation = [
    query("activity_id").isMongoId().withMessage("Invalid _id"),
    query("status").isString().isIn(["pending", "completed"]).withMessage("Invalid status")
]

module.exports = {
    getSuggestedDayPlanPendingActivityCountRules,
    getSuggestedDayPlanRules,
    updateActivityStatusValidation
}