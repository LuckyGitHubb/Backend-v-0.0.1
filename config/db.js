const mongoose = require('mongoose')

const connectionDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectionDB;