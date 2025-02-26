import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const CatalogSchema = new Schema(
  {
    name: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Catalog = models.Catalog || model("Catalog", CatalogSchema);

export default Catalog;
