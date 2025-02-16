"use strict";

const ResponseWrapper = require("../utils/responseWrapper");
const DBFactory = require("../manager");
const suggestedDayPlanManager = DBFactory.getModel("suggestedDayPlan");
const logger = require("../logger")("/controller/index.js");

/**
 * To get plan for the day
 * @param {Request} req 
 * @param {Response} res 
 * @returns Response
 */
const getSuggestedDayPlan = async (req, res) => {
    logger.info(JSON.stringify(req.query));
    try {
        const { day } = req.query;
        const plan = await suggestedDayPlanManager.findOne({ day }, { activityPlan: 0 }, { path: "activities.activity", select: "-_id name" });
        if (!plan) {
            return ResponseWrapper.error(res, "Data not found", 404);
        }
        return ResponseWrapper.success(res, "OK", plan)
    } catch (e) {
        logger.error(e);
        next(e);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const updateActivityStatus = async (req, res, next) => {
    logger.info(JSON.stringify(req.query));
    try {
        const { activity_id, status } = req.query;
        const doc = await suggestedDayPlanManager.findOneAndUpdate({ "activities._id": activity_id }, { $set: { "activities.$.status": status } }, { path: "activities.activity", select: "-_id name" }, {
            new: true,
            projection: { activityPlan: 0 }
        });
        if (!doc) {
            return ResponseWrapper.error(res, "Data not found", 404)
        }
        return ResponseWrapper.success(res, "OK", doc)
    } catch (e) {
        logger.error(e);
        next(e);
    }
}

/**
 * To get total number of pending activities
 * @param {Request} req 
 * @param {Response} res 
 * @returns Response
 */
const getSuggestedDayPlanPendingActivityCount = async (req, res) => {
    logger.info(JSON.stringify(req.query));
    try {
        const { day } = req.query;
        const [result] = await suggestedDayPlanManager.aggregate([
            { $match: { day: day } }, // Filter for day 21
            { $unwind: "$activities" }, // Deconstruct the activities array
            { $match: { "activities.status": "pending" } }, // Filter for pending activities
            { $count: "totalPendingTasks" } // Count the pending tasks
        ]);

        if (!result) {
            return ResponseWrapper.error(res, "Data not found", 404);
        }

        return ResponseWrapper.success(res, "OK", result)
    } catch (e) {
        logger.error(e);
        next(e);
    }
}

module.exports = {
    getSuggestedDayPlan,
    updateActivityStatus,
    getSuggestedDayPlanPendingActivityCount
}