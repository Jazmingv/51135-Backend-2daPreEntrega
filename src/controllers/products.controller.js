import Products from "../models/products.model.js";
import { createCart } from "./carts.controller.js";

let currentCart;

//GETALL
export const getAllProducts = async (req, res) => {
    try {
        const { limit, page, sort, _id, title, category } = req.query;

        const filter = {};
        _id && (filter._id = _id);
        title && (filter.title = title);
        category && (filter.category = category);

        if (sort === "asc") { sort = 1 }
        else if (sort === "desc") { sort = -1 }
        else if (sort !== "asc" || sort !== "desc") { sort = 0 };

        if (!currentCart) {
            let newCart = await createCart;
            currentCart = newCart._id;
        }

        const options = {
            limit: parseInt(limit) || 10,
            page: parseInt(page) || 1,
            sort: sort
        };

        if (cat != "swimwear" || cat != "pajamas" || cat != "sets" || cat != "dresses") { cat = null };

        let result = await Products.paginate(filter , { options, lean: true });
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);
        result.status = "success";
        result.cart = currentCart;
        console.log(result);
        res.status(200).render('indexProducts', result);
    } catch (error) {
        res.status(500).json(error);
    }
};

//GETBYID
export const getProductByID = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
};

//CREATE
export const createProduct = async (req, res) => {

    const newProduct = new Products(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};

//UPDATE
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};
export const deleteProduct = async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json("Succesfully deleted product");
    } catch (error) {
        res.status(500).json(error);
    }
};