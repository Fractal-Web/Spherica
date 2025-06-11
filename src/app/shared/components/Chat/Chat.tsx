"use client";

import React, { useState } from "react";
import styles from "./Chat.module.scss";
import { Message } from "@/app/integrations/redux/types";
import clsx from "clsx";
import useHandleUserInput from "../../hooks/useHadlerUserInput";
import { Button } from "../Button/Button";
import { useAppSelector } from "@/app/integrations/redux";
import { AnimatePresence, motion } from "framer-motion";

export const Chat = () => {
	const [moveSphere, setMoveSphere] = useState(false);
	const { onAddresChange, onSubmit, value } = useHandleUserInput({
		options: {
			callback: () => {
				setMoveSphere(true);
			},
		},
	});
	const { isLoading, messages } = useAppSelector(
		(state) => state.axiomChatReducer
	);
	return (
		<div className={styles.chat}>
			<div className={styles.messages}>
				<AnimatePresence>
					{messages.length
						? messages.map((message, i) => (
								<MessageItem message={message} key={i} />
						  ))
						: null}
				</AnimatePresence>
			</div>
			<form onSubmit={onSubmit} className={styles.form}>
				<input
					value={value}
					type="text"
					required
					placeholder="Enter code"
					onChange={onAddresChange}
				/>
				<Button disabled={isLoading} type="submit">
					start
				</Button>
			</form>
			<motion.video
				animate={
					moveSphere
						? { transform: "translate(50%,-160%) scale(0.4)" }
						: {}
				}
				className={styles.video}
				autoPlay
				loop
				playsInline
				muted
			>
				<source
					src={"/assets/videos/sphere.webm"}
					type={"video/webm"}
				/>
			</motion.video>
		</div>
	);
};

const MessageItem = ({ message }: { message: Message }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, delay: 0.3, ease: "linear" }}
			className={clsx(styles.message, styles[message.type])}
		>
			{message.text}
		</motion.div>
	);
};
