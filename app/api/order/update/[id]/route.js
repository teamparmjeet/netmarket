import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order";
import mongoose from "mongoose";
import UserModel from "@/model/User";



export async function PATCH(req, { params }) {
    await dbConnect();

    try {
        const { id } = params;
        const data = await req.json();
        
        // Start a transaction to ensure atomic updates
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Update the order
            const updatedOrder = await OrderModel.findByIdAndUpdate(
                id,
                data,
                { new: true, session }
            );

            if (!updatedOrder) {
                await session.abortTransaction();
                session.endSession();
                return Response.json({
                    message: "order not found",
                    success: false
                }, { status: 404 });
            }

            // Find the user by dscode from the order
            const user = await UserModel.findOne({ 
                dscode: updatedOrder.dscode 
            }).session(session);

            if (user) {
                // Convert earnsp and totalsp to numbers for calculation
                let currentEarnsp = parseFloat(user.earnsp) || 0;
                const orderTotalSp = parseFloat(updatedOrder.totalsp) || 0;

                // Update user's earnsp based on status
                if (data.status !== undefined) {
                    if (data.status === true) {
                        // Add totalsp to earnsp when status becomes true
                        currentEarnsp += orderTotalSp;
                    } else if (data.status === false) {
                        // Subtract totalsp from earnsp when status becomes false
                        currentEarnsp -= orderTotalSp;
                        // Ensure earnsp doesn't go below 0
                        currentEarnsp = Math.max(currentEarnsp, 0);
                    }
                    
                    // Update user with new earnsp value
                    await UserModel.updateOne(
                        { dscode: updatedOrder.dscode },
                        { earnsp: currentEarnsp.toString() },
                        { session }
                    );
                }
            }

            // Commit the transaction
            await session.commitTransaction();
            session.endSession();

            return Response.json({
                message: "order updated successfully",
                success: true,
                data: updatedOrder
            }, { status: 200 });

        } catch (error) {
            // Rollback transaction on error
            await session.abortTransaction();
            session.endSession();
            throw error;
        }

    } catch (error) {
        console.log(error);
        return Response.json({
            message: "Error updating order",
            success: false
        }, { status: 500 });
    }
}