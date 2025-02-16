"use strict";

const { Schema, model } = require("mongoose");

const activity = new Schema(
    {
        name: { type: String, required: true }, // "Stimulus Explosion",
        category: { type: Schema.Types.ObjectId, ref: "category", required: true }
    },
    { timestamps: true },
);


module.exports = model("activity", activity);
