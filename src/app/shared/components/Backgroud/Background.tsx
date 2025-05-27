import React from "react";
import styles from "./Background.module.scss";
import Image from "next/image";
import bg from "@/images/assets/bg.webp";
import { Video } from "../VIdeo/Video";

export const Background = () => {
	return (
		<section className={styles.bg}>
			<Image className="bg" fill src={bg} alt="backtround-img" />
			<Video />
		</section>
	);
};
