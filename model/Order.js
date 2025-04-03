import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(

    {
        orderNo: { type: String, required: true, default: "0" },
        date: { type: Date, required: true },
        transactionId: { type: String, },
        dscode: { type: String, required: true },
        dsname: { type: String, required: true },
        address: { type: String, required: true },
        mobileno: { type: Number, required: true },
        shippingAddress: { type: String, required: true },
        shippingmobile: { type: String, required: true },
        shippinpPincode: { type: String, required: true },
        paymentmod: { type: String, required: true },
        productDetails: [
            {
                productgroup: { type: String, required: true },
                product: { type: String, required: true },
                quantity: { type: String, required: true }
            }
        ],
        salegroup: { type: String, enum: ["SAO", "SGO"], },
        shippingcharge: { type: String, required: true },
        netamount: { type: String, required: true },
        remarks: { type: String, },
        status: { type: Boolean, required: true, default: false },
        totalsp: { type: String, required: true },
        defaultdata: { type: String, required: true, default: "Order" }

    },
    { timestamps: true }
);

OrderSchema.pre("save", async function (next) {
    if (this.isNew) {
        const lastorder = await mongoose.model("Ordertest111").findOne({}, {}, { sort: { orderNo: -1 } });
        if (lastorder && lastorder.orderNo) {
            this.orderNo = (parseInt(lastorder.orderNo, 10) + 1).toString();
        } else {
            this.orderNo = "1";
        }
    }
    next();
});
const OrderModel =
    mongoose.models.Ordertest1111 || mongoose.model("Ordertest1111", OrderSchema);

export default OrderModel