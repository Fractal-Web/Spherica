"use client";

import React from "react";
import styles from "./BackgroundVideo.module.scss";
import dynamic from "next/dynamic";

const Video = dynamic(() => import("@/components/VIdeo/Video"), { ssr: false });

export const BackgroundVideo = () => {
	return (
		<section className={styles.bg}>
			<Video />
		</section>
	);
};
