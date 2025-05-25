import React from "react";
import styles from "./About.module.scss";
import { Button } from "../Button/Button";

export const About = () => {
	return (
		<div className={styles.grid}>
			<div className={styles.info}>
				<p>
					Spherica isn&apos;t just an A1 agent — it&apos;s a{" "}
					<span className={styles.color}>trading mind.</span>
				</p>
				<p>It understands the market like a brain, not a machine.</p>
			</div>
			<div className={styles.empty}></div>
			<div className={styles.title}>
				<h2>About</h2>
			</div>
			<div className={styles.info2}>
				<p>
					With real-time Twitter scanning, deep token and contract
					analysis, and blazing-fast APIs, Spherica spots what others
					miss — and acts before it&apos;s obvious.
				</p>
				<div className={styles.subcontent}>
					<p>
						This isn&apos;t just tech. It&apos;s a new way to trade:
						faster, smarter, sharper.
					</p>
					<div className={styles.nav}>
						<Button variant="outline">Read more</Button>
						<Button>Docs</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
