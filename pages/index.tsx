import React, { useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import styles from "../styles/Movie.module.scss";
import Image from "next/image";
import deleteIcon from "../public/deleteIcon.svg";
import { BaseButton } from "../components/BaseButton";

import { PrismaClient } from "@prisma/client";
import Router from "next/router";
const prisma: PrismaClient = new PrismaClient();

type Movie = {
	id: number;
	title: string;
	year: number;
	description: string;
};

export const Movie: React.FC<{ data: Movie[] }> = ({ data }) => {
	const [movies, setMovies] = useState<Movie[]>(data);
	const routeCreate = (): void => {
		Router.push({
			pathname: "/create",
		});
	};

	const handleDelete = async (id: number) => {
		const response: Response = await fetch(`api/movies/${id}`, {
			method: "DELETE",
		});
		const targetMovies = movies.filter((movie) => movie.id !== id);
		setMovies(targetMovies);
		await response.json();
	};

	return (
		<>
			<h2 className={styles.title}>Movieリスト</h2>
			<BaseButton label={"Add Movie"} onClick={routeCreate} />
			<ul className={styles.movieList}>
				{movies.map((movie: Movie) => {
					return (
						<li className={styles.list} key={movie.id}>
							<div className="container">
								<Link href={`/movies/${movie.title}`}>
									<h2>{movie.title}</h2>
								</Link>
								<p>{movie.year}</p>
							</div>
							<Image
								alt="delete icon"
								src={deleteIcon}
								layout="fixed"
								width={50}
								height={50}
								onClick={() => handleDelete(movie.id)}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const movies = await prisma.movie.findMany({
		orderBy: {
			id: "desc",
		},
	});

	return {
		props: {
			data: movies,
		},
	};
};

export default Movie;
