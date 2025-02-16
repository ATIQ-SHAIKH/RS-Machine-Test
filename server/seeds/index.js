"use strict";

const { CATEGORIES, ACTIVITIES, SUGGESTED_ACTIVITY_PLAN, SUGGESTED_DAY_PLANS } = require("./data.json")
require('dotenv').config();
const logger = require("../logger")("/seeds/index.js")
const DBFactory = require("../manager");
const { connect, connection } = require("mongoose");
const categoryManager = DBFactory.getModel("category");
const activityManager = DBFactory.getModel("activity");
const suggestedActivityPlanManager = DBFactory.getModel("suggestedActivityPlan");
const suggestedDayPlanManager = DBFactory.getModel("suggestedDayPlan");


const seedUsers = async () => {
    try {
        await connection.dropDatabase();  // Clear existing data

        // insert categories
        const insertedCategories = await categoryManager.insertMany(CATEGORIES);

        // insert activities
        const insertedActivities = await activityManager.insertMany(ACTIVITIES.map(obj => {
            const category = insertedCategories.find(category => category.name === obj.category);
            obj.category = category._id
            return obj;
        }));

        // insert suggestedActivityPlan
        SUGGESTED_ACTIVITY_PLAN.fromDate = new Date(SUGGESTED_ACTIVITY_PLAN.fromDate);
        SUGGESTED_ACTIVITY_PLAN.toDate = new Date(SUGGESTED_ACTIVITY_PLAN.toDate)
        for (const obj of SUGGESTED_ACTIVITY_PLAN.activities) {
            obj.activity = insertedActivities.find((activity) => activity.name === obj.activity)._id;
        }
        const { _id: SAP_id } = await suggestedActivityPlanManager.create(SUGGESTED_ACTIVITY_PLAN);
        SUGGESTED_ACTIVITY_PLAN._id = SAP_id;

        // insert suggested day plans
        await suggestedDayPlanManager.insertMany(SUGGESTED_DAY_PLANS.map((day) => {
            day.activityPlan = SUGGESTED_ACTIVITY_PLAN._id;
            for (const obj of day.activities) {
                obj.activity = insertedActivities.find((activity) => obj.name === activity.name)._id;
                const { frequency, time } = SUGGESTED_ACTIVITY_PLAN.activities.find((activity) => obj.activity === activity.activity);
                obj.frequency = frequency;
                obj.time = time;
                delete obj.name;
            }
            return day
        }))


        logger.info("Seeding complete!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

connect(process.env.DB_URL).then(async () => {
    // Run the seed function
    seedUsers();
}).catch(e => logger.info(e))