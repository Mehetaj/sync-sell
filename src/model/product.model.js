import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const PdsSchema = new Schema(
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

const Pds = models.Pds || model("Pds", PdsSchema);

export default Pds;
