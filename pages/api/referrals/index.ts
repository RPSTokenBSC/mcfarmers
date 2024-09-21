import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");
    const referrals = await db.collection("referrals").find({}).toArray();
    res.status(200).json({ referrals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
