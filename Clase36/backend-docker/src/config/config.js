import dotenv from "dotenv";
dotenv.config();

export const config = {
    mongo:{
        URL: process.env.MONGO_URL || 'http://localhost:27017'
    }
}