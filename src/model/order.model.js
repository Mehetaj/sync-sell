import mongoose, { model, models, Schema } from "mongoose";

const ItemSchema = new Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const OrderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    items: [ItemSchema],
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "credit-card", "paypal"],
    },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
