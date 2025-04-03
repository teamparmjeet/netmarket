import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function PATCH(req) {
    await dbConnect();

    try {
        const data = await req.json();
        console.log(data, "ok");

        if (!data.id) {
            return new Response(
                JSON.stringify({ success: false, message: "User ID is required!" }),
                { status: 400 }
            );
        }

        const user = await UserModel.findById(data.id);

        if (!user) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found!" }),
                { status: 404 }
            );
        }

        // Hash password if provided
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const updateFields = { ...data };

        // If `level` is updated, store it in `LevelDetails` with existing `saosp` and `sgosp`
        if (data.level) {
            updateFields.LevelDetails = [
                ...user.LevelDetails, // Keep existing levels
                {
                    levelName: data.level,
                    sao: user.saosp || "", // Use existing saosp value
                    sgo: user.sgosp || "", // Use existing sgosp value
                },
            ];
        }

        await UserModel.updateOne(
            { _id: data.id },
            { $set: updateFields }
        );

        return new Response(
            JSON.stringify({ success: true, message: "Updated successfully!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("User update error:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Internal server error. Try again later." }),
            { status: 500 }
        );
    }
}
