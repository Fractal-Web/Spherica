import {
	getBundlersHold,
	getDexscreener,
	getLiquidity,
	getMarketCap,
	getNumberOfHolders,
	// getMarketCap,
	// getNumberOfHolders,
	getSnipers,
	getTop10Holdersmsg,
} from "@/app/integrations/axiom";
import { useStoreDispatch } from "@/app/integrations/redux";
import { onNewMessageRecived } from "@/app/integrations/redux/axiom-slice";
import { AxiomMessage } from "@/app/integrations/redux/types";
import { useState } from "react";

interface UseHandleUserInputReturnValue {
	onAddresChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	onAmountChange: (amount: AMOUNT) => void;
	amount: AMOUNT;
}

interface Props {
	options?: {
		callback?: () => void;
	};
}

// type ApiResponse = {
// 	data: {
// 		data: {
// 			tokenName: string;
// 			pairAddress: string;
// 			liquiditySol: string;
// 			liquidityToken: string;
// 			top10holders: string;
// 			developerHolds: string;
// 			snipersHold: string;
// 			insidersHold: string;
// 			bundlersHold: string;
// 			numOfHolders: string;
// 			numOfBotUsers: string;
// 			dexPaid: string;
// 			marketCapSol: number;
// 			numOfBluechipHolders: string; // Note: contains 'NaN' as a string
// 		};
// 	};
// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// 	error: any; // or null, depending on your API
// };

export type AMOUNT = "$<100" | "$100-$500" | "$500-$1000" | "$1000+";

export default function useHandleUserInput({
	options,
}: Props): UseHandleUserInputReturnValue {
	const [address, setAddress] = useState("");
	const [amount, setAmount] = useState<AMOUNT>("$<100");

	const dispatch = useStoreDispatch();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		options?.callback?.();
		setAddress("");
		dispatch(
			onNewMessageRecived({
				isLoading: true,
				message: { text: address, type: "incoming" },
				toggleModal: true,
			})
		);

		try {
			const resp = await fetch(
				"http://157.180.34.119:5523/backend/axiom",
				{
					method: "POST",
					body: JSON.stringify({ address }),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const { data, error } = await resp.json();

			if (data.data && !error) {
				const mc = data.data.marketCapUsdt;

				const marketCap = getMarketCap(mc, amount);
				const numberOfHolders = getNumberOfHolders(
					mc,
					data.data.numOfHolders
				);

				const top10Holders = getTop10Holdersmsg(data.data.top10holders);
				const liquidity = getLiquidity(mc, data.data.LiquidityUsdt);
				const bundlers = getBundlersHold(data.data.bundlersHold);
				const snipers = getSnipers(data.data.snipersHold);
				const dexp = getDexscreener(data.data.dexPaid);

				const tokneProps: AxiomMessage["text"][] = [
					marketCap,
					top10Holders,
					numberOfHolders,
					liquidity,
					bundlers,
					snipers,
					dexp,
				];

				for (let i = 0; i < tokneProps.length; ++i) {
					dispatch(
						onNewMessageRecived({
							isLoading: false,
							message: {
								text: {
									...tokneProps[i],
									title: `${i + 1}. ` + tokneProps[i].title,
								},
								type: "outcoming",
							},
						})
					);
				}
			} else {
				dispatch(
					onNewMessageRecived({
						isLoading: false,
						message: {
							text: {
								msg: error,
								title: "Error",
							},
							type: "outcoming",
						},
					})
				);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			dispatch(
				onNewMessageRecived({
					isLoading: false,
					message: {
						text: {
							msg: err?.message ?? "Something went wrong",
							title: "Error",
						},
						type: "outcoming",
					},
				})
			);
		}
	};

	const onAddresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
	};

	const onAmountChange = (amount: AMOUNT) => {
		setAmount(amount);
	};

	return {
		value: address,
		onSubmit,
		onAddresChange,
		onAmountChange,
		amount,
	};
}
