import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BtnProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

export const Button = ({ children, className, ...props }: BtnProps) => {
	return (
		<button className={clsx(styles.btn, className)} {...props}>
			{children}
		</button>
	);
};
