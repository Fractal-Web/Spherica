import styles from "./UserMessage.module.scss";
import { motion } from "framer-motion";

export const UserMessage = ({ message }: { message: string }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, delay: 0.3, ease: "linear" }}
			className={styles.message}
		>
			{message}
		</motion.div>
	);
};
