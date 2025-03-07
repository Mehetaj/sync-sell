import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const CartSchema = new Schema(
  {
    product_id: { type: String, },
    name: { type: String },
    price: { type: String },
    image: { type: String },
    size: { type: String },
    quantity: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
