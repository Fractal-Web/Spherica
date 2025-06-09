"use client";

import React from "react";
import styles from "./Header.module.scss";
import { Link } from "@/components/Link/Link";
import NextLink from "next/link";
import Image, { StaticImageData } from "next/image";
import logo from "@/images/assets/logo.svg";
import { MobileMenu } from "../Mobile-menu/MobileMenu";
import dynamic from "next/dynamic";
import { Button } from "../Button/Button";
import link1 from "@/images/icons/header/x.svg";
import link2 from "@/images/icons/header/email.svg";
import link3 from "@/images/icons/header/tg.svg";

const WalletBtn = dynamic(
	() => import("@/components/Button/ConnectWalletBtn"),
	{
		ssr: false,
		loading: () => (
			<Button className={styles.loaderBtn}>select wallet</Button>
		),
	}
);

export type HeaderLink = {
	href: string;
	text: string;
};

const SOCIALS: StaticImageData[] = [link1, link2, link3];

const LINKS: HeaderLink[] = [
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
];

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.ct}>
				<NextLink className={styles.logo} href={"/"}>
					<Image src={logo} alt="logo" />
					<span className={styles.logoText}>Logo+Name</span>
				</NextLink>
				<nav className={styles.nav}>
					{LINKS.map((link, i) => (
						<Link key={i} href={link.href}>
							{link.text}
						</Link>
					))}
					<div className={styles.links}>
						{SOCIALS.map((el, i) => (
							<NextLink href={"#"} key={i}>
								<Image src={el} alt="social-icon" />
							</NextLink>
						))}
					</div>
				</nav>
				<WalletBtn className={styles.connectBtn} />
				<MobileMenu />
			</div>
		</header>
	);
};
