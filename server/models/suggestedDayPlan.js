"use strict";

const { Schema, model } = require("mongoose");

const suggestedDayPlan = new Schema(
    {
        day: { type: Number, required: true },
        activityPlan: { type: Schema.Types.ObjectId, ref: "activityPlan", required: true },
        activities: [
            {
                activity: { type: Schema.Types.ObjectId, ref: "activity", required: true },
                frequency: { type: String, required: true }, // won't change often, storing directly
                time: { type: String }, // won't change often, storing directly
                status: { type: String, required: true, enum: ["pending", "completed"] }
            }
        ],
    },
    { timestamps: true },
);

suggestedDayPlan.index({ day: 1 });

module.exports = model("suggestedDayPlan", suggestedDayPlan);
