import mongoose, { Schema } from "mongoose";

const AchiversSchema = new Schema(

    {
        name: { type: String },
        dsid: { type: String },
        image: { type: String },
        address: { type: String },
        achivementtype1: { type: String },
        defaultdata: { type: String, required: true, default: "Achivers" }

    },
    { timestamps: true }
);

const AchiversModel =
    mongoose.models.Achiverstest1 || mongoose.model("Achiverstest1", AchiversSchema);

export default AchiversModel