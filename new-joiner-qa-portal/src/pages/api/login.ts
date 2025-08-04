import type { NextApiRequest, NextApiResponse } from "next";

const mockUsers = [
  { id: "manager1", role: "manager", name: "Manager" },
  { id: "newJoiner1", role: "new-joiner", name: "Alice QA" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { id, role } = req.body;
    const user = mockUsers.find(u => u.id === id && u.role === role);
    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } else {
    res.status(405).end();
  }
}