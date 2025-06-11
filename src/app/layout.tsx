import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { SolanaProvider } from "./integrations/solana-wallet/WalletProvider";
import { LenisProvder } from "./integrations/lenis/LenisProvder";
import { ReduxProvider } from "./integrations/redux/ReduxProvider";

const monteserrat = Montserrat({
	variable: "--font-mont",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Spherica",
	description: "Spherica",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${monteserrat.variable}`}>
				<LenisProvder>
					<SolanaProvider>
						<ReduxProvider>
							<Header />
							{children}
						</ReduxProvider>
					</SolanaProvider>
				</LenisProvder>
			</body>
		</html>
	);
}
