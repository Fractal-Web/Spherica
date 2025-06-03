import { fetchTweets } from "@/app/integrations/twitter";
import { TwitterAccount } from "@/app/integrations/twitter/types";

export async function POST(request: Request) {
	const data = (await request.json()) as TwitterAccount;

	const tweets = await fetchTweets({
		account: data,
		token: `Bearer ${process.env.TWITTER_BEARER_TOKEN as string}`,
	});

	return Response.json({ tweets }, { status: 200 });
}
