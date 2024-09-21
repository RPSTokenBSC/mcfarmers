import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // Ensure id is always a string
  const objectId = Array.isArray(id) ? id[0] : id;

  try {
    const client = await clientPromise;
    const db = client.db("yourDatabaseName");

    if (req.method === "PUT") {
      const { walletAddress, telegramUsername, referrerUsername } = req.body;
      const result = await db.collection("referrals").updateOne(
        { _id: new ObjectId(objectId) }, // Convert the id to ObjectId
        { $set: { walletAddress, telegramUsername, referrerUsername } }
      );
      res.status(200).json({ message: "Referral updated successfully" });
    } else if (req.method === "DELETE") {
      await db
        .collection("referrals")
        .deleteOne({ _id: new ObjectId(objectId) });
      res.status(200).json({ message: "Referral deleted successfully" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
}
