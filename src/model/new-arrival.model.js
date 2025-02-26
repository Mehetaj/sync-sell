import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const NewArrivalSchema = new Schema(
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

const NewArrival = models.NewArrival || model("NewArrival", NewArrivalSchema);

export default NewArrival;
