import mongoose, { Schema, Document, model } from "mongoose";

export interface INewArrival {
  name: string;
  price: string;
  image: string;
  launchDate: string;
  category: string;
}

const NewArrivalSchema = new Schema<INewArrival>(
  {
    name: { type: String },
    price: { type: String },
    image: { type: String }, // Single image URL
    launchDate: { type: String },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

const NewArrival =
  mongoose.models.NewArrival ||
  model<INewArrival>("NewArrival", NewArrivalSchema);

export default NewArrival;
