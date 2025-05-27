"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Cursor.module.scss";
import { Coords } from "../VIdeo/Video";

export const Cursor = ({ x, y }: Coords) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			style={{ left: x + 16, top: y + 16 }}
			className={styles.ct}
		>
			<div className={styles.circle}></div>
			<span className={styles.text}>Lounche</span>
		</motion.div>
	);
};
