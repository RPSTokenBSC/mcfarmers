// pages/api/referrals.ts
import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../lib/db";
// pages/api/referrals.ts
import { Referral } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await openDB();

  try {
    const referrals: Referral[] = await db.all("SELECT * FROM referrals");
    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
