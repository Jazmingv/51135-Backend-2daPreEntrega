import express from "express";

import * as ProductsController from "../controllers/productsController.js";

const ROUTER = express.Router();

ROUTER.get("/", ProductsController.getProducts);

export default ROUTER;