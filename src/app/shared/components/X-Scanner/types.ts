export interface UserTweet {
	avatar: string;
	created_at: string;
	description: string;
	id: number;
	link: string;
	media?: string;
	name: string;
	q_avatar?: string;
	q_description?: string;
	q_name?: string;
	q_username?: string;
	username: string;
}

type Account = {
	name: string;
	handle: string;
	postsCount: number;
	latestPost: string;
};

type Totals = {
	totalPosts: number;
	lastFetched: string;
};

export type ApiResponseTweetsOverall = {
	success: boolean;
	accounts: Account[];
	totals: Totals;
};
