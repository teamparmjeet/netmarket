import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(

    {
        date: { type: Date, },
        transactionId: { type: String, },
        dscode: { type: String, },
        dsname: { type: String, },
        address: { type: String, },
        mobileno: { type: Number, },
        shippingAddress: { type: String, },
        shippingmobile: { type: String, },
        shippinpPincode: { type: String, },
        paymentmod: { type: String, },
        cftype: { type: String, },
        state: { type: String, },
        district: { type: String, },
        productgroup: { type: String, },
        productcolor: { type: String, },
        product: { type: String, },
        salegroup: { type: String, },
        quantity: { type: String, },
        shippingcharge: { type: String, },
        netamount: { type: String, },
        remarks: { type: String, },
        defaultdata: { type: String, required: true, default: "Order" }

    },
    { timestamps: true }
);

const OrderModel =
    mongoose.models.Ordertest || mongoose.model("Ordertest", OrderSchema);

export default OrderModel