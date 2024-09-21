import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Attempting to connect to MongoDB");
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");

    // Just return a simple success message if the connection works
    return res.status(200).json({ message: "MongoDB connection successful!" });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return res
      .status(500)
      .json({ message: "Error connecting to MongoDB", error: error.message });
  }
}
