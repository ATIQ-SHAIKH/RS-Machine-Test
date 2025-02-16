const cors = require("cors");
const express = require("express");
const http = require("http");
const obscureHeader = require("./server/middlewares/obscureHeader");
require('dotenv').config();
const ResponseWrapper = require("./server/utils/responseWrapper");

const logger = require("./server/logger")("index.js")
const apiRoutes = require("./server/routes")

// Start & init express app
const app = express();

// Security: Avoids revealing technology used
app.disable("x-powered-by");
app.use(obscureHeader);

// Security: To Prevent large payload attacks
app.use(
    express.json({
        limit: "2mb",
    }),
);

app.use(
    cors({
        origin: '*', // This must be replaced, incase front-end is a browser
        methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
        credentials: true,
    }),
);

app.get("/test", (req, res) => {
    logger(req.ip); // Logs client's IP address
    res.send(`Client IP: ${req.ip}`);
});

// Load APIs
app.use("/api", apiRoutes);

// Universal error handler
app.use((err, req, res, next) => {
    return ResponseWrapper.error(res, err.message || "Internal Server Error", err.statusCode || 500);
});


// load all models
require("./server/models");

const server = http.createServer(app);

server.listen(process.env.SRV_PORT, () => {
    logger.info(`🚀 Server running on port ${process.env.SRV_PORT}`);
});


// Handle process termination signals
const gracefulShutdown = () => {
    logger.info("Shutting down gracefully...");

    server.close((err) => {
        if (err) {
            console.error("Error closing server:", err);
            process.exit(1);
        }

        logger.info("Server closed successfully.");
        process.exit(0);
    });
};

// Handle termination signals
process.on("SIGINT", gracefulShutdown); // Ctrl+C in terminal
process.on("SIGTERM", gracefulShutdown); // Docker, Kubernetes, cloud shutdown



