import { RootState } from "..";

export const selectTweets = (state: RootState) => state.appReducer.tweets;
export const selectCurrentPage = (state: RootState) =>
	state.appReducer.currentPage;
export const selectTotalPages = (state: RootState) =>
	state.appReducer.totalPages;
export const selectIsLoading = (state: RootState) => state.appReducer.isLoading;
export const selectIsWidgetActive = (state: RootState) =>
	state.appReducer.isWidgetActive;
export const selectIsMuted = (state: RootState) =>
	state.appReducer.withNotification;
export const selectHasNewPost = (state: RootState) =>
	state.appReducer.hasNewPost;
