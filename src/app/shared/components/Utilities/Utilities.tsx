import React from "react";
import styles from "./Utilities.module.scss";
import Image, { StaticImageData } from "next/image";
import img1 from "@/images/icons/icon-1.svg";
import img2 from "@/images/icons/icon-2.svg";
import img3 from "@/images/icons/icon-3.svg";
import img4 from "@/images/icons/icon-4.svg";
import img5 from "@/images/icons/Icon-5.svg";

const FACTS: { text: string; img: StaticImageData }[] = [
	{
		img: img1,
		text: "Finds risks you can't see",
	},
	{
		img: img2,
		text: "Key tweets delivering <1s",
	},
	{
		img: img3,
		text: "Spheria dosn’t guess. It prooves",
	},
	{
		img: img4,
		text: "Not a bot. A trading mind.",
	},
	{
		img: img5,
		text: "Deep audits. No blind moves",
	},
];

export const Utilities = () => {
	return (
		<div className={styles.ct}>
			<div className={styles.ct1}>
				<div className={styles.ct3}>
					<p className={styles.text1}>
						Fast <span className={styles.dot} /> Sharp{" "}
						<span className={styles.dot} /> Smart
					</p>
					<p className={styles.text2}>
						Spherica tracks, scans, and thinks giving you the
						advantage when every second matters
					</p>
				</div>
			</div>
			<div className={styles.ct2}>
				<div className={styles.border} />
			</div>
			<div className={styles.ct4}>
				<h2 className={styles.title}>utility</h2>
			</div>
			<div className={styles.ct2}>
				<div className={styles.border} />
			</div>
			{/* <div className={styles.ct2}>
				<div className={styles.border} />
			</div>
			<div className={styles.ct1}>TEST</div>
			<div className={styles.ct2}>
				<div className={styles.border} />
			</div>
			<div className={styles.ct1}>TEST</div>
			<div className={styles.ct2}>
				<div className={styles.border} />
			</div> */}
			{FACTS.map((fact, i) => (
				<React.Fragment key={i}>
					<div className={styles.ct6}>
						<div className={styles.ct5}>
							<span>{"#fact " + (i + 1)}</span>
							<Image src={fact.img} alt={"icon" + i} />
							<p>{fact.text}</p>
						</div>
					</div>
					<div className={styles.ct2}>
						<div className={styles.border} />
					</div>
				</React.Fragment>
			))}
		</div>
	);
};
