import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email?: string;
  password?: string; // Ensure hashed passwords are stored
  role?: "user" | "admin"; // Default to 'user'
  shippingAddress?: {
    fullName?: string;
    phone?: string;
    addressLine1?: string;
    addressLine2?: string; // Optional field
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ShippingAddressSchema = new Schema(
  {
    fullName: { type: String },
    phone: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String }, // Optional
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { _id: false } // Prevents creating an additional ID for subdocuments
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    shippingAddress: { type: ShippingAddressSchema },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
