import * as productServices from "../services/productServices.js";

export async function getProducts(req, res) {
    try {
        const LIMIT = req.params.limit || 10;
        const QUERY = req.params.query || undefined;
        const SORT = req.params.sort || undefined;
        const RESPONSE = await productServices.getProducts(LIMIT, QUERY, SORT);
        res.status(200).json(RESPONSE);
    } catch (error) {
        res.status(400).json(error.message);
    }
};