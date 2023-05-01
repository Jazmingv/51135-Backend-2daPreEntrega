import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
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

cartsSchema.plugin(mongoosePaginate);
cartsSchema.pre('findOne', function () {
    this.populate("products.product");
});

const cartsModel = mongoose.model("Carts", cartsSchema);
export default cartsModel;