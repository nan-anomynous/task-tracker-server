const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://nandinichaturvedi283_db_user:4igWxpjK61Wsi5DQ@cluster0.bl8mi26.mongodb.net/?appName=Cluster0");

        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error.message);

        process.exit(1);
    }
};

module.exports = connectDB;