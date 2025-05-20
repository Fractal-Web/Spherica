import React, { PropsWithChildren } from "react";
import NextLink, { LinkProps } from "next/link";
import styles from "./Link.module.scss";
import clsx from "clsx";

interface TLinkProps extends LinkProps {
	type?: "white" | "gradient";
	icon?: "left" | "bottom";
}

export const Link = ({
	children,
	type = "white",
	icon = "left",
	...props
}: PropsWithChildren<TLinkProps>) => {
	return (
		<NextLink
			className={clsx(
				styles.link,
				type === "gradient" && styles.gradient
			)}
			{...props}
		>
			<span className={styles.ct2}>
				<span className={styles.ct}>
					<span className={styles.text}>{children}</span>
					<LinkIcon
						className={clsx(
							styles.icon,
							icon === "bottom" && styles.bottom
						)}
					/>
				</span>
			</span>
		</NextLink>
	);
};

const LinkIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M15.8337 10.0001C15.8345 10.5535 15.6212 11.0785 15.232 11.4718L11.967 14.8726C11.8853 14.9576 11.7762 15.0001 11.667 15.0001C11.5628 15.0001 11.4595 14.9618 11.3778 14.8835C11.212 14.7251 11.207 14.4601 11.3662 14.2943L14.6353 10.8893C14.7712 10.7518 14.8703 10.591 14.9312 10.4168H4.58366C4.35366 10.4168 4.16699 10.2301 4.16699 10.0001C4.16699 9.77012 4.35366 9.58345 4.58366 9.58345H14.9262C14.8637 9.41012 14.7628 9.25179 14.6278 9.11762L11.3328 5.74345C11.172 5.57929 11.1753 5.31512 11.3395 5.15429C11.5045 4.99429 11.7687 4.99679 11.9287 5.16179L15.2187 8.53095C15.6095 8.91595 15.8295 9.44429 15.8337 10.0001Z"
			fill="white"
		/>
	</svg>
);
