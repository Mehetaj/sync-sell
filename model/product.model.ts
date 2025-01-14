import mongoose, { Schema, Document, model } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  price: string;
  image: string;
  description?: string;
  details?: string[];
  sizes?: string[];
  images?: string[];
  category?: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    details: { type: [String] },
    sizes: { type: [String] },
    images: { type: [String] },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || model<IProduct>("Product", ProductSchema);

export default Product;
