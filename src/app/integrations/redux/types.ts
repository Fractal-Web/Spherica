import { UserTweet } from "@/app/shared/components/X-Scanner/types";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BaseMessage {}

export interface UserMessage extends BaseMessage {
	text: string;
	type: "incoming";
}

export interface AxiomMessage extends BaseMessage {
	text: {
		title: string;
		risk?: string;
		msg?: string;
		profit?: string;
		extraInfo?: {
			text: string;
			value: string;
		};
		compaundMsg?: {
			first: string;
			last: string;
			value: string;
		};
	};
	type: "outcoming";
}

export interface AppState {
	tweets: UserTweet[];
	currentPage: number;
	totalPages?: number;
	isWidgetActive: boolean;
	isLoading: boolean;
	withNotification: boolean;
	hasNewPost: boolean;
}

export type Message = UserMessage | AxiomMessage;

export interface AxiomChatState {
	messages: Message[];
	isLoading: boolean;
	isModalOpen: boolean;
}
