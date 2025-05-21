"use client";

import React, { useEffect, useState } from "react";
import styles from "./MobileMenu.module.scss";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useMediaQuery } from "usehooks-ts";

const MenuModal = dynamic(() => import("@/components/Menu-modal/Menu-modal"), {
	ssr: false,
});

export const MobileMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const isMobile = useMediaQuery("(max-width: 768px)");

	const toggleMenu = () => {
		setIsOpen((open) => !open);
	};

	useEffect(() => {
		if (!isMobile && isOpen) {
			setIsOpen(false);
		}
	}, [isMobile, isOpen]);

	return (
		<>
			<button onClick={toggleMenu} className={styles.btn}>
				{isOpen ? <IconClose /> : <IconOpen />}
			</button>
			<AnimatePresence>{isOpen && <MenuModal />}</AnimatePresence>
		</>
	);
};

const IconOpen = () => (
	<svg
		width="40"
		height="40"
		viewBox="0 0 40 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect
			width="12"
			height="1"
			rx="0.5"
			transform="matrix(1 0 0 -1 18 27)"
			fill="#D9D9D9"
		/>
		<rect
			width="17"
			height="1"
			rx="0.5"
			transform="matrix(1 0 0 -1 13 21)"
			fill="#D9D9D9"
		/>
		<rect
			width="20"
			height="1"
			rx="0.5"
			transform="matrix(1 0 0 -1 10 15)"
			fill="#D9D9D9"
		/>
	</svg>
);

const IconClose = () => (
	<svg
		width="40"
		height="40"
		viewBox="0 0 40 40"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect
			width="26.9949"
			height="1"
			rx="0.5"
			transform="matrix(0.703242 0.710951 0.710951 -0.703242 10 10.7032)"
			fill="#D9D9D9"
		/>
		<rect
			width="27.1093"
			height="1"
			rx="0.5"
			transform="matrix(0.71546 -0.698654 -0.698654 -0.71546 10.9795 29.6555)"
			fill="#D9D9D9"
		/>
	</svg>
);
