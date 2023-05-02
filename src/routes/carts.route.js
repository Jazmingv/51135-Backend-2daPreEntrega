import express from "express";
import * as cartController from "../controllers/carts.controller.js";

const CartRouter = express.Router();

//CREATE CART
CartRouter.post("/", cartController.createCart);

//DELETE ALL PRODUCTS
CartRouter.delete("/:cid/", cartController.deleteAllProducts);

//DELETE PRODUCT
CartRouter.delete("/:cid/products/:pid", cartController.deleteProduct);

//GET PRODUCTS
CartRouter.get("/:cid", cartController.getProducts);

//UPDATE PRODUCT
CartRouter.put("/:cid/products/:pid", cartController.increaseQuantityProduct);

export default CartRouter;