"use client";

import React from "react";
import styles from "./Header.module.scss";
import { Link } from "@/components/Link/Link";
import NextLink from "next/link";
import Image from "next/image";
import logo from "@/images/icons/logo.svg";
import { MobileMenu } from "../Mobile-menu/MobileMenu";
import dynamic from "next/dynamic";

const WalletBtn = dynamic(
	() => import("@/components/Button/ConnectWalletBtn"),
	{ ssr: false }
);

export type HeaderLink = {
	href: string;
	text: string;
};

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
				</NextLink>
				<nav className={styles.nav}>
					{LINKS.map((link, i) => (
						<Link key={i} href={link.href}>
							{link.text}
						</Link>
					))}
				</nav>
				<WalletBtn className={styles.connectBtn} />
				<MobileMenu />
			</div>
		</header>
	);
};
