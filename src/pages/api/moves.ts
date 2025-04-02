import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const moves = await prisma.move.findMany();
        res.status(200).json(moves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch moves" });
    }
}
