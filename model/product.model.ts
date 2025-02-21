import mongoose, { Schema, model } from "mongoose";

export interface IPds {
  name: string;
  price: string;
  image: string;
  description: string;
  sizes: string[];
  images: string[];
  category: string;
}

const PdsSchema = new Schema<IPds>(
  {
    name: { type: String },
    price: { type: String },
    image: { type: String },
    description: { type: String },
    sizes: { type: [String] },
    images: { type: [String] },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

const Pds = mongoose.models.Pds || model<IPds>("Pds", PdsSchema);

export default Pds;
