import Products from "../models/products.model.js";

//GETALL
const getAllProducts = async (req, res) => {
    try {
        let limit = parseInt(req.query.limit) || 10;
        let page = parseInt(req.query.page) || 1;
        let cat = req.query.cat;
        let sort = req.query.sort;

        if (sort === "asc") { sort = 1 }
        else if (sort === "desc") { sort = -1 }
        else if (sort !== "asc" || sort !== "desc") { sort = 0 };

        if (cat != "swimwear" || cat != "pajamas" || cat != "sets" || cat != "dresses") { cat = null };

        let result = await Products.paginate({},
            {
                page,
                limit,
                sort: {
                    price: sort
                },
                lean: true
            });
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);
        result.status = "success";
        console.log(result);
        res.status(200).render('indexProducts', result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export default getAllProducts;