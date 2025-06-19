"use client";
import React, { useState } from "react";
import styles from "./TweetCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { formatDateToShort } from "@/app/shared/utils";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

interface TweetCardProps {
	avatar: string;
	media?: string;
	name: string;
	description: string;
	username: string;
	created_at: string;
	className?: string;
	isRetweet?: boolean;
	isNew?: boolean;
}

export const TweetCard = ({
	avatar,
	description,
	name,
	username,
	media,
	created_at,
	className,
	isRetweet,
	isNew,
}: TweetCardProps) => {
	const formatedUsername =
		username.length > 12 ? username.slice(0, 9) + "..." : username;

	const [wasHovered, setWasHovered] = useState(false);

	const onHoverNew = () => {
		setWasHovered(true);
	};

	return (
		<div onMouseOver={onHoverNew} className={clsx(styles.tweet, className)}>
			<div className={styles.ct}>
				{avatar && (
					<Image
						className={styles.avatar}
						src={avatar}
						width={40}
						height={40}
						alt="profile-img"
					/>
				)}
				<div className={styles.ct2}>
					<div className={styles.ct3}>
						<div className={styles.ct6}>
							<span>{name}</span>
							<AnimatePresence>
								{isNew && !wasHovered && (
									<motion.span
										initial={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{
											ease: "linear",
											duration: 0.3,
										}}
										className={styles.new}
									>
										new
									</motion.span>
								)}
							</AnimatePresence>
						</div>
						<div className={styles.ct4}>
							<Link
								target="_blank"
								href={`https://x.com/${username}`}
								className={styles.dark}
							>
								{isRetweet
									? formatedUsername
									: "@" + formatedUsername}
							</Link>
							<span className={styles.dark}>
								{formatDateToShort(created_at)}
							</span>
						</div>
					</div>
					<div className={styles.ct5}>
						<p className={styles.descr}>{description}</p>
						{media && (
							<Image
								src={media}
								className={styles.media}
								width={236}
								height={236}
								alt="media-attached-to-the tweet"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
