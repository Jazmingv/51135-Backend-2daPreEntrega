import express from "express";
import mongoose from "mongoose";
import handlebars from 'express-handlebars';

import __dirname from './utils.js';
import CartsRoute from "./routes/carts.route.js";
import ProductsRoute from "./routes/products.route.js";

const APP = express();
const PORT = 8080;

//handlebars
APP.engine('handlebars', handlebars.engine());
APP.set('views', __dirname + '/views')
APP.set('view engine', 'handlebars');

//MONGO_URL this way because I couldn't set it the way Alejandro set it up...
const MONGO_URL = "mongodb+srv://jazmingv:KJ8to7UL9ZcWUqf6@cluster0.fuizku2.mongodb.net/CODER-project?retryWrites=true&w=majority";

//middlewares
APP.use(express.json());
APP.use(express.urlencoded({ extends: true }));

//routers
APP.use("/api/products", ProductsRoute);
APP.use("/api/carts", CartsRoute);

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Successfully connected to Mongo Database");
    } catch (error) {
        console.error("Couldn't connect to Mongo Database: " + error);
        process.exit();
    }
}

APP.listen(PORT, () => {
    connectMongoDB();
    console.log("Server on");
});