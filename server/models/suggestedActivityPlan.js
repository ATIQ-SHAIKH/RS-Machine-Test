"use strict";

const { Schema, model } = require("mongoose");

const suggestedActivityPlan = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "user", required: false }, // must be true when user collection is added
        // active: { type: Boolean, required: true }, 
        fromDate: { type: Date, required: true },
        toDate: { type: Date, required: true },
        activities: [{
            activity: { type: Schema.Types.ObjectId, ref: "activity", required: true },
            frequency: { type: String, required: true },
            time: { type: String }
        }],
    },
    { timestamps: true },
);


module.exports = model("suggestedActivityPlan", suggestedActivityPlan);
