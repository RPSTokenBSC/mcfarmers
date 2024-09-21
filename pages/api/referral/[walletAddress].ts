import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { walletAddress } = req.query;

  console.log("Request received for wallet:", walletAddress); // Log request

  if (!walletAddress) {
    console.log("No wallet address provided"); // Log if no wallet address
    return res.status(400).json({ message: "Wallet address is required" });
  }

  try {
    console.log("Connecting to MongoDB"); // Log MongoDB connection attempt
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");

    console.log("Querying referral data"); // Log query attempt
    const referral = await db
      .collection("referrals")
      .findOne({ walletAddress });

    if (referral) {
      console.log("Referral found:", referral); // Log if referral found
      return res.status(200).json({ referral });
    } else {
      console.log("Referral not found for wallet:", walletAddress); // Log if no referral found
      return res.status(404).json({ message: "Referral not found" });
    }
  } catch (error) {
    console.error("Error during database query:", error); // Log errors in detail
    return res
      .status(500)
      .json({ message: "Database error", error: error.message });
  }
}
