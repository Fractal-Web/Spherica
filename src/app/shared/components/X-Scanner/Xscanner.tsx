"use client";

import React from "react";
import styles from "./Xscanner.module.scss";
import { Tweet } from "./Tweet/Tweet";
import clsx from "clsx";

import Loader from "../Loader/Loader";
import { MuteIcon, OnOffIcon, UnmuteIcon } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector, useStoreDispatch } from "@/app/integrations/redux";
import {
	selectIsLoading,
	selectIsMuted,
	selectIsWidgetActive,
	selectTweets,
} from "@/app/integrations/redux/selectors";
import {
	onStartWidget,
	onToggleNotification,
} from "@/app/integrations/redux/slice";

export const Xscanner = () => {
	const dispatch = useStoreDispatch();
	const tweets = useAppSelector(selectTweets);
	const isActive = useAppSelector(selectIsWidgetActive);
	const isLoading = useAppSelector(selectIsLoading);
	const isMuted = useAppSelector(selectIsMuted);

	const toggleActive = () => {
		dispatch(onStartWidget(!isActive));
	};

	const toggleMuted = () => {
		dispatch(onToggleNotification(!isMuted));
	};

	return (
		<div className={styles.ct}>
			<div className={styles.controls}>
				<span>X scanner</span>
				<div className={styles.btns}>
					<AnimatePresence>
						{isActive && (
							<motion.button
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={toggleMuted}
								className={clsx(
									styles.btn,
									isMuted && styles.btnActive
								)}
							>
								{!isMuted ? <MuteIcon /> : <UnmuteIcon />}
							</motion.button>
						)}
					</AnimatePresence>
					<button
						onClick={toggleActive}
						className={clsx(
							styles.btn,
							isActive && styles.btnActive
						)}
					>
						<OnOffIcon />
					</button>
				</div>
			</div>
			<div className={styles.ct2}>
				{isActive ? (
					<>
						{!isLoading ? (
							tweets.length ? (
								<>
									{tweets.map((tweet, i) => (
										<Tweet
											isLast={i === tweets.length - 1}
											{...tweet}
											key={i}
										/>
									))}
								</>
							) : (
								<div className={styles.messageHolder}>
									<span>No tweets found</span>
								</div>
							)
						) : (
							<div className={styles.messageHolder}>
								<Loader />
							</div>
						)}
					</>
				) : (
					<div className={styles.messageHolder}>
						<span>X scanner is turned off</span>
					</div>
				)}
			</div>
		</div>
	);
};
