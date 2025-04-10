import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function PATCH(req) {
    await dbConnect();

    try {
        const data = await req.json();

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

        // Convert strings to numbers for calculations
        const activesp = parseFloat(data.activesp || "0");
        let earnsp = parseFloat(user.earnsp || "0");

        // Apply activesp deduction and parent chain update if usertype is being updated
        if (data.usertype && data.usertype !== user.usertype) {
            // Deduct activesp from user earnsp
            earnsp -= activesp;

            // Update user earnsp
            data.earnsp = earnsp.toString();

            // Start updating parent chain
            let currentParentCode = user.pdscode;

            while (currentParentCode && currentParentCode !== "0") {
                const parent = await UserModel.findOne({ dscode: currentParentCode });

                if (!parent) break;

                if (user.group === "SAO") {
                    parent.saosp = (parseFloat(parent.saosp || "0") + activesp).toString();
                } else if (user.group === "SGO") {
                    parent.sgosp = (parseFloat(parent.sgosp || "0") + activesp).toString();
                }

                await parent.save();

                currentParentCode = parent.pdscode; // Move up the chain
            }
        }

        // Handle level update
        if (data.level) {
            data.LevelDetails = [
                ...user.LevelDetails,
                {
                    levelName: data.level,
                    sao: user.saosp || "",
                    sgo: user.sgosp || "",
                },
            ];
        }

        await UserModel.updateOne({ _id: data.id }, { $set: data });

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
