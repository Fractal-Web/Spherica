import { call, delay, put, select, take } from "redux-saga/effects";
import {
	actions,
	onLoading,
	onTotalPagesChange,
	onUpdateTweets as updateTweets,
} from "./slice";
import {
	ApiResponseTweetsOverall,
	UserTweet,
} from "@/app/shared/components/X-Scanner/types";
import { RootState } from ".";

const BASE_TWEETS_PER_PAGE = 2;
const INTERVAL = 1 * 60 * 1000;

interface FetchTweetsReturnValue {
	tweets: UserTweet[];
	totalPages: number | undefined;
}

export const fetchTweets = async ({
	page,
}: {
	page: number;
}): Promise<FetchTweetsReturnValue | undefined> => {
	try {
		const [tweetsRes, tweetsOverall] = await Promise.all([
			fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/posts2?count=${
					BASE_TWEETS_PER_PAGE * page
				}`
			),
			fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/twitter-status`),
		]);

		const tweets = (await tweetsRes.json()) as UserTweet[];

		const dataOverall =
			(await tweetsOverall.json()) as ApiResponseTweetsOverall;

		const totalPages = Math.ceil(
			dataOverall?.totals?.totalPosts / BASE_TWEETS_PER_PAGE
		);

		return {
			tweets,
			totalPages,
		};
	} catch (err) {
		console.log(err);
		return;
	}
};

function* onSelectIsActive() {
	const isActive: boolean = yield select(
		(state: RootState) => state.appReducer.isWidgetActive
	);

	return isActive;
}

function* onUpdateTweets() {
	yield put(onLoading(true));
	const currentPage: number = yield select(
		(state: RootState) => state.appReducer.currentPage
	);

	const data: FetchTweetsReturnValue | undefined = yield fetchTweets({
		page: currentPage,
	});

	if (data) {
		yield put(updateTweets(data.tweets));
		yield put(onTotalPagesChange(data.totalPages));
	}

	yield put(onLoading(false));
}

export function* rootSaga() {
	yield take(actions.onStartWidget);
	let isActive: boolean = yield call(onSelectIsActive);

	while (true) {
		if (isActive) {
			yield call(onUpdateTweets);
			yield delay(INTERVAL);
		} else {
			yield take(actions.onStartWidget);
		}
		isActive = yield call(onSelectIsActive);
	}
}
