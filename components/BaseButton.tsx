import styles from "../styles/Movie.module.scss";

type Props = {
	label: string;
	type?: string;
	onClick?: () => void;
};

export const BaseButton = (props: Props) => {
	const { label, onClick } = props;
	return (
		<button className={styles.button} onClick={onClick}>
			{label}
		</button>
	);
};
