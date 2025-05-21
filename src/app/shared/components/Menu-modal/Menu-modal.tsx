import React from "react";
import { motion } from "framer-motion";
import styles from "./Menu-modal.module.scss";
import { HeaderLink } from "../Header/Header";
import Link from "next/link";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const WalletBtn = dynamic(
	() => import("@/components/Button/ConnectWalletBtn"),
	{ ssr: false }
);

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
		text: "about",
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

			<WalletBtn className={styles.btn} />
		</motion.div>,
		document.body
	);
};

export default MenuModal;
