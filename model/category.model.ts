import mongoose, { Schema, Document, model } from "mongoose";

export interface ICategory extends Document {
  name: string; // Category name
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true }, // Unique category name
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Category = mongoose.models.Category || model<ICategory>("Category", CategorySchema);

export default Category;
