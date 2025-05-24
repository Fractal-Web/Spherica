// import Image from "next/image";
import React from "react";
import styles from "./Hero.module.scss";
// import bg from "@/images/assets/bg.webp";
import { Search } from "../Seach/Search";
import { HeroSidebar } from "../Hero-sidebar/HeroSidebar";

export const Hero = () => {
	return (
		<section className={styles.section}>
			{/* <Image fill src={bg} alt="background-img" /> */}
			<HeroSidebar />
			<Search />
		</section>
	);
};
