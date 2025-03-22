import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(

    {
        dscode: { type: String, required: true, default: "0" },
        pdscode: { type: String, required: true, default: "0" },
        earnsp:{ type: String, required: true, default: "0"},
        group:{ type: String, enum: ["sao", "sgo"], },
        name: { type: String, required: true, },
        image: { type: String },
        relationTitle: { type: String, enum: ["S/o", "D/o", "W/o"], },
        fatherOrHusbandName: { type: String, },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true, },
        dob: { type: Date, },
        profession: { type: String, enum: ["SALARIED", "SELF-EMPLOYED", "STUDENT", "RETIRED", "OTHER"], },
        maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed"], },
        mobileNo: { type: String, required: true, },
        whatsappNo: { type: String, },
        email: { type: String, required: true, },
        bankName: { type: String, },
        acnumber: { type: String, },
        ifscCode: { type: String, },
        bankimage: { type: String, },
        panno: { type: String, },
        panimage: { type: String, },
        aadharno: { type: String, },
        aadharimage: { type: String, },
        aadharfullname: { type: String, },

        addressproof: { type: String, },
        addressproofno: { type: String, },
        addressproofimage: { type: String, },

        nomineeName: { type: String, },
        nomineeRelation: { type: String, },
        nomineeDOB: { type: Date, },

        address: {
            addressLine1: { type: String, },
            addressLine2: { type: String, },
            city: { type: String, },
            landmark: { type: String, },
            pinCode: { type: String, },
            state: { type: String, },
        },

        kycVerification: {
            isVerified: { type: Boolean, default: false },
            proofType: { type: String, enum: ["Aadhar Card", "PAN Card", "Passport", "Voter ID", "Driving License"], },
            documentNo: { type: String, },
        },

        bankName: { type: String, },
        branchName: { type: String, },
        acnumber: { type: String, },
        ifscCode: { type: String, },

        nomineebankName: { type: String, },
        nomineeacnumber: { type: String, },
        nomineeifscCode: { type: String, },
        nomineeipanno: { type: String, },
        nomineeiaadharno: { type: String, },

        password: { type: String, required: true },

        status: { type: String, enum: ["0", "1"], default: "0", required: true },
        usertype: { type: String, enum: ["0", "1", "2"], default: "0", required: true },
        defaultdata: { type: String, required: true, default: "user" }

    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (this.isNew) {
        const lastUser = await mongoose.model("usertest11").findOne({}, {}, { sort: { dscode: -1 } });
        if (lastUser && lastUser.dscode) {
            this.dscode = (parseInt(lastUser.dscode, 10) + 1).toString();
        } else {
            this.dscode = "1";
        }
    }
    next();
});
const UserModel =
    mongoose.models.usertest123 || mongoose.model("usertest123", UserSchema);

export default UserModel