import type { NextApiRequest, NextApiResponse } from "next";

// In-memory store
let configs: { [joinerId: string]: any } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { joinerId } = req.query;

  if (req.method === "GET") {
    res.status(200).json({ config: configs[joinerId as string] || null });
  } else if (req.method === "POST") {
    configs[joinerId as string] = req.body.config;
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}