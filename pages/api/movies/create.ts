import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const create = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const data = JSON.parse(req.body);
	const createMovie = await prisma.movie.create({
		data,
	});

	res.json(createMovie);
};

export default create;
