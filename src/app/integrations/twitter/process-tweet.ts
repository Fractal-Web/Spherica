/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post, Tweet, TweetDetails, TwitterAccount } from "./types";

interface ProccessTweetProps {
	tweet: Tweet;
	userData: TwitterAccount;
	mediaData: any;
	quotedTweets: TweetDetails[];
}

export const processTweet = async ({
	tweet,
	userData,
	// mediaData,
	quotedTweets,
}: ProccessTweetProps) => {
	// Add tweet ID to description for later reference
	const description = `${tweet.text} [${tweet.id}]`;
	// let mediaFileName = null;

	// // Handle media if present
	// if (tweet.attachments && tweet.attachments.media_keys) {
	// 	const mediaKey = tweet.attachments.media_keys[0];
	// 	const media = mediaData.find((m) => m.media_key === mediaKey);

	// 	if (media) {
	// 		const mediaUrl = media.url || media.preview_image_url;
	// 		if (mediaUrl) {
	// 			const fileExtension = path.extname(mediaUrl);
	// 			mediaFileName = `${tweet.id}${fileExtension}`;
	// 			await saveMedia(mediaUrl, mediaFileName);
	// 		}
	// 	}
	// }

	// Handle quoted tweet if present
	let quotedTweet = null;
	if (tweet.referenced_tweets) {
		const quotedRef = tweet.referenced_tweets.find(
			(rt) => rt.type === "quoted"
		);
		if (quotedRef) {
			quotedTweet = quotedTweets.find((qt) => qt.id === quotedRef.id);
		}
	}

	// Prepare the post object
	const post: Post | undefined = {
		id: tweet.id,
		name: userData.name,
		username: userData.handle,
		description: description,
		media: "",
		created_at: tweet.created_at,
		q_name: "",
		q_username: "",
		q_description: "",
		q_media: "",
	};

	// Add quoted tweet data if available
	if (quotedTweet) {
		const quotedAuthor = userData; // In a real scenario, this would be the author of the quoted tweet

		post.q_name = quotedAuthor.name;
		post.q_username = quotedAuthor.handle;
		post.q_description = `${quotedTweet.text} [${quotedTweet.id}]`;

		// Handle quoted tweet media
		// if (quotedTweet.attachments && quotedTweet.attachments.media_keys) {
		// 	const quotedMediaKey = quotedTweet.attachments.media_keys[0];
		// 	const quotedMedia = mediaData.find(
		// 		(m) => m.media_key === quotedMediaKey
		// 	);

		// 	if (quotedMedia) {
		// 		const quotedMediaUrl =
		// 			quotedMedia.url || quotedMedia.preview_image_url;
		// 		if (quotedMediaUrl) {
		// 			const quotedFileExtension = path.extname(quotedMediaUrl);
		// 			const quotedFileName = `quoted_${quotedTweet.id}${quotedFileExtension}`;
		// 			await saveMedia(quotedMediaUrl, quotedFileName);
		// 			post.q_media = quotedFileName;
		// 		}
		// 	}
		// }
	}

	return post;
};
