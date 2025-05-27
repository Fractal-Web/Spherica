"use client";

import {
	AnimatePresence,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";
import React, { useState } from "react";
import styles from "./Video.module.scss";
import { Cursor } from "../Cursor/Cursor";

export interface Coords {
	x: number;
	y: number;
}

export const Video = () => {
	const { scrollYProgress } = useScroll();
	const transformX = useTransform(scrollYProgress, [0, 0.18], ["0%", "45%"]);
	const [isHovered, setIsHovered] = useState(false);

	const [mousePos, setMousePos] = useState<Coords | null>(null);

	const onMouseMove = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	const onMouseOver = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
		setIsHovered(true);
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	const onMouseLeave = () => {
		setIsHovered(false);
		setMousePos(null);
	};

	return (
		<>
			<motion.video
				onMouseOver={onMouseOver}
				onMouseLeave={onMouseLeave}
				onMouseMove={onMouseMove}
				className={styles.bgVideo}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ ease: "easeOut", duration: 0.3 }}
				style={{ translateX: transformX }}
				muted
				autoPlay
				loop
				playsInline
			>
				<source src={"/assets/videos/test-4.webm"} type={"video/mp4"} />
			</motion.video>
			<AnimatePresence>
				{mousePos && isHovered && <Cursor {...mousePos} />}
			</AnimatePresence>
		</>
	);
};
