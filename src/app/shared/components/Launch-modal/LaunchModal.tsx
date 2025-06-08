"use client";

import React, { useEffect } from "react";
import {
	motion,
	useAnimate,
	usePresence,
	ValueAnimationTransition,
} from "framer-motion";
import useDisableScroll from "../../hooks/useDisabbleScroll";
import { createPortal } from "react-dom";
import styles from "./LaunchModal.module.scss";
import { Xscanner } from "@/components/X-Scanner/Xscanner";
import { Chat } from "@/components/Chat/Chat";

interface LaunchModalProps {
	onClose: () => void;
}

const TRANSITION_SETUP: ValueAnimationTransition = {
	bounce: 0,
	ease: "easeOut",
	duration: 0.4,
};

export const LaunchModal = ({ onClose }: LaunchModalProps) => {
	useDisableScroll();
	const [isPresent, safeToRemove] = usePresence();
	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (isPresent) {
			const enterAnimation = async () => {
				await animate(scope.current, { opacity: 1 }, TRANSITION_SETUP);
				await animate("#content", { y: 0 }, TRANSITION_SETUP);
				await animate(
					"#close-btn",
					{ opacity: 1 },
					{ ...TRANSITION_SETUP, delay: 0.15 }
				);
			};
			enterAnimation();
		} else {
			const exitAnimation = async () => {
				await animate("#close-btn", { opacity: 0 }, TRANSITION_SETUP);
				await animate("#content", { y: "101%" }, TRANSITION_SETUP);
				await animate(scope.current, { opacity: 0 }, TRANSITION_SETUP);
				safeToRemove();
			};

			exitAnimation();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPresent]);

	return createPortal(
		<motion.div
			ref={scope}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className={styles.modalBg}
		>
			<div className={styles.modalContent}>
				<motion.button
					id="close-btn"
					initial={{ opacity: 0 }}
					className={styles.btn}
					onClick={onClose}
				>
					<CloseModalIcon />
					<span>Close</span>
				</motion.button>

				<motion.div
					id="content"
					initial={{ y: "101%" }}
					className={styles.content}
				>
					<div className={styles.ct}>
						<Xscanner />
						<Chat />
						{/* <Xscanner /> */}
					</div>
				</motion.div>
			</div>
		</motion.div>,
		document.body
	);
};

const CloseModalIcon = () => (
	<svg
		width="12"
		height="13"
		viewBox="0 0 12 13"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clipPath="url(#clip0_722_2791)">
			<path
				d="M11.8534 0.646393C11.7596 0.552658 11.6325 0.5 11.4999 0.5C11.3673 0.5 11.2402 0.552658 11.1464 0.646393L5.99989 5.79289L0.853393 0.646393C0.759629 0.552658 0.632475 0.5 0.499893 0.5C0.367311 0.5 0.240157 0.552658 0.146393 0.646393C0.0526577 0.740157 0 0.867311 0 0.999893C0 1.13248 0.0526577 1.25963 0.146393 1.35339L5.29289 6.49989L0.146393 11.6464C0.0526577 11.7402 0 11.8673 0 11.9999C0 12.1325 0.0526577 12.2596 0.146393 12.3534C0.240157 12.4471 0.367311 12.4998 0.499893 12.4998C0.632475 12.4998 0.759629 12.4471 0.853393 12.3534L5.99989 7.20689L11.1464 12.3534C11.2402 12.4471 11.3673 12.4998 11.4999 12.4998C11.6325 12.4998 11.7596 12.4471 11.8534 12.3534C11.9471 12.2596 11.9998 12.1325 11.9998 11.9999C11.9998 11.8673 11.9471 11.7402 11.8534 11.6464L6.70689 6.49989L11.8534 1.35339C11.9471 1.25963 11.9998 1.13248 11.9998 0.999893C11.9998 0.867311 11.9471 0.740157 11.8534 0.646393Z"
				fill="white"
				fillOpacity="0.6"
			/>
		</g>
		<defs>
			<clipPath id="clip0_722_2791">
				<rect
					width="12"
					height="12"
					fill="white"
					transform="translate(0 0.5)"
				/>
			</clipPath>
		</defs>
	</svg>
);
