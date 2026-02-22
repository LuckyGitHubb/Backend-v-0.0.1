const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    invoiceNo: { type: String, unique: true },

    saleId: { type: mongoose.Schema.Types.ObjectId, ref: "sale" },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "branch" },

    customerName: String,
    customerMobile: String,

    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
            productName: String,
            hsn: String,
            qty: Number,
            rate: Number,
            gst: Number,
            gstAmount: Number,
            total: Number
        }
    ],

    subTotal: Number,
    gstTotal: Number,
    grandTotal: Number,

    paymentMode: {
        type: String,
        enum: ["CASH", "CARD", "UPI"]
    },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("invoice", invoiceSchema);
