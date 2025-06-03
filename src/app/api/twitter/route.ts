// import { fetchTweets } from "@/app/integrations/twitter";
// import { Post, TwitterAccount } from "@/app/integrations/twitter/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
	// const data = (await request.json()) as TwitterAccount[];

	// const posts: Post[] = [];

	// const tweetsData = await Promise.all([
	// 	data.map((acc) => {
	// 		const tweets = fetchTweets({
	// 			account: acc,
	// 			token: `Bearer ${process.env.TWITTER_BEARER_TOKEN as string}`,
	// 		});
	// 	}),
	// ]);

	// for (const account of data) {
	// }

	// return Response.json({ tweets }, { status: 200 });

	return Response.json("test");
}
