import AdminModel from "@/model/Admin";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await dbConnect();

    try {
        const { name, email, mobile, password, usertype } = await req.json();

       
        const alreadyUser = await AdminModel.findOne({ email });
        if (alreadyUser) {
            return Response.json(
                {
                    message: "User already exists with the provided email address!",
                    success: false,
                },
                { status: 400 }
            );
        }

       
       
        const hashedPassword = await bcrypt.hash(password, 10);

        const createAdmin = await AdminModel.create({
            name,
            mobile,
            email,
            password: hashedPassword,
            usertype
        });

        return Response.json({
            message: "User registered successfully",
            success: true,
        }, { status: 201 });

    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Error registering User",
            success: false
        }, { status: 500 });
    }
}
