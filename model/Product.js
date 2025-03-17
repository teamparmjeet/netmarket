import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(

    {
        productname: { type: String, required: true },
        group: { type: String, required: true },
        price: { type: String, required: true },
        defaultdata: { type: String, required: true, default: "product" }

    },
    { timestamps: true }
);

const ProductModel =
    mongoose.models.Producttest || mongoose.model("Producttest", ProductSchema);

export default ProductModel