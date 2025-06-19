import styles from "./AxiomMessage.module.scss";
import { motion } from "framer-motion";
import { AxiomMessage } from "@/app/integrations/redux/types";
import clsx from "clsx";

export const AxioMessage = ({
	message,
	delay,
}: {
	message: AxiomMessage;
	delay: number;
}) => {
	let color = "default";
	let colorProfit = "default";

	if (message.text.risk) {
		if (message.text.risk === "Medium") {
			color = "medium";
		}
		if (message.text.risk.includes("Low")) {
			color = "low";
		}
		if (message.text.risk.includes("High")) {
			color = "high";
		}
	}

	if (message.text.profit) {
		if (message.text.profit === "Medium") {
			colorProfit = "medium";
		}
		if (message.text.profit.includes("Low")) {
			colorProfit = "low";
		}
		if (message.text.profit.includes("High")) {
			colorProfit = "high";
		}
	}

	let isSpec = false;

	if (message.text.profit) {
		isSpec = true;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.3,
				delay: 0.3 + 0.1 * delay,
				ease: "linear",
			}}
			className={styles.message}
		>
			<div className={styles.ct}>
				<div className={styles.ct2}>
					{isSpec ? (
						<div className={styles.ct3}>
							<p className={styles.title}>{message.text.title}</p>

							<div className={styles.ct4}>
								<p className={styles.textW}>
									Potential profit:
								</p>
								<p
									className={clsx(
										styles.risk,
										styles[colorProfit]
									)}
								>
									{message.text.profit}
								</p>
							</div>
							<div className={styles.ct4}>
								<p className={styles.textW}>Risk of loss:</p>
								<p className={clsx(styles.risk, styles[color])}>
									{message.text.risk}
								</p>
							</div>
							{message.text.msg && (
								<p className={styles.msg}>{message.text.msg}</p>
							)}
							{message.text.extraInfo && (
								<div className={styles.ct4}>
									<p className={styles.textW}>
										{message.text.extraInfo.text}
									</p>
									<p className={styles.value}>
										{message.text.extraInfo.value}
									</p>
								</div>
							)}
						</div>
					) : (
						<div className={styles.ct3}>
							<p className={styles.title}>{message.text.title}</p>
							{message.text.risk && (
								<p className={clsx(styles.risk, styles[color])}>
									{message.text.risk}
								</p>
							)}
							{message.text.msg && (
								<p className={styles.msg}>{message.text.msg}</p>
							)}
							{message.text.compaundMsg && (
								<p className={styles.msg}>
									<span>
										{message.text.compaundMsg.first}
									</span>
									<span
										style={{ padding: 0 }}
										className={styles.value}
									>
										{message.text.compaundMsg.value}
									</span>
									<span>{message.text.compaundMsg.last}</span>
								</p>
							)}
							{message.text.extraInfo && (
								<div className={styles.ct4}>
									<p className={styles.textW}>
										{message.text.extraInfo.text}
									</p>
									<p className={styles.value}>
										{message.text.extraInfo.value}
									</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};
