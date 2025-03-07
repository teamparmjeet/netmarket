import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(

    {
       
        name: { type: String, required: true, },
        relationTitle: { type: String, enum: ["S/o", "D/o", "W/o"], },
        fatherOrHusbandName: { type: String, },
        gender: { type: String, enum: ["Male", "Female", "Other"], required: true, },
        dob: { type: Date, },
        profession: { type: String, enum: ["SALARIED", "SELF-EMPLOYED", "STUDENT", "RETIRED", "OTHER"], },
        maritalStatus: { type: String, enum: ["Single", "Married", "Divorced", "Widowed"], },
        mobileNo: { type: String, required: true, },
        whatsappNo: { type: String, },
        email: { type: String, required: true, },
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
        nomineebranchName: { type: String, },
        nomineeacnumber: { type: String, },
        nomineeifscCode: { type: String, },

        password: { type: String, required: true },

        status: { type: String, enum: ["0", "1"], default: "0", required: true },
        usertype: { type: String, enum: ["0", "1", "2"], default: "0", required: true },
        defaultdata: { type: String, required: true, default: "user" }

    },
    { timestamps: true }
);

const UserModel =
    mongoose.models.usertest4 || mongoose.model("usertest4", UserSchema);

export default UserModel