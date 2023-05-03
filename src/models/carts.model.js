import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products"
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
});

//cartsSchema.pre('find', function () {
//    this.populate("products.product");
//});

const cartsModel = mongoose.model("Carts", cartsSchema);
export default cartsModel;