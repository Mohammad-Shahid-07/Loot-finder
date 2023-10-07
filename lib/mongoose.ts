import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URI)
    return console.log("MONGODB URI is not defined");

  if (isConnected) return console.log("Already Connected");

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "LootFinder",
    });
    isConnected = true;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
