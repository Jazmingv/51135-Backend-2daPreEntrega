import express from "express";
import mongoose from 'mongoose';
import CartsRoute from "./routes/carts.router.js";
import ProductsRoute from "./routes/products.router.js";

const APP = express();
const PORT = 8080;

//middlewares
APP.use(express.json());
APP.use(express.urlencoded({ extends: true }));

//routers
APP.use("/api/products", ProductsRoute);
APP.use("/api/carts", CartsRoute);

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/CODER-project');
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
}

connectMongoDB();
APP.listen(PORT, () => console.log("Server on"));