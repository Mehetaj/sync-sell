import mongoose, { Schema, Document, model } from "mongoose";

export interface ICatalog extends Document {
  name: string;
  image: string;
}

const CatalogSchema = new Schema<ICatalog>(
  {
    name: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Catalog =
  mongoose.models.Catalog || model<ICatalog>("Catalog", CatalogSchema);

export default Catalog;
