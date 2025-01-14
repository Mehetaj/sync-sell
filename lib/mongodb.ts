import mongoose from "mongoose";

const MONGO_URI = process.env.DATABASE_URL || ""; // Replace with your MongoDB connection string

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

// Cache the connection instance
let cachedConnection: mongoose.Connection | null = null;
let cachedPromise: Promise<mongoose.Connection> | null = null;

export async function connectToDatabase(): Promise<mongoose.Connection> {
  // If a connection exists, return it
  if (cachedConnection) {
    return cachedConnection;
  }

  // If the connection promise doesn't exist, create it
  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose.connection);
  }

  // Wait for the connection and cache it
  cachedConnection = await cachedPromise;
  return cachedConnection;
}
