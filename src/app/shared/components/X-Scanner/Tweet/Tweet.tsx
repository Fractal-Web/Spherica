import React from "react";
import styles from "./Tweet.module.scss";
import Link from "next/link";
import { UserTweet } from "../types";
import { TweetCard } from "../Tweet-card/TweetCard";
import { motion } from "framer-motion";
import { FetchMoreTrigger } from "../Fetch-more-trigger/FetchMoreTrigger";

interface TweetProps extends UserTweet {
	isLast?: boolean;
}

export const Tweet = ({
	avatar,
	created_at,
	description,
	id,
	link,
	media,
	name,
	q_avatar,
	q_description,
	q_name,
	q_username,
	username,
	isLast,
}: TweetProps) => {
	const isQuotedTwitt = q_avatar && q_description && q_username && q_name;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: "linear", duration: 0.3 }}
			key={id}
			className={styles.ct}
		>
			<TweetCard
				avatar={avatar}
				name={name}
				description={description}
				username={username}
				created_at={created_at}
				media={!isQuotedTwitt ? media : undefined}
			/>
			{isQuotedTwitt && (
				<TweetCard
					isRetweet
					className={styles.quoted}
					avatar={q_avatar}
					name={q_name}
					description={q_description}
					username={q_username}
					created_at={created_at}
					media={media}
				/>
			)}
			<Link className={styles.tweetLink} target="_blank" href={link}>
				Read
			</Link>
			{isLast && <FetchMoreTrigger />}
		</motion.div>
	);
};
