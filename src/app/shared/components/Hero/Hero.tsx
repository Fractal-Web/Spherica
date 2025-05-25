import React from "react";
import styles from "./Hero.module.scss";
import { Search } from "../Seach/Search";
import { HeroSidebar } from "../Hero-sidebar/HeroSidebar";

export const Hero = () => {
	return (
		<section className={styles.section}>
			<HeroSidebar />
			<Search />
		</section>
	);
};
