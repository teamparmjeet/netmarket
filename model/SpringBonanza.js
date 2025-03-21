import mongoose, { Schema } from "mongoose";

const BonanzaSchema = new Schema(

    {
        image: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true,default:"null" },
        defaultdata: { type: String, required: true, default: "Bonanza" }

    },
    { timestamps: true }
);

const BonanzaModel =
    mongoose.models.Bonanzatest2 || mongoose.model("Bonanzatest2", BonanzaSchema);

export default BonanzaModel