import React, { useState } from "react";
import Router from "next/router";
import styles from "../styles/Movie.module.scss";

import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";

import { BaseButton } from "../components/BaseButton";
import { BaseTextInput } from "../components/BaseTextInput";
const prisma: PrismaClient = new PrismaClient();

type Movie = {
	id: number;
	title: string;
	year: number;
	description: string;
};

export const Create: React.FC<{ data: Movie[] }> = ({ data }) => {
	const [formData, setFormData] = useState<Movie | null>(null);
	const [movies, setMovies] = useState<Movie[]>(data);

	const createMovie = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		setMovies([...movies, formData]);
		const response: Response = await fetch(`api/movies/create`, {
			method: "POST",
			body: JSON.stringify(formData),
		});

		await response.json();
		Router.push({ pathname: "/" });
	};

	return (
		<>
			<h2 className={styles.title}>おすすめの映画を登録しましょう!</h2>
			<form className={styles.movieForm} onSubmit={createMovie}>
				<BaseTextInput
					type={"text"}
					placeholder={"Title"}
					name={"title"}
					onChange={(e) => setFormData({ ...formData, title: e.target.value })}
				/>
				<BaseTextInput
					type={"text"}
					placeholder={"Year"}
					name={"year"}
					onChange={(e) => setFormData({ ...formData, year: +e.target.value })}
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
				<BaseButton label={"Add Movie"} type={"submit"} />
			</form>
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

export default Create;
