import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

export const handleDelete = async (
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> => {
	const url = req.url;
	const deleteID = parseInt(url.split(/\//, 10).pop());
	const deleteTargetMovie = await prisma.movie.delete({
		where: {
			id: deleteID,
		},
	});

	res.json(deleteTargetMovie);
};

export default handleDelete;
