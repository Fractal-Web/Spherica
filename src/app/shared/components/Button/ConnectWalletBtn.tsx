"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import clsx from "clsx";

import styles from "./ConnectWallet.module.scss";
const ConnectWalletButton = ({ className }: { className?: string }) => {
	return (
		<div className={clsx(styles.root, className)}>
			<WalletMultiButton className="connectButton" />
		</div>
	);
};

export default ConnectWalletButton;
