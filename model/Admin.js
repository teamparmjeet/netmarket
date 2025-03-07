import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema(

    {
        name: { type: String, required: true },
        mobile: { type: Number, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        usertype: { type: String, enum: ["0", "1", "2"], default: "0", required: true },
        defaultdata: { type: String, required: true, default: "admin" }
        
    },
    { timestamps: true }
);

const AdminModel =
    mongoose.models.admintest || mongoose.model("admintest", AdminSchema);

export default AdminModel