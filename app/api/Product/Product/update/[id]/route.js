import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/model/Product";

export async function PATCH(req, { params }) {
    await dbConnect();

    try {
        const { id } = params;
        const data = await req.json();

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, data, { new: true });

        if (!updatedProduct) {
            return Response.json({
                message: "Product not found",
                success: false
            }, { status: 404 });
        }

        return Response.json({
            message: "Product updated successfully",
            success: true,
            data: updatedProduct
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Error updating product",
            success: false
        }, { status: 500 });
    }
}
