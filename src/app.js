const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");

const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://task-tracker-client-l1fc.vercel.app/"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

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