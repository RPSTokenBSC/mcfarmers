import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { walletAddress, telegramUsername, referrerUsername } = req.body;

  // if (!walletAddress || !referrerUsername) {
  //   return res.status(400).json({ message: "Wallet" });
  // }
  if (!walletAddress) {
    return res.status(400).json({ message: "Wallet address is required" });
  }
  if (!referrerUsername) {
    return res.status(400).json({ message: "Referrer username is required" });
  }
  // no own username also
  if (!telegramUsername) {
    return res.status(400).json({ message: "Telegram username is required" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");

    // Check if referral already exists
    const existingReferral = await db
      .collection("referrals")
      .findOne({ walletAddress });

    if (existingReferral) {
      return res.status(400).json({ message: "Referral already submitted." });
    }

    // Insert the referral data
    const result = await db.collection("referrals").insertOne({
      walletAddress,
      telegramUsername: telegramUsername || "",
      referrerUsername,
    });

    res.status(200).json({
      message: "Referral submitted successfully",
      referralId: result.insertedId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting referral", error: error.message });
  }
}
