import React from "react";

type Props = {
	type: string;
	placeholder: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const BaseTextInput = (props: Props) => {
	const { type, placeholder, name, onChange } = props;
	return (
		<input
			type={type}
			placeholder={placeholder}
			name={name}
			onChange={(e) => onChange(e)}
		/>
	);
};
