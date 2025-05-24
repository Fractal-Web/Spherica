import React, { PropsWithChildren } from "react";
import styles from "./Container.module.scss";
import clsx from "clsx";

interface ContainerProps {
	variant?: "div" | "section";
	className?: string;
}

export const Container = ({
	children,
	className,
	variant = "section",
}: PropsWithChildren<ContainerProps>) => {
	switch (variant) {
		case "div":
			return <div className={clsx(styles.ct, className)}>{children}</div>;
		case "section":
			return (
				<section className={clsx(styles.ct, className)}>
					{children}
				</section>
			);
		default:
			throw "Panic!";
	}
};
