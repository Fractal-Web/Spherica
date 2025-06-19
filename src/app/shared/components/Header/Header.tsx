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

const SOCIALS: { src: StaticImageData; href: string }[] = [
	{ src: link1, href: "https://x.com/spherica_labs" },
	{ src: link2, href: "mailto:contact@spherica.io" },
	{ src: link3, href: "https://t.me/sphericachannel" },
];

const LINKS: HeaderLink[] = [
	{
		href: "#roadmap",
		text: "roadmap",
	},
	{
		href: "https://github.com/Fractal-Web/Spherica",
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
				</nav>

				<WalletBtn className={styles.connectBtn} />

				<div className={styles.links}>
					{SOCIALS.map((el, i) => (
						<NextLink
							target={i == 1 ? "_self" : "_blank"}
							href={el.href}
							key={i}
						>
							<Image src={el.src} alt="social-icon" />
						</NextLink>
					))}
				</div>
				<MobileMenu />
			</div>
		</header>
	);
};
