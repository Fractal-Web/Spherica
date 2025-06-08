import React from "react";
import styles from "./Loader.module.scss";

const Loader = () => (
	<div className={styles.spinner}>
		<div className={styles.spinnerInner} />
	</div>
);

export default Loader;
