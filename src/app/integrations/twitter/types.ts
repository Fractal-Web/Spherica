export interface TwitterAccount {
	id: string;
	handle: string;
	name: string;
}

export interface ApiResponse {
	tweets: Tweets;
}

export interface Tweets {
	data: Tweet[];
	includes: Includes;
	meta: Meta;
}

export interface Tweet {
	created_at: string; // ISO date string
	id: string;
	edit_history_tweet_ids: string[];
	text: string;
	author_id: string;
	referenced_tweets?: ReferencedTweet[]; // optional, as not all tweets have this
	attachments?: Attachments; // optional, as not all tweets have media
}

export interface ReferencedTweet {
	type: "retweeted" | "replied_to" | "quoted";
	id: string;
}

export interface Attachments {
	media_keys: string[];
}

export interface Includes {
	users: User[];
	tweets?: TweetDetails[]; // optional, as not all include nested tweets
}

export interface User {
	id: string;
	name: string;
	username: string;
}

export interface TweetDetails {
	created_at: string; // ISO date string
	id: string;
	edit_history_tweet_ids: string[];
	text: string;
	author_id: string;
	referenced_tweets?: ReferencedTweet[];
	attachments?: Attachments;
}

export interface Meta {
	result_count: number;
	newest_id?: string;
	oldest_id?: string;
	next_token?: string;
}

export interface Post {
	id: string;
	name: string;
	username: string;
	description: string;
	media: string;
	created_at: string;
	q_name: string;
	q_username: string;
	q_description: string;
	q_media: string;
}
