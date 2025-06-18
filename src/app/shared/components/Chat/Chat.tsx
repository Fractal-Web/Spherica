"use client";

import React, { useEffect, useState } from "react";
import styles from "./Chat.module.scss";
import clsx from "clsx";
import useHandleUserInput, { AMOUNT } from "../../hooks/useHadlerUserInput";
import { Button } from "../Button/Button";
import { useAppSelector } from "@/app/integrations/redux";
import { AnimatePresence, motion } from "framer-motion";
import { UserMessage } from "./User-message/UserMessage";
import { AxioMessage } from "./Axiom-message/AxiomMessage";
import { useMediaQuery } from "usehooks-ts";
import { Loading } from "./Loading/Loading";
import {
	SPHERE,
	SPHERE_SAFARI,
	SPHERE_SAFARI_TYPE,
	SPHERE_TYPE,
} from "../VIdeo/Video";
import { isSafari, isIOS } from "react-device-detect";

const AMOUNTS: AMOUNT[] = ["$<100", "$100-$500", "$500-$1000", "$1000+"];

export const Chat = () => {
	const [moveSphere, setMoveSphere] = useState(false);
	const { onAddresChange, onSubmit, value, onAmountChange, amount } =
		useHandleUserInput({
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

	const src = isSafari || isIOS ? SPHERE_SAFARI : SPHERE;
	const type = isSafari || isIOS ? SPHERE_SAFARI_TYPE : SPHERE_TYPE;

	return (
		<div className={styles.chat}>
			<div className={styles.prices}>
				{AMOUNTS.map((el, i) => (
					<button
						className={styles.priceBtn}
						onClick={() => onAmountChange(el)}
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
											withMarginBotton={
												i + 1 < messages.length
													? messages[i + 1].type ===
													  "outcoming"
														? true
														: false
													: false
											}
										/>
									) : (
										<AxioMessage
											delay={i - 1}
											message={message}
											key={i}
										/>
									)
							  )
							: null}
						{isLoading && <Loading />}
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
						? // { transform: "translate(-180%,45%) scale(0.4)" }
						  {
								transform: "translate(-50%, -50%) scale(0.4)",
								left: "50px",
								top: "unset",
								bottom: "-15px",
						  }
						: {}
				}
				className={styles.video}
				autoPlay
				loop
				playsInline
				muted
			>
				<source src={src} type={type} />
			</motion.video>
			{!messages.length && !isLoading ? (
				<p className={styles.suggest}>Enter the address for auditing</p>
			) : null}
		</div>
	);
};
