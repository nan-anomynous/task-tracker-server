const mongoose = require("mongoose");
const Task = require("../models/task.model");
const ApiResponse = require("../utils/api-response");
const ApiError = require("../utils/api-error");
const asyncHandler = require("../utils/async-handler");

// Create Task
const createTask = asyncHandler(async (req, res) => {

    const task = await Task.create(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            "Task created successfully",
            task
        )
    );

});

// Get All Tasks
const getAllTasks = asyncHandler(async (req, res) => {

    const {
        status,
        priority,
        search,
        sort = "newest"
    } = req.query;

    const filter = {};

    if (status) {
        filter.status = status;
    }

    if (priority) {
        filter.priority = priority;
    }

    if (search) {
        filter.title = {
            $regex: search,
            $options: "i"
        };
    }

    let sortOption = { createdAt: -1 };

    switch (sort) {

        case "oldest":
            sortOption = { createdAt: 1 };
            break;

        case "title":
            sortOption = { title: 1 };
            break;

        default:
            sortOption = { createdAt: -1 };

    }

    const tasks = await Task.find(filter).sort(sortOption);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Tasks fetched successfully",
            tasks
        )
    );

});

// Get Single Task
const getTaskById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Task ID");
    }

    const task = await Task.findById(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            "Task fetched successfully",
            task
        )
    );

});

// Update Task
const updateTask = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Task ID");
    }

    const task = await Task.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            "Task updated successfully",
            task
        )
    );

});

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Task ID");
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            "Task deleted successfully",
            null
        )
    );

});

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
};