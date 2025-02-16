"use strict";

const { Schema, model } = require("mongoose");

const category = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true },
);


module.exports = model("category", category);
