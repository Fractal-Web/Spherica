import { motion } from "framer-motion";
import React from "react";
import styles from "./Loading.module.scss";

export const Loading = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { duration: 0.3, delay: 1, ease: "linear" },
			}}
			exit={{
				opacity: 0,
				transition: { duration: 0.3, delay: 0, ease: "linear" },
			}}
			className={styles.loader}
		>
			<span></span>
			<span></span>
			<span></span>
		</motion.div>
	);
};
