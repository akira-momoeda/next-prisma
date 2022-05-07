import styles from "../styles/Movie.module.scss";

type Props = {
	label: string;
	type?: string;
	onClick?: () => void;
};

export const BaseButton = (props: Props) => {
	return (
		<button className={styles.button} onClick={props.onClick}>
			{props.label}
		</button>
	);
};
