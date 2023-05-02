import Products from "../models/products.model.js";

//GETALL
export const getAllProducts = async (req, res) => {
    try {
        let { limit, page, sort, _id, title, category } = req.query;

        let filter = {};
        _id && (filter._id = _id);
        title && (filter.title = title);
        category && (filter.category = category);

        if (sort === "asc") { sort = 1 }
        else if (sort === "desc") { sort = -1 }
        else if (sort !== "asc" || sort !== "desc") { sort = 0 };
        let options = {
            limit: parseInt(limit) || 10,
            page: parseInt(page) || 1,
            sort: sort
        };

        if (category != "swimwear" && category != "pajamas" && category != "sets" && category != "dresses") {
            category = null;
        }

        let result = await Products.paginate(filter, { options, lean: true });

        result.prevLink = result.hasPrevPage ? `/api/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `/api/products?page=${result.nextPage}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);
        result.status = "success";

        console.log(result.isValid);

        res.render('./indexProducts', { products: result.docs });
    } catch (error) {
        console.log(error);
        res.status(500).send("Couldn't render products view");
    }
};

//GETBYID
export const getProductByID = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).send("Couldn't get product with ID");
    }
};

//CREATE
export const createProduct = async (req, res) => {

    const newProduct = new Products(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send("Couldn't create product, please try again");
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
        console.log(error);
        res.status(500).send("Couldn't update product, please try again");
    }
};
export const deleteProduct = async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json("Succesfully deleted product");
    } catch (error) {
        console.log(error);
        res.status(500).send("Couldn't delete product, please try again");
    }
};