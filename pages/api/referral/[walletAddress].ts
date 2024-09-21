import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ message: "Wallet address is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");
    const referral = await db
      .collection("referrals")
      .findOne({ walletAddress });

    if (referral) {
      return res.status(200).json({ referral });
    } else {
      return res.status(404).json({ message: "Referral not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Database error", error: error.message });
  }
}
