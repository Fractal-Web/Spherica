/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { TwitterAccount } from "./types";
import axios from "axios";

interface FetchTweetsProps {
	account: TwitterAccount;
	token: `Bearer ${string}`;
}

export const fetchTweets = async ({ account, token }: FetchTweetsProps) => {
	const endpoint = `users/${account.id}/tweets`;

	const isLimited = await isRateLimited({ endpoint });

	// Check if we're rate limited
	if (isLimited) {
		const waitTime = await getWaitTimeMs({ endpoint });
		console.log(
			`Rate limited for ${account.handle}. Waiting ${
				waitTime / 1000
			} seconds until reset.`
		);
		// Option: wait and retry, or queue for later processing
		return { rateLimited: true, waitTime };
	}

	try {
		const response = await axios.get(
			`https://api.twitter.com/2/${endpoint}`,
			{
				headers: {
					Authorization: token,
				},

				params: {
					max_results: 5,
					"tweet.fields": "created_at,referenced_tweets,attachments",
					"media.fields": "url,preview_image_url",
					"user.fields": "name,username",
					expansions:
						"attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id",
				},
			}
		);

		// Update rate limit info from response headers
		await setRateLimit({ endpoint, headers: response.headers });

		return response.data;
	} catch (err: any) {
		if (err.response) {
			// Update rate limit info from error response headers
			if (err.response.headers) {
				await setRateLimit({ endpoint, headers: err.response.headers });
			}

			if (err.response.status === 429) {
				const resetTime = err.response.headers["x-rate-limit-reset"];
				const now = Math.floor(Date.now() / 1000);
				const waitSeconds = Math.max(0, resetTime - now);
				console.log(
					`Rate limited for ${account.handle}. Reset in ${waitSeconds} seconds.`
				);
				return { rateLimited: true, waitTime: waitSeconds * 1000 };
			}
		}

		console.error(`Error fetching tweets for ${account.handle}:`, err);
		return null;
	}
};

interface RateLimitCookieValue {
	limit: number;
	remaining: number;
	reset: number;
	lastUpdated: number;
}

interface CookieInfo {
	endpoints: {
		[key: string]: RateLimitCookieValue;
	};
}

const setRateLimit = async ({
	endpoint,
	headers,
}: {
	endpoint: string;
	headers: any;
}): Promise<void> => {
	const cookie = await cookies();

	let prevInfo: CookieInfo | undefined;
	let prevEndpointInfo: RateLimitCookieValue | undefined;

	const cookieEndpointsString = cookie.get("endpoints")?.value;

	if (cookieEndpointsString) {
		prevInfo = JSON.parse(cookieEndpointsString) as CookieInfo;
		prevEndpointInfo = prevInfo?.endpoints[endpoint];
	}

	const info: RateLimitCookieValue = {
		limit: parseInt(
			headers["x-rate-limit-limit"] || prevEndpointInfo?.limit || 0
		),
		remaining: parseInt(
			headers["x-rate-limit-remaining"] ||
				prevEndpointInfo?.remaining ||
				0
		),
		reset: parseInt(
			headers["x-rate-limit-reset"] || prevEndpointInfo?.reset || 0
		),
		lastUpdated: Date.now(),
	};

	const updatedRateLimits: CookieInfo = {
		...prevInfo,
		endpoints: { ...prevInfo?.endpoints, [endpoint]: info },
	};

	cookie.set("endpoints", JSON.stringify(updatedRateLimits));
};

const isRateLimited = async ({
	endpoint,
}: {
	endpoint: string;
}): Promise<boolean> => {
	const cookie = await cookies();

	const cookieEndpointsString = cookie.get("endpoints")?.value;

	if (!cookieEndpointsString) return false;

	const prevInfo: CookieInfo = JSON.parse(
		cookieEndpointsString
	) as CookieInfo;

	const prevEndpointInfo: RateLimitCookieValue | undefined =
		prevInfo.endpoints[endpoint];

	if (!prevEndpointInfo) return false;

	if (prevEndpointInfo.remaining > 0) return false;

	const now = Math.floor(Date.now() / 1000);

	if (now > prevEndpointInfo.reset) return false;

	return true;
};

const getWaitTimeMs = async ({
	endpoint,
}: {
	endpoint: string;
}): Promise<number> => {
	const cookie = await cookies();

	const cookieEndpointsString = cookie.get("endpoints")?.value;

	if (!cookieEndpointsString) return 0;

	const prevInfo: CookieInfo = JSON.parse(
		cookieEndpointsString
	) as CookieInfo;

	if (!prevInfo) return 0;

	const prevEndpointInfo: RateLimitCookieValue | undefined =
		prevInfo.endpoints[endpoint];

	if (!prevEndpointInfo || !prevEndpointInfo.reset) return 0;

	const now = Math.floor(Date.now() / 1000);
	const waitSeconds = Math.max(0, prevEndpointInfo.reset - now);

	return waitSeconds * 1000 + 1000; // Add 1 second buffer
};
