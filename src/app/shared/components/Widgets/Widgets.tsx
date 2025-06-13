import React from "react";
import styles from "./Widgets.module.scss";

export const Widgets = () => {
	return (
		<div className={styles.ct}>
			<div className={styles.ct2}>
				<div className={styles.ct3}>
					<CrossIcon />
					<span className={styles.text}>Add widget</span>
				</div>
				<Lock />
			</div>
			<div className={styles.ct2}>
				<div className={styles.ct3}>
					<CrossIcon />
					<span className={styles.text}>Add widget</span>
				</div>
				<Lock />
			</div>
		</div>
	);
};

const CrossIcon = () => (
	<svg
		width="24"
		height="25"
		viewBox="0 0 24 25"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M23 11.5H13V1.49998C13 0.947703 12.5523 0.5 12 0.5C11.4477 0.5 11 0.947703 11 1.49998V11.5H0.999984C0.447703 11.5 0 11.9477 0 12.5C0 13.0523 0.447703 13.5 0.999984 13.5H11V23.5C11 24.0522 11.4477 24.5 12 24.5C12.5522 24.5 12.9999 24.0522 12.9999 23.5V13.5H22.9999C23.5522 13.5 23.9999 13.0523 23.9999 12.5C24 11.9477 23.5523 11.5 23 11.5Z"
			fill="white"
			fillOpacity="0.3"
		/>
	</svg>
);

const Lock = () => (
	<svg
		className={styles.lock}
		width="113"
		height="124"
		viewBox="0 0 113 124"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M105.957 27.299V18.4582C105.957 -5.54299 86.5008 -25 62.4993 -25C38.4977 -25 19.041 -5.54299 19.041 18.4582V27.299C7.74204 32.2303 0.432312 43.3802 0.416016 55.7082V92.9582C0.436387 110.094 14.3222 123.98 31.4575 124H93.5407C110.676 123.98 124.562 110.094 124.582 92.9582V55.7082C124.566 43.3802 117.256 32.2303 105.957 27.299ZM68.7075 80.5418C68.7075 83.9705 65.928 86.75 62.4993 86.75C59.0705 86.75 56.291 83.9705 56.291 80.5418V68.125C56.291 64.6963 59.0705 61.9168 62.4993 61.9168C65.928 61.9168 68.7075 64.6963 68.7075 68.125V80.5418ZM93.541 24.6668H31.4575V18.4585C31.4575 1.3148 45.3552 -12.5832 62.4993 -12.5832C79.6433 -12.5832 93.541 1.31451 93.541 18.4585V24.6668Z"
			fill="white"
			fill-opacity="0.05"
		/>
	</svg>
);
