import Products from "../models/products.model.js";
import { createCart } from "./carts.controller.js";

let currentCart;

//GETALL
const getAllProducts = async (req, res) => {
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

export default getAllProducts;