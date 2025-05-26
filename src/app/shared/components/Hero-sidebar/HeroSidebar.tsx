import React from "react";
import styles from "./HeroSidebar.module.scss";
import { Link } from "../Link/Link";

const LINKS: { href: string; title: string }[] = [
	{
		title: "about",
		href: "#about",
	},
	{
		title: "utility",
		href: "#utility",
	},
	{
		title: "token",
		href: "#token",
	},
];

export const HeroSidebar = () => {
	return (
		<div className={styles.ct}>
			<ul className={styles.sidebar}>
				{LINKS.map((link, i) => (
					<li key={i}>
						<Link href={link.href}>{link.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
