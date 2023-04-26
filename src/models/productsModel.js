import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const PRODUCTSCHEMA = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
            minlength: [10, "Write a longer products title"]
        },
        description: {
            type: String,
            require: true,
            maxlength: [100, "Write a shorter description"]
        },
        price: {
            type: Number,
            require: true
        },
        stock: {
            type: Number,
            require: true
        },
        code: {
            type: String,
            require: true,
            unique: true
        },
        status: {
            default: true
        }
    }
);

//middleware Paginate
PRODUCTSCHEMA.plugin(mongoosePaginate);

export default productsModel = mongoose.model("Products", PRODUCTSCHEMA);