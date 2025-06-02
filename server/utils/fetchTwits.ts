/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
const axios = require("axios");

interface Accout {
	id: string;
	handle: string;
	name: string;
}

const fetchTweets = async ({
	account,
	token,
}: {
	account: Accout;
	token: string;
}) => {
	// const endpoint = `users/${account.id}/tweets`;

	// Check if we're rate limited
	// if (rateLimitStore.isRateLimited(endpoint)) {
	// 	const waitTime = rateLimitStore.getWaitTimeMs(endpoint);
	// 	console.log(
	// 		`Rate limited for ${account.handle}. Waiting ${
	// 			waitTime / 1000
	// 		} seconds until reset.`
	// 	);
	// 	// Option: wait and retry, or queue for later processing
	// 	return { rateLimited: true, waitTime };
	// }

	try {
		const response = await axios.get(
			`https://api.twitter.com/2/users/${account.id}/tweets`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
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
		// rateLimitStore.updateFromHeaders(endpoint, response.headers);

		return response.data;
	} catch (err: any) {
		if (err.response) {
			// Update rate limit info from error response headers
			// if (err.response.headers) {
			// 	rateLimitStore.updateFromHeaders(
			// 		endpoint,
			// 		err.response.headers
			// 	);
			// }

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

module.exports = fetchTweets;
