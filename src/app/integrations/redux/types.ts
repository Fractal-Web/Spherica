import { UserTweet } from "@/app/shared/components/X-Scanner/types";

export interface AppState {
	tweets: UserTweet[];
	currentPage: number;
	totalPages?: number;
	isWidgetActive: boolean;
	isLoading: boolean;
}
