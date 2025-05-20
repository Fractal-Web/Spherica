import Image from "next/image";
import React from "react";
import styles from "./Hero.module.scss";
import bg from "@/images/assets/bg.webp";

export const Hero = () => {
	return (
		<section className={styles.section}>
			<Image fill src={bg} alt="background-img" />
		</section>
	);
};
