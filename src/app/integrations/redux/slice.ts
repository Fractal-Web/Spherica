import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./types";
import { UserTweet } from "@/app/shared/components/X-Scanner/types";

const initialState: AppState = {
	tweets: [],
	currentPage: 1,
	isLoading: false,
	isWidgetActive: false,
	withNotification: false,
	hasNewPost: false,
};

const appSlice = createSlice({
	name: "twiiter-slice",
	initialState: initialState,
	reducers: {
		onUpdateTweets: (state, { payload }: { payload: UserTweet[] }) => {
			state.tweets = payload;
		},
		onLoading: (state, { payload }: { payload: boolean }) => {
			state.isLoading = payload;
		},
		onPageChange: (state, { payload }: { payload: number }) => {
			state.currentPage = payload;
		},
		onStartWidget: (state, { payload }: { payload: boolean }) => {
			state.isWidgetActive = payload;
		},
		onTotalPagesChange: (
			state,
			{ payload }: { payload: number | undefined }
		) => {
			state.totalPages = payload;
		},
		onToggleNotification: (state, { payload }: { payload: boolean }) => {
			state.withNotification = payload;
		},
		onToggleHasNewPost: (state, { payload }: { payload: boolean }) => {
			state.hasNewPost = payload;
		},
	},
});

export const actions = appSlice.actions;

export const {
	onLoading,
	onPageChange,
	onStartWidget,
	onUpdateTweets,
	onTotalPagesChange,
	onToggleNotification,
	onToggleHasNewPost,
} = appSlice.actions;

export default appSlice.reducer;
