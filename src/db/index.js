// src/db/index.js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("MongoDB URI:", process.env.MONGODB_URI); // Add this line
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`\nMongoDB connected!! DB Host: ${connectionInstance.connection.host}`);
        // Additional setup or logging if needed
    } catch (error) {
        console.error("MONGODB connection failed! ", error);
        // Gracefully exit the application on connection failure
        process.exit(1);
    }
};

export default connectDB;
