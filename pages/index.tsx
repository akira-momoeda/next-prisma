import React, { useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import styles from "../styles/Movie.module.scss";

import { PrismaClient } from "@prisma/client";
const prisma: PrismaClient = new PrismaClient();

type PropsMovie = {
	id: number;
	title: string;
	year: number;
	description: string;
};

export const Movie = ({ data }) => {
	const [formData, setFormData] = useState<PropsMovie | null>(null);
	const [movies, setMovies] = useState<PropsMovie[]>(data);

	const saveMovie = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<Response> => {
		e.preventDefault();
		setMovies([...movies, formData]);
		const response: Response = await fetch(`api/movies/create`, {
			method: "POST",
			body: JSON.stringify(formData),
		});

		return await response.json();
	};

	return (
		<>
			<h2 className={styles.title}>Movie list</h2>
			<div className={styles.main}>
				<ul className={styles.movieList}>
					{movies.map((movie) => (
						<li className={styles.list} key={movie.id}>
							<Link href={`/movies/${movie.title}`}>
								<h2>{movie.title}</h2>
							</Link>
							<p>{movie.year}</p>
						</li>
					))}
				</ul>
				<form className={styles.movieForm} onSubmit={saveMovie}>
					<input
						type="text"
						placeholder="Title"
						name="title"
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
					/>
					<input
						type="text"
						placeholder="Year"
						name="year"
						onChange={(e) =>
							setFormData({ ...formData, year: +e.target.value })
						}
					/>
					<textarea
						name="description"
						id=""
						cols={30}
						rows={10}
						placeholder="description"
						onChange={(e) =>
							setFormData({ ...formData, description: e.target.value })
						}
					/>
					<button type="submit">Add Movie</button>
				</form>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const movies = await prisma.movie.findMany();

	return {
		props: {
			data: movies,
		},
	};
};

export default Movie;
