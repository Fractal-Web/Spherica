// import { ParseInfoReturnValue } from "@/app/integrations/axiom";
import { useStoreDispatch } from "@/app/integrations/redux";
import {
	onNewMessageRecived,
	// onToggleLoading,
} from "@/app/integrations/redux/axiom-slice";
import { useState } from "react";

interface UseHandleUserInputReturnValue {
	onAddresChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

interface Props {
	options?: {
		callback?: () => void;
	};
}

export default function useHandleUserInput({
	options,
}: Props): UseHandleUserInputReturnValue {
	const [address, setAddress] = useState("");
	const dispatch = useStoreDispatch();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		options?.callback?.();
		setAddress("");
		dispatch(
			onNewMessageRecived({
				isLoading: false,
				message: { text: address, type: "incoming" },
				toggleModal: true,
			})
		);

		setTimeout(() => {
			for (let i = 0; i < 5; ++i) {
				dispatch(
					onNewMessageRecived({
						isLoading: false,
						message: {
							text: "Token is likely controlled by insiders or bots and a fast, heavy dump is highly probable. Token is likely controlled by insiders or bots and a fast, heavy dump is highly probable.",
							type: "outcoming",
						},
						toggleModal: true,
					})
				);
			}
		}, 5000);

		// const resp = await fetch("/api/axiom", {
		// 	method: "POST",
		// 	body: JSON.stringify({ address }),
		// });

		// const { error, data } = (await resp.json()) as ParseInfoReturnValue;

		// if (data && !error) {
		// 	dispatch(
		// 		onNewMessageRecived({
		// 			isLoading: false,
		// 			message: { text: data, type: "outcoming" },
		// 			toggleModal: false,
		// 		})
		// 	);
		// } else {
		// 	if (error) {
		// 		console.log(error);
		// 		dispatch(
		// 			onNewMessageRecived({
		// 				isLoading: false,
		// 				message: { text: error, type: "outcoming" },
		// 				toggleModal: false,
		// 			})
		// 		);
		// 	} else {
		// 		dispatch(onToggleLoading(false));
		// 	}
		// }
	};

	const onAddresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
	};

	return {
		value: address,
		onSubmit,
		onAddresChange,
	};
}
