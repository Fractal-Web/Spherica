/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const axios = require("axios");

const PORT = 8000;

const ACCOUNT = { id: "44196397", handle: "elonmusk", name: "Elon Musk" };

app.use(
	cors({
		origin: ["http://localhost:3000"],
		//   credentials: true,
		//   methods: ['GET', 'POST', 'OPTIONS'],
		//   allowedHeaders: ['Content-Type', 'Authorization']
	})
);

app.get("/api", async (req, res) => {
	const data = await fetchTweets({
		account: ACCOUNT,
		token: process.env.TWITTER_TOKEN,
	});

	res.json(data);
});

app.listen(PORT, () => {
	// console.log(process.env.TWITTER_TOKEN);
	console.log(`Server started on port ${PORT}`);
});

const fetchTweets = async ({ account, token }) => {
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
	} catch (err) {
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
