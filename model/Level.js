import mongoose, { Schema } from "mongoose";

const LevelsSchema = new Schema(
    {
        level_name: { type: String, required: true },
        sao: { type: String, required: true },
        sgo: { type: String, required: true },
        binary_income: { type: String, required: true },
        bonus_income: { type: String, required: true },
        performance_income: { type: String, },
        bonus: { type: String, },
        achieversdsid: { type: [String], default: [] },
        defaultdata: { type: String, required: true, default: "Level" }
    },
    { timestamps: true }
);

const LevelsModel =
    mongoose.models.Levelstest4 || mongoose.model("Levelstest4", LevelsSchema);

export default LevelsModel;
