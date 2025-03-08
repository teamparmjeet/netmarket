import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function PATCH(req) {
    await dbConnect();

    try {

        const data = await req.json();

        const user = await UserModel.findById(data.id);

        if (!user) {
            return Response.json(
                {
                    message: "user Not Found!",
                    success: false
                },
                {
                    status: 404
                }
            )
        }

        const updateuser = await UserModel.updateOne(
            {
                _id: data.id
            },
            {

                $set: data
            }
        )

        return Response.json(
            {
                message: "Updated Successfully",
                success: true
            },
            {
                status: 200
            }
        )



    } catch (error) {
        console.log(error)
        return Response.json(
            {
                message: "Have an error",
                success: false
            },
            {
                status: 500
            }
        )
    }


}