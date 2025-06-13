import { createSlice } from "@reduxjs/toolkit";
import { AxiomChatState, Message } from "./types";

const initialState: AxiomChatState = {
	messages: [],
	isLoading: false,
	isModalOpen: false,
};

const axiomChatSlice = createSlice({
	name: "axiom-chat-slice",
	initialState: initialState,
	reducers: {
		// onNewMessageRecived: (state, { payload }: { payload: Message }) => {
		// 	state.messages.push(payload);
		// },
		onToggleLoading: (state, { payload }: { payload: boolean }) => {
			state.isLoading = payload;
		},
		onToggleModal: (state, { payload }: { payload: boolean }) => {
			state.isModalOpen = payload;
		},
		onNewMessageRecived: (
			state,
			{
				payload,
			}: {
				payload: {
					isLoading: boolean;
					message: Message;
					toggleModal?: boolean;
				};
			}
		) => {
			state.isLoading = payload.isLoading;
			state.messages.push(payload.message);
			if (payload.toggleModal) {
				state.isModalOpen = payload.toggleModal;
			}
		},
	},
});

export const { onNewMessageRecived, onToggleLoading, onToggleModal } =
	axiomChatSlice.actions;

export default axiomChatSlice.reducer;
