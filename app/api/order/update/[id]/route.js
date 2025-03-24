import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order";

export async function PATCH(req, { params }) {
    await dbConnect();

    try {
        const { id } = params;
        const data = await req.json();

        const updatedorder = await OrderModel.findByIdAndUpdate(id, data, { new: true });

        if (!updatedorder) {
            return Response.json({
                message: "order not found",
                success: false
            }, { status: 404 });
        }

        return Response.json({
            message: "order updated successfully",
            success: true,
            data: updatedorder
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Error updating order",
            success: false
        }, { status: 500 });
    }
}
