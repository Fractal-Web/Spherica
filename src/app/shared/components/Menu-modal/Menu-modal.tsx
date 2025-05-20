import React from "react";
import { motion } from "framer-motion";
import styles from "./Menu-modal.module.scss";
import { HeaderLink } from "../Header/Header";
import Link from "next/link";
import { Button } from "../Button/Button";
import { createPortal } from "react-dom";

const LINKS_MOBILE: HeaderLink[] = [
	{
		href: "#roadmap",
		text: "roadmap",
	},
	{
		href: "#github",
		text: "github",
	},
	{
		href: "#docs",
		text: "docs",
	},
	{
		href: "#dexscreener",
		text: "dexscreener",
	},
	{
		href: "#about",
		text: "abou",
	},
	{
		href: "#token",
		text: "token",
	},
	{
		href: "#utility",
		text: "utility",
	},
];

const MenuModal = () => {
	React.useEffect(() => {
		const html = document.querySelector("html");
		if (html) {
			html.style.marginRight = `${
				window.innerWidth - document.documentElement.clientWidth
			}px`;
			html.style.overflow = "hidden";
		}
		return () => {
			if (html) {
				html.style.marginRight = "0px";
				html.style.overflow = "unset";
			}
		};
	}, []);

	return createPortal(
		<motion.div
			initial={{ opacity: 0, height: 0 }}
			animate={{ opacity: 1, height: "100%" }}
			exit={{ opacity: 0, height: 0 }}
			className={styles.menu}
		>
			<ul className={styles.list}>
				{LINKS_MOBILE.map((link, i) => (
					<li key={i}>
						<Link href={link.href}>{link.text}</Link>
					</li>
				))}
			</ul>

			<Button className={styles.btn}>Connect wallet</Button>
		</motion.div>,
		document.body
	);
};

export default MenuModal;
