import { UserTweet } from "@/app/shared/components/X-Scanner/types";

export interface AppState {
	tweets: UserTweet[];
	currentPage: number;
	totalPages?: number;
	isWidgetActive: boolean;
	isLoading: boolean;
	withNotification: boolean;
	hasNewPost: boolean;
}

export interface Message {
	text: string;
	type: "incoming" | "outcoming";
}

export interface AxiomChatState {
	messages: Message[];
	isLoading: boolean;
	isModalOpen: boolean;
}
