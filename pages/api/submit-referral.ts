// pages/api/submit-referral.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../lib/db"; // Ensure correct import of openDB

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { walletAddress, telegramUsername, referrerUsername } = req.body;

  if (!walletAddress || !telegramUsername || !referrerUsername) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = await openDB();

    // Ensure the table exists
    await db.run(`
      CREATE TABLE IF NOT EXISTS referrals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        walletAddress TEXT,
        telegramUsername TEXT,
        referrerUsername TEXT
      )
    `);

    // Insert the referral data
    const result = await db.run(
      `INSERT INTO referrals (walletAddress, telegramUsername, referrerUsername)
       VALUES (?, ?, ?)`,
      [walletAddress, telegramUsername, referrerUsername]
    );

    res.status(200).json({
      message: "Referral submitted successfully",
      referralId: result.lastID,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting referral", error: error.message });
  }
}
