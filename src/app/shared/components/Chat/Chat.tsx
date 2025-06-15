"use client";

import React, { useEffect, useState } from "react";
import styles from "./Chat.module.scss";
import clsx from "clsx";
import useHandleUserInput from "../../hooks/useHadlerUserInput";
import { Button } from "../Button/Button";
import { useAppSelector } from "@/app/integrations/redux";
import { AnimatePresence, motion } from "framer-motion";
import { UserMessage } from "./User-message/UserMessage";
import { AxioMessage } from "./Axiom-message/AxiomMessage";
import { useMediaQuery } from "usehooks-ts";

type AMOUNT = "$<100" | "$100-$500" | "$500-$1000" | "$1000+";

const AMOUNTS: AMOUNT[] = ["$<100", "$100-$500", "$500-$1000", "$1000+"];

export const Chat = () => {
	const [moveSphere, setMoveSphere] = useState(false);
	const [amount, setAmount] = useState<AMOUNT>("$<100");
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

	const isMobile = useMediaQuery("(max-width: 768px)");

	useEffect(() => {
		if (messages.length > 0 || isLoading) {
			setMoveSphere(true);
		}
	}, [messages, isLoading]);

	return (
		<div className={styles.chat}>
			<div className={styles.prices}>
				{AMOUNTS.map((el, i) => (
					<button
						className={styles.priceBtn}
						onClick={() => setAmount(el)}
						key={i}
					>
						<span
							className={clsx(
								styles.cirlceBig,
								amount === el && styles.active
							)}
						>
							{amount === el ? (
								<span className={styles.circleSmall} />
							) : null}
						</span>
						<span className={styles.text}>{el}</span>
					</button>
				))}
			</div>
			<div className={styles.msgWrapper}>
				<div className={styles.messages}>
					<AnimatePresence>
						{messages.length
							? messages.map((message, i) =>
									message.type === "incoming" ? (
										<UserMessage
											message={message.text}
											key={i}
										/>
									) : (
										<AxioMessage
											message={message.text}
											key={i}
										/>
									)
							  )
							: null}
					</AnimatePresence>
				</div>
			</div>
			<form onSubmit={onSubmit} className={styles.form}>
				<input
					value={value}
					type="text"
					required
					placeholder="Enter address"
					onChange={onAddresChange}
				/>
				<Button
					className={styles.btn}
					disabled={isLoading}
					type="submit"
				>
					start
				</Button>
			</form>
			<motion.video
				animate={
					!isMobile && moveSphere
						? { transform: "translate(-180%,45%) scale(0.4)" }
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
			{!messages.length && !isLoading ? (
				<p className={styles.suggest}>Enter the address for auditing</p>
			) : null}
		</div>
	);
};
