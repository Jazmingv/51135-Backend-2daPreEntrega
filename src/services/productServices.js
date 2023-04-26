import { productModel } from "../models/productsModel.js";


export async function getProducts(limit, query, sort) {
    try {
        const RESPONSE = await productModel.find();
        return RESPONSE;
    } catch (error) {
        throw new Error(error);
    }
}