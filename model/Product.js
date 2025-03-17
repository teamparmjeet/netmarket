import mongoose, { Schema } from "mongoose";

const BonanzaSchema = new Schema(

    {
        product:{type: String, required: true},
        defaultdata: { type: String, required: true, default: "Bonanza" }

    },
    { timestamps: true }
);

const BonanzaModel =
    mongoose.models.Bonanzatest || mongoose.model("Bonanzatest", BonanzaSchema);

export default BonanzaModel