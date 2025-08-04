import type { NextApiRequest, NextApiResponse } from "next";

// In-memory store
let statuses: { [joinerId: string]: any } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { joinerId } = req.query;

  if (req.method === "GET") {
    res.status(200).json({ status: statuses[joinerId as string] || null });
  } else if (req.method === "POST") {
    statuses[joinerId as string] = req.body.status;
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}