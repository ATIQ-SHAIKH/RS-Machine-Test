// GET /programs/{day} → Fetch activities for a given day (Day 14-21).
// POST /activities/{activity_id}/complete → Mark an activity as complete.
// GET /progress/{user_id} → Fetch progress of a user.

"use strict";

const express = require("express");
const router = express.Router();
const USER_ROUTES = require("../constants/routes");
const { getSuggestedDayPlanPendingActivityCount, getSuggestedDayPlan, updateActivityStatus } = require("../controllers");
const { getSuggestedDayPlanValidation, getSuggestedDayPlanPendingActivityCountValidation, updateActivityStatusValidation } = require("../validators")

router.get(USER_ROUTES.GET_SUGGESTED_DAY_PLAN_PENDING_COUNT, getSuggestedDayPlanPendingActivityCountValidation, getSuggestedDayPlanPendingActivityCount);
router.get(USER_ROUTES.GET_SUGGESTED_DAY_PLAN, getSuggestedDayPlanValidation, getSuggestedDayPlan);
router.put(USER_ROUTES.UPDATE_ACTIVITY_STATUS, updateActivityStatusValidation, updateActivityStatus);

module.exports = router;
