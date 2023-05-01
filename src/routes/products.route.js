import express from "express";
import getAllProducts from "../controllers/products.controller.js";

const ProductRouter = express.Router();

//GETALL
ProductRouter.get("/", getAllProducts);

export default ProductRouter;