"use client";
import styles from "./Boots.module.scss";
import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export const Boots = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.boots}>
			<button
				onClick={() => setIsOpen((open) => !open)}
				className={clsx(styles.btn, isOpen && styles.open)}
			>
				<span>Bots in dev</span>
				<Arrow />
			</button>
			<motion.div
				className={styles.content}
				initial="collapsed"
				animate={isOpen ? "open" : "collapsed"}
				variants={{
					open: { height: "auto", opacity: 1 },
					collapsed: { height: 0, opacity: 0 },
				}}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				style={{ overflow: "hidden" }}
			>
				<div className={styles.ct}>
					<span>Telegram</span>
					<span className={styles.second}>Soon</span>
				</div>
				<div className={styles.ct}>
					<span>discord</span>
					<span className={styles.second}>Soon</span>
				</div>
			</motion.div>
		</div>
	);
};

const Arrow = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M11.9982 7.92603C11.5982 7.92603 11.2212 8.08203 10.9372 8.36503L5.65625 13.646L6.36325 14.353L11.6442 9.07203C11.8332 8.88303 12.1622 8.88303 12.3512 9.07203L17.6322 14.353L18.3392 13.646L13.0582 8.36503C12.7752 8.08203 12.3982 7.92603 11.9972 7.92603H11.9982Z"
			fill="white"
		/>
	</svg>
);
