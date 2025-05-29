"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import React, { useState } from "react";
import styles from "./Video.module.scss";
import { useMediaQuery } from "usehooks-ts";
import { VideoControls } from "../Video-controls/Video-controls";
import { Search } from "../Seach/Search";

export interface Coords {
	x: number;
	y: number;
}

type MouseEventT = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface useSphereAnimationReturnValue {
	transformX: MotionValue<string>;
	transformBlockHeight: MotionValue<string>;
	transformSphereSize: MotionValue<string>;
	changeBlurOpacity: MotionValue<number>;
}

const useSphereAnimations = (): useSphereAnimationReturnValue => {
	const { scrollYProgress } = useScroll();
	//For desktop
	const transformX = useTransform(scrollYProgress, [0, 0.18], ["0%", "45%"]);
	//for mobile
	const transformBlockHeight = useTransform(
		scrollYProgress,
		[0, 0.1],
		["460px", "200px"]
	);
	const transformSphereSize = useTransform(
		scrollYProgress,
		[0, 0.1],
		["220px", "100px"]
	);

	const changeBlurOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

	return {
		transformX,
		transformBlockHeight,
		transformSphereSize,
		changeBlurOpacity,
	};
};

const Video = () => {
	const isMobile = useMediaQuery("(max-width: 768px)");
	const {
		transformBlockHeight,
		transformSphereSize,
		transformX,
		changeBlurOpacity,
	} = useSphereAnimations();

	const [isHovered, setIsHovered] = useState(false);
	const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);

	const [mousePos, setMousePos] = useState<Coords | null>(null);

	const onMouseMove = (e: MouseEventT) => {
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	const onMouseOver = (e: MouseEventT) => {
		setIsHovered(true);
		setMousePos({ x: e.clientX, y: e.clientY });
	};

	const onMouseLeave = () => {
		setIsHovered(false);
		setMousePos(null);
	};

	const toggleModal = () => {
		setIsLaunchModalOpen((old) => !old);
	};

	return (
		<>
			<motion.div
				onMouseOver={onMouseOver}
				onMouseLeave={onMouseLeave}
				onMouseMove={onMouseMove}
				onClick={toggleModal}
				className={styles.bgVideo}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ ease: "linear", duration: 1.5 }}
				style={isMobile ? { height: transformBlockHeight } : {}}
			>
				<div className={styles.videoCt}>
					<motion.video
						style={
							!isMobile
								? { translateX: transformX }
								: { height: transformSphereSize }
						}
						muted
						autoPlay
						loop
						playsInline
					>
						<source
							src={"/assets/videos/output.mov"}
							// type={"video/webm"}
							type="video/quicktime"
						/>
						{/* <source
							src={"/assets/videos/output.webm"}
							type={"video/webm"}
						/> */}
					</motion.video>
					{isMobile && (
						<span className={styles.textMobile}>
							press to Launche
						</span>
					)}
				</div>
				{isMobile && (
					<>
						<motion.div
							style={{ opacity: changeBlurOpacity }}
							className={styles.blur}
						></motion.div>
						<div className={styles.mobileSearch}>
							<Search />
						</div>
					</>
				)}
			</motion.div>
			<VideoControls
				isHovered={isHovered}
				mousePos={mousePos}
				isLaunchModalOpen={isLaunchModalOpen}
				onCloseModal={() => {
					setIsLaunchModalOpen(false);
				}}
			/>
		</>
	);
};

export default Video;
