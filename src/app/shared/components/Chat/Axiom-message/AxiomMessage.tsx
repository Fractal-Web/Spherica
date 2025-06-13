import styles from "./AxiomMessage.module.scss";
import { motion } from "framer-motion";

export const AxioMessage = ({ message }: { message: string }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, delay: 0.3, ease: "linear" }}
			className={styles.message}
		>
			<div className={styles.ct}>
				<div className={styles.ct2}>
					<p>{message}</p>
				</div>
			</div>
		</motion.div>
	);
};
