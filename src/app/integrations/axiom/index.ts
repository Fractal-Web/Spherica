import { AMOUNT } from "@/app/shared/hooks/useHadlerUserInput";
import { AxiomMessage } from "../redux/types";

type MsgType = AxiomMessage["text"];

function getClosestExponentOfTen(value: number) {
	const exponent = Math.log10(value);
	const lower = Math.floor(exponent);
	const upper = Math.ceil(exponent);

	const lowerPower = Math.pow(10, lower);
	const upperPower = Math.pow(10, upper);

	if (Math.abs(value - lowerPower) <= Math.abs(value - upperPower)) {
		return lower;
	} else {
		return upper;
	}
}

function formatUsd(value: number) {
	if (isNaN(value)) return "N/A";
	if (value >= 1_000_000) return `$${(value / 1_000_000)?.toFixed(1)}M`;
	if (value >= 1_000) return `$${(value / 1_000)?.toFixed(0)}K`;
	return `$${value?.toFixed(0)}`;
}

export const getTop10Holdersmsg = (top10holders: string): MsgType => {
	const holdersPercentage = parseFloat(top10holders.split("%")[0] ?? 0);

	let risk = "";
	let msg = "";

	if (holdersPercentage < 10) {
		risk = "Very Low Risk.";
		msg =
			"The project is decentralized. Risk of manipulation by big holders is very low. A good choice for long-term investment.";
	}

	if (holdersPercentage >= 10 && holdersPercentage < 16) {
		risk = "Low Risk.";
		msg =
			"The project is quite decentralized. Risks of manipulation are low, but price may change due to big holders activity";
	}

	if (holdersPercentage >= 16 && holdersPercentage < 26) {
		risk = "Medium Risk.";
		msg =
			"Moderate token concentration in the top 10%. Manipulation risks are possible but not critical.";
	}
	if (holdersPercentage >= 26 && holdersPercentage < 41) {
		risk = "High Risk!";
		msg =
			"A large share of tokens is held by a few. High risk of manipulation and sudden price moves.";
	}
	if (holdersPercentage >= 41) {
		risk = "Very High Risk!";
		msg =
			"Big holders can strongly influence the price. Investing is very risky.";
	}

	return {
		title: "10% Holders",
		msg: msg + `\n Holders: ${top10holders}`,
		risk,
	};
};

export const getNumberOfHolders = (
	marketCap: number,
	numOfHolders: string
): MsgType => {
	const holders = parseInt(numOfHolders);

	const DEFAULT_POW = 1.456;

	const exponent = getClosestExponentOfTen(marketCap);

	const powValue = DEFAULT_POW * exponent;

	const mc = Math.pow(10, powValue);

	const optimalHolders = 0.0000526 * mc;

	if (holders > optimalHolders)
		return {
			title: "Holders",
			msg: `Holder count meets or exceeds the expected level, reducing price volatility`,
			risk: "Very Low Risk.",
		};

	const oneProc = optimalHolders / 100;

	const result = holders / oneProc;

	if (result <= 10) {
		return {
			title: "Holders",
			msg: `Holder count is slightly below the expected level (~${result.toFixed(
				2
			)}%, ${holders}), but the market remains stable.`,
			risk: "Low Risk.",
		};
	}

	if (result <= 20) {
		return {
			title: "Holders",
			msg: `Decreased holder count (~${result.toFixed(
				2
			)}%, ${holders}) increases the chance of large holders influencing the price.`,
			risk: "Medium Risk",
		};
	}

	if (result <= 30) {
		return {
			title: "Holders",
			msg: `Low holder count (~${result.toFixed(
				2
			)}%, ${holders}) raises the risk of sharp price swings and manipulation."`,
			risk: "High Risk!",
		};
	}

	if (result >= 40) {
		return {
			title: "Holders",
			msg: `Significantly low holder count (<${result.toFixed(
				2
			)}%, ${holders}) poses a high risk of manipulation and strong volatility.`,
			risk: "Very High Risk!",
		};
	}

	return {
		title: "Holders",
		risk: "Unknow",
		msg: "No info",
	};
};

export const getBundlersHold = (bundlers: string) => {
	const bundlersPercentage = parseFloat(bundlers.split("%")[0] ?? 0);

	let risk = "";
	let msg = "";

	if (bundlersPercentage < 5) {
		risk = "Very Low Risk.";
		msg =
			"Token looks organic with no signs of automation, and dumping is highly unlikely.";
	}

	if (bundlersPercentage >= 5 && bundlersPercentage < 10) {
		risk = "Low Risk.";
		msg =
			"Some bot activity is present, but it poses minimal impact or dump risk";
	}

	if (bundlersPercentage >= 10 && bundlersPercentage < 15) {
		risk = "Medium Risk.";
		msg =
			"Early automated buys may affect pricing, with moderate chance of partial dumping.";
	}
	if (bundlersPercentage >= 15 && bundlersPercentage < 30) {
		risk = "High Risk!";
		msg =
			"Bundlers likely coordinated entry and may dump after price increases.";
	}
	if (bundlersPercentage >= 30) {
		risk = "Very High Risk!";
		msg =
			"Token is likely controlled by insiders or bots and a fast, heavy dump is highly probable.";
	}

	return {
		title: "Bundlers",
		msg: `Bundlers: ${bundlers} \n` + msg,
		risk,
	};
};

export const getSnipers = (snipersHold: string): MsgType => {
	const snipersPercentage = parseFloat(snipersHold.split("%")[0] ?? 0);

	let risk = "";
	let msg = "";

	if (snipersPercentage < 5) {
		risk = "Very Low Risk.";
		msg = "Sniper bots are barely present - fair and organic token launch.";
	}

	if (snipersPercentage >= 5 && snipersPercentage < 10) {
		risk = "Low Risk.";
		msg = "A few snipers entered early, but overall impact is low.";
	}

	if (snipersPercentage >= 10 && snipersPercentage < 15) {
		risk = "Medium Risk.";
		msg =
			"Snipers likely front-ran the launch and may dump quickly for profit.";
	}
	if (snipersPercentage >= 15 && snipersPercentage < 30) {
		risk = "High Risk!";
		msg =
			"High sniper presence suggests early manipulation and fast exits are likely.";
	}
	if (snipersPercentage >= 30) {
		risk = "Very High Risk!";
		msg =
			"Launch is dominated by sniper bots extreme risk of instant dump and price collapse.";
	}

	return {
		title: "Snipers",
		msg: `Snipers: ${snipersHold}g \n` + msg,
		risk,
	};
};

export const getDexscreener = (dexscreener: string): MsgType => {
	switch (dexscreener) {
		case "Paid": {
			return {
				title: "Dexscreener",
				risk: "Paid",
				msg: "The project invested in promotion on Dexscreener, indicating team activity.",
			};
		}
		case "Unpaid": {
			return {
				title: "Dexscreener",
				risk: "Not Paid",
				msg: "The project did not pay for promotion, which may suggest a low budget or less activity.",
			};
		}
		default:
			return {
				title: "Dexscreener",
				risk: "Unable do identify",
				msg: "",
			};
	}
};

export const getLiquidity = (
	marketCap: number,
	liquidityToken: string
): MsgType => {
	const lr = parseFloat(liquidityToken) / marketCap;

	let risk = "";
	let msg = "";

	if (lr < 0.05) {
		risk = "Very High Risk!";
		msg =
			"Liquidity is extremely low, with high chances of manipulation and sudden price swings..";
	}
	if (lr >= 0.05) {
		risk = "High Risk!";
		msg =
			"Liquidity is low, and prices can change sharply with small trades.";
	}
	if (lr >= 0.1) {
		risk = "Medium Risk.";
		msg =
			"Liquidity is acceptable, but market depth is limited, leading to moderate volatility.";
	}
	if (lr >= 0.2) {
		risk = "Low Risk.";
		msg = "Liquidity is good, with only minor price fluctuations possible.";
	}
	if (lr >= 0.3) {
		risk = "Very Low Risk.";
		msg =
			"Liquidity is high, the market is stable, and price movements are smooth.";
	}

	return {
		title: "Liquidity ",
		risk,
		msg: parseFloat(liquidityToken).toFixed(2) + " " + msg,
	};
};

export const getMarketCap = (mc: number, amount: AMOUNT): MsgType => {
	let risk = "";
	let profit = "";
	let msg = "";

	if (mc < 50000) {
		switch (amount) {
			case "$<100": {
				profit = "Very High";
				risk = "Very High";
				msg = "Project is at an early stage.";
				break;
			}
			case "$100-$500": {
				profit = "Very High";
				risk = "Very High";
				msg = "Project is at an early stage.";
				break;
			}
			case "$500-$1000": {
				profit = "Very High";
				risk = "Very High";
				msg =
					"Project is at an early stage. Invest in parts, it's safer and more flexible.";
				break;
			}
			case "$1000+": {
				profit = "Very High";
				risk = "Very High";
				msg =
					"Project is at an early stage. Invest in parts, it's safer and more flexible.";
				break;
			}
		}
	}

	if (mc >= 50000 && mc < 250000) {
		switch (amount) {
			case "$<100": {
				profit = "High";
				risk = "High";
				msg = "Project is small.";
				break;
			}
			case "$100-$500": {
				profit = "High";
				risk = "High";
				msg = "Project is small.";
				break;
			}
			case "$500-$1000": {
				profit = "Very High";
				risk = "High";
				msg = "High risk, the project is small.";
				break;
			}
			case "$1000+": {
				profit = "Very High";
				risk = "High";
				msg =
					"Project is small. Invest in parts, it's safer and more flexible.";
				break;
			}
		}
	}

	if (mc >= 250000 && mc < 1000000) {
		switch (amount) {
			case "$<100": {
				profit = "Low";
				risk = "Medium";
				msg = "Medium-sized project";
				break;
			}
			case "$100-$500": {
				profit = "Medium";
				risk = "Medium";
				msg = "Medium-sized project";
				break;
			}
			case "$500-$1000": {
				profit = "Medium";
				risk = "Medium";
				msg = "Medium-sized project";
				break;
			}
			case "$1000+": {
				profit = "High";
				risk = "Medium";
				msg = "Medium-sized project";
				break;
			}
		}
	}

	if (mc >= 1000000 && mc < 10000000) {
		switch (amount) {
			case "$<100": {
				profit = "Very Low";
				risk = "High";
				msg =
					"Large project. Be careful, small budgets are lost to fees and price swings.";
				break;
			}
			case "$100-$500": {
				profit = "Low";
				risk = "Medium";
				msg = "Large project.";
				break;
			}
			case "$500-$1000": {
				profit = "Medium";
				risk = "Medium";
				msg = "Large project.";
				break;
			}
			case "$1000+": {
				profit = "High";
				risk = "Low";
				msg = "Large project.";
				break;
			}
		}
	}

	if (mc >= 10000000) {
		switch (amount) {
			case "$<100": {
				profit = "Very Low";
				risk = "Very Low";
				msg =
					"Project with large market cap Be careful, small budgets are lost to fees and price swings.";
				break;
			}
			case "$100-$500": {
				profit = "Low";
				risk = "High";
				msg =
					"Project with large market cap Be careful, small budgets are lost to fees and price swings.";
				break;
			}
			case "$500-$1000": {
				profit = "Medium";
				risk = "Medium";
				msg = "Project with large market cap.";
				break;
			}
			case "$1000+": {
				profit = "High";
				risk = "Low";
				msg = "Project with large market cap.";
				break;
			}
		}
	}

	return {
		title: "Market cap",
		profit,
		risk,
		msg: msg + `\n Market cap: ${formatUsd(mc)}`,
	};
};
