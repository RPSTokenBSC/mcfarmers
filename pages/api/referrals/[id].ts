import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const db = await openDB();

  if (req.method === "PUT") {
    const { walletAddress, telegramUsername, referrerUsername } = req.body;

    try {
      await db.run(
        `UPDATE referrals SET walletAddress = ?, telegramUsername = ?, referrerUsername = ? WHERE id = ?`,
        [walletAddress, telegramUsername, referrerUsername, id]
      );
      res.status(200).json({ message: "Referral updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Database error", error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await db.run(`DELETE FROM referrals WHERE id = ?`, [id]);
      res.status(200).json({ message: "Referral deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Database error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
