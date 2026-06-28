const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Task Tracker API Running"
    });
});

app.use("/api/tasks", taskRoutes);
app.use(errorHandler);
module.exports = app;