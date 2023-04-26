import mongoose from "mongoose";

const CARTSCHEMA = new mongoose.Schema(
    {
        products: {
            default: []
        }
    },
    {timestamps: true}
);

//middlewares
CARTSCHEMA.pre('findOne', function () {
    this.populate("Products.product");
});

export const cartsModel = mongoose.model("Carts", CARTSCHEMA);