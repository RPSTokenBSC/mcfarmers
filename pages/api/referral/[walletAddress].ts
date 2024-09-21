import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { walletAddress } = req.query;

  if (!walletAddress) {
    return res.status(400).json({ message: "Wallet address is required" });
  }

  const db = await openDB();

  try {
    const referral = await db.get(
      "SELECT * FROM referrals WHERE walletAddress = ?",
      walletAddress
    );

    // referral type is { id: number, walletAddress: string, telegramUsername: string, referrerUsername: string }

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
