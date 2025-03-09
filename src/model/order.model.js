import mongoose, { model, models, Schema } from "mongoose";

const ItemSchema = new Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    name: { type: String },
    email: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    size: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const OrderSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    zip: { type: String },
    items: [ItemSchema],
    paymentMethod: {
      type: String,
      enum: ["cash", "credit-card", "paypal"],
    },
    total: { type: Number },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
