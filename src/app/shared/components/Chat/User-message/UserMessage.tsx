import clsx from "clsx";
import styles from "./UserMessage.module.scss";
import { motion } from "framer-motion";

export const UserMessage = ({
	message,
	withMarginBotton,
}: {
	message: string;
	withMarginBotton?: boolean;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, delay: 0.3, ease: "linear" }}
			className={clsx(styles.message, withMarginBotton && styles.mb)}
		>
			{message}
		</motion.div>
	);
};
