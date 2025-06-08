/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchTweets } from "@/app/integrations/twitter";
import { processTweet } from "@/app/integrations/twitter/process-tweet";
import { Post, TwitterAccount } from "@/app/integrations/twitter/types";
import { Pool } from "pg";

const pool = new Pool({
	user: process.env.USER,
	password: process.env.PASSWORD,
	host: process.env.HOST,
	port: 5432,
	database: process.env.DATABASE_NAME,
});

export async function POST(request: Request) {
	const data = (await request.json()) as TwitterAccount[];

	const posts: Post[] = [];
	const rateLimitedAcc: { account: TwitterAccount; retryAfter: number }[] =
		[];

	try {
		for (const acc of data) {
			const tweets = await fetchTweets({
				account: acc,
				token: `Bearer ${process.env.TWITTER_BEARER_TOKEN as string}`,
			});

			if (tweets && tweets.rateLimited) {
				rateLimitedAcc.push({
					account: acc,
					retryAfter: tweets.waitTime,
				});
				continue;
			}

			if (!tweets || !tweets.data) {
				console.log(`No tweets found for ${acc.handle}`);
				continue;
			}

			// Process tweets (rest of your existing code)
			const mediaData = tweets.includes?.media || [];
			const quotedTweets = tweets.includes?.tweets || [];

			for (const tweet of tweets.data) {
				const post = await processTweet({
					tweet,
					userData: acc,
					mediaData,
					quotedTweets,
				});
				posts.push(post);
				await pool.query(
					`INSERT INTO posts (
							id,
							name,
							username,
							description,
							created_at,
							q_name,
							q_username,
							q_description
						) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
					[
						parseInt(post.id),
						post.name,
						post.username,
						post.description,
						post.created_at,
						post.q_name,
						post.q_username,
						post.q_description,
					]
				);
			}
		}
	} catch (err: any) {
		console.error("Error in fetchAndProcessTweets:", err);
		return Response.json(
			{
				succes: false,
				message: `Error processing tweets: ${err.message}`,
			},
			{ status: 500 }
		);
	}

	return Response.json(
		{ data: posts, limited: rateLimitedAcc },
		{ status: 200 }
	);
}
