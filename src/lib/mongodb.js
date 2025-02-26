import mongoose from "mongoose";

const MONGO_URI = process.env.DATABASE_URL || ""; 

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let cachedConnection = null;
let cachedPromise = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => mongoose.connection);
  }

  cachedConnection = await cachedPromise;
  return cachedConnection;
}
