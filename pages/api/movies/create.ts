import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const create = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const data = JSON.parse(req.body);
	const createdMovie = await prisma.movie.create({
		data: {
			id: data.id,
			title: data.title,
			year: data.year,
			description: data.description,
		},
	});

	res.json(createdMovie);
};

export default create;
