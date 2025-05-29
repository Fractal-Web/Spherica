import React from "react";
import styles from "./Token.module.scss";
import Link from "next/link";
import clsx from "clsx";

const LINKS: {
	href: string;
	text: string;
	type: "base" | "green" | "blue" | "yellow";
}[] = [
	{
		href: "#",
		text: "Our contract",
		type: "base",
	},
	{
		href: "#",
		text: "pump.fun",
		type: "green",
	},
	{
		href: "#",
		text: "dexscreener",
		type: "base",
	},
	{
		href: "#",
		text: "Coinmarket cap",
		type: "blue",
	},
	{
		href: "#",
		text: "Coingecko",
		type: "yellow",
	},
];

export const Token = () => {
	return (
		<section id="token" className={styles.ct}>
			<div className={styles.ct2}>
				<div className={styles.ct3}>
					<h2>token</h2>
				</div>
				<div className={styles.ct4}>
					<div className={styles.text}>
						<p>
							Our only way forward is to make Spherica{" "}
							<span className={styles.italic}>so good</span>, the
							market speaks for us.
						</p>
					</div>
				</div>
			</div>
			<div className={styles.ct5}>
				<div className={styles.ct6}>
					<div className={styles.wp}>
						<span className={styles.title}>Total Supply:</span>
						<p>1,000,000,000 $SPH</p>
					</div>
					<p>
						This lock isn’t just a security measure – it’s our
						motivation. For six months, we build without touching a
						single token.{" "}
					</p>
				</div>
				<div className={styles.ct7}>
					<div className={styles.ct8}>
						<span className={styles.title}>
							official Token links
						</span>
						<div className={styles.ct9}>
							{LINKS.map((link, i) => (
								<Link
									className={clsx(
										styles.link,
										styles[link.type]
									)}
									href={link.href}
									key={i}
								>
									{link.text}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
