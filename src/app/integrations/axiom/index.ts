/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axios from "axios";

const MAX_INDEX = 10000;
let index = 0;
let baseUrl = `https://api${index}.axiom.trade`;

const headers = {
	accept: "application/json, text/plain, */*",
	origin: "https://axiom.trade",
	referer: "https://axiom.trade/",
	cookie: "auth-refresh-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZyZXNoVG9rZW5JZCI6Ijc5NmU4NjcxLWU2N2EtNGViYi05MTQ1LTBiZDc2OGZhZWI1NyIsImlhdCI6MTc0NTc4NDk0OH0.Kio0DkEhbRjLAMQ-ZGDymJ5mu6wQA_9TTxqil01nYE4; auth-access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoZW50aWNhdGVkVXNlcklkIjoiYzAyNmNjMWEtMzhlZi00YmUzLThkMGEtZWE4NGZiNGFkMzY2IiwiaWF0IjoxNzQ5NTYzMDIyLCJleHAiOjE3NDk1NjM5ODJ9.g3L3nauQy44f5g602ZRzYxrA4bhF5IOBungcBBppsXA",
};

interface ProtocolDetails {
	baseToken: string;
}

export interface TokenResponseInfo {
	tokenName: string;
	tokenImage: string;
	tokenTicker: string;
	createdAt: string;
	pairAddress: string;
	tokenAddress: string;
	protocol: string;
	protocolDetails: ProtocolDetails;
	tokenDecimals: number;
	supply: number;
	liquiditySol: number;
	liquidityToken: number;
	marketCapSol: number;
	bondingCurvePercent: number;
	volumeSol: number;
	website: string;
	twitter: string;
	telegram: string | null;
	extra: any | null;
	dexPaid: boolean;
}

interface TokenInfo {
	tokenName: string;
	pairAddress: string;
	VolumeSol: number;
	LiquiditySol: number;
	LiquidityToken: number;
}

interface TokenHoldingsInfo {
	top10HoldersPercent: number;
	devHoldsPercent: number;
	snipersHoldPercent: number;
	insidersHoldPercent: number;
	bundlersHoldPercent: number;
	dexPaid: boolean;
	numHolders: number;
	numBotUsers: number;
	totalPairFeesPaid: number;
	numBluechipHolders?: number;
}

function formatPercent(value: number) {
	if (Math.abs(value) < 0.01) return "0%";
	return value.toFixed(2) + "%";
}

function formatInteger(value: number) {
	return Math.round(value).toString();
}

function formatDexPaid(value: boolean) {
	return value ? "Paid" : "Unpaid";
}

function formatTokenInfo(apiData: TokenHoldingsInfo) {
	return {
		top10HoldersPercent: formatPercent(apiData.top10HoldersPercent),
		devHoldsPercent: formatPercent(apiData.devHoldsPercent),
		snipersHoldPercent: formatPercent(apiData.snipersHoldPercent),
		insidersHoldPercent: formatPercent(apiData.insidersHoldPercent),
		bundlersHoldPercent: formatPercent(apiData.bundlersHoldPercent),
		numHolders: formatInteger(apiData.numHolders),
		numBotUsers: formatInteger(apiData.numBotUsers),
		dexPaid: formatDexPaid(apiData.dexPaid),
		numBluechipHolders: formatInteger(apiData.numBluechipHolders ?? 0),
	};
}

interface GetTokenReturnValue {
	tokenInfo?: TokenInfo;
	error?: any;
}

const getToken = async function getToken(
	contractAddress: string
): Promise<GetTokenReturnValue> {
	while (true) {
		try {
			const response = await axios.get(
				`${baseUrl}/search?searchQuery=${contractAddress}`,
				{ headers }
			);

			console.log(response);

			if (response.status === 200 && response.data.length > 0) {
				const {
					tokenName,
					pairAddress,
					volumeSol,
					liquiditySol,
					liquidityToken,
				} = response.data[0] as TokenResponseInfo;

				const VolumeSol = parseFloat(volumeSol.toFixed(4));
				const LiquiditySol = parseFloat(liquiditySol.toFixed(4));
				const LiquidityToken = parseFloat(liquidityToken.toFixed(4));

				return {
					tokenInfo: {
						tokenName,
						pairAddress,
						VolumeSol,
						LiquiditySol,
						LiquidityToken,
					},
				};
			}
		} catch (_) {
			console.log(_);
			console.log("Trying next API index... " + index);
			index++;
			baseUrl = `https://api${index}.axiom.trade`;
		}
		if (index > MAX_INDEX) {
			return {
				error: `Current attempt index: ${index}, maximum attempts: ${MAX_INDEX}`,
			};
		}
	}
};

interface PairInfo {
	top10HoldersPercent: string;
	devHoldsPercent: string;
	snipersHoldPercent: string;
	insidersHoldPercent: string;
	bundlersHoldPercent: string;
	numHolders: string;
	numBotUsers: string;
	dexPaid: string;
	numBluechipHolders: string;
}

interface ApiDataReturnValue {
	data?: PairInfo;
	error: any;
}

const apiData = async function getPairInfo(
	pairAddress: string
): Promise<ApiDataReturnValue> {
	while (true) {
		try {
			const response = await axios.get(
				`${baseUrl}/token-info?pairAddress=${pairAddress}`,
				{ headers }
			);
			if (response.status === 200) {
				const data = response.data as TokenHoldingsInfo;
				return {
					data: formatTokenInfo(data),
					error: null,
				};
			}
		} catch (_) {
			console.log("Trying next API index...");
			index++;
			baseUrl = `https://api${index}.axiom.trade`;
		}
		if (index > MAX_INDEX) {
			return {
				error: `Current attempt index: ${index}, maximum attempts: ${MAX_INDEX}`,
			};
		}
	}
};

export interface Token {
	tokenName: string;
	pairAddress: string;
	VolumeSol: number;
	LiquiditySol: number;
	LiquidityToken: number;

	top10HoldersPercent: string;
	devHoldsPercent: string;
	snipersHoldPercent: string;
	insidersHoldPercent: string;
	bundlersHoldPercent: string;

	numHolders: string;
	numBotUsers: string;

	dexPaid: string;

	numBluechipHolders?: string;
}

function formatAndLogTokenData(token: Token): string {
	return `
            Token Information:
            -------------------
            Token Name: ${token.tokenName}
            Pair Address: ${token.pairAddress}
            Volume (SOL): ${token.VolumeSol.toFixed(3)}
            Liquidity (SOL): ${token.LiquiditySol.toFixed(3)}
            Liquidity (Token): ${token.LiquidityToken.toFixed(3)}

            Holder Statistics:
            -------------------
            Top 10 Holders: ${token.top10HoldersPercent}
            Developer Holds: ${token.devHoldsPercent}
            Snipers Hold: ${token.snipersHoldPercent}
            Insiders Hold: ${token.insidersHoldPercent}
            Bundlers Hold: ${token.bundlersHoldPercent}
            Number of Holders: ${token.numHolders}
            Number of Bot Users: ${token.numBotUsers}

            Additional Information:
            ------------------------
            DEX Paid: ${token.dexPaid}
            Number of Bluechip Holders: ${token.numBluechipHolders}`;
}

export interface ParseInfoReturnValue {
	data?: string;
	error: string | null;
}

export async function parseInfo({
	address,
}: {
	address: string;
}): Promise<ParseInfoReturnValue> {
	const result: ParseInfoReturnValue = { data: undefined, error: null };

	try {
		const getTokenData = await getToken(address);

		if (getTokenData.tokenInfo && !getTokenData.error) {
			const token = getTokenData.tokenInfo;

			const tokenData = await apiData(token?.pairAddress);

			if (tokenData.data && !tokenData.error) {
				const mergedTokenData = { ...token, ...tokenData.data };
				const formatedData = formatAndLogTokenData(mergedTokenData);
				result.data = formatedData;
			} else {
				throw tokenData.error;
			}
		} else {
			throw getTokenData.error;
		}
	} catch (error) {
		console.error("Error:", error);
		result.error = "Oops, something went wrong";
	} finally {
		return result;
	}
}

//DitHyRMQiSDhn5cnKMJV2CDDt6sVct96YrECiM49pump
