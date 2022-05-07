import styles from "../../styles/Movie.module.scss";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const MovieDetail = ({ movie }) => {
	return (
		<>
			<h2 className={styles.title}>Detail</h2>
			<div className={styles.detail}>
				<h2>{movie.title}</h2>
				<h2>{movie.year}</h2>
				<p>{movie.description}</p>
			</div>
		</>
	);
};

export async function getServerSideProps(context) {
	const { title } = context.query;

	const movie = await prisma.movie.findFirst({
		where: {
			title: title,
		},
	});

	return {
		props: {
			movie,
		},
	};
}

export default MovieDetail;
