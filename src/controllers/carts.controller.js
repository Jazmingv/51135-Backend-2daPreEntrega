import Carts from "../models/carts.model.js";
import Products from "../models/products.model.js";

let currentCart;

//CREATE CART
//if (!currentCart) { cartController.createCart }
export const createCart = async (req, res) => {
    const newCart = new Carts();
    try {
        currentCart = await newCart.save();
        res.status(200).json(currentCart);
    } catch (error) {
        res.status(500).json(error);
    }
};

//DELETE ALL PRODUCTS
export const deleteAllProducts = async (req, res) => {
    try {
        let cartID = req.params.cid;
        
        let cart = await Carts.findOne({ _id: cartID });
        console.log(JSON.stringify(cart, null, '\t'));

        cart.products.pull();
        console.log(JSON.stringify(cart, null, '\t'));

        let result = await Carts.updateOne({ _id: cartID }, cart);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

//DELETE PRODUCT BY ID
export const deleteProduct = async (req, res) => {
    try {
        let cartID = req.params.cid;
        let productID = req.params.pid;

        let cart = await Carts.findOne({ _id: cartID });
        console.log(JSON.stringify(cart, null, '\t'));

        cart.products.updateOne({ $pullAll: { _id: productID } });
        console.log(JSON.stringify(cart, null, '\t'));

        let result = await Carts.updateOne({ _id: cartID }, cart);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

//GET PRODUCTS
export const getProducts = async (req, res) => {
    try {
        let cartID = req.params.cid;

        let cart = await Carts.findOne({ _id: cartID });
        console.log(JSON.stringify(cart, null, '\t'));

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
};

//UPDATE PRODUCT BY ID
export const increaseQuantityProduct = async (req, res) => {
    try {
        let cartID = req.params.cid;
        let productID = req.params.pid;

        console.log(cartID);
        console.log(productID);

        let cart = await Carts.findOne({ "_id": cartID });
        console.log(JSON.stringify(cart, null, '\t'));

        let product = cart.products.find({ _id: productID });

        if (!product) {
            cart.products.push({ quantity: 1, product: productID });
        } else {
            product.quantity += 1;
        }

        let result = await Carts.updateOne({ _id: cartID }, cart);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};