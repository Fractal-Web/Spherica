"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./FetchMoreTrigger.module.scss";
import { useAppSelector, useStoreDispatch } from "@/app/integrations/redux";
import {
	selectCurrentPage,
	selectTotalPages,
	selectTweets,
} from "@/app/integrations/redux/selectors";
import {
	onPageChange,
	onTotalPagesChange,
	onUpdateTweets,
} from "@/app/integrations/redux/slice";
import {
	BASE_TWEETS_PER_PAGE,
	fetchTweets,
} from "@/app/integrations/redux/sagas";

export const FetchMoreTrigger = () => {
	const currentPage = useAppSelector(selectCurrentPage);
	const totalPages = useAppSelector(selectTotalPages);
	const totalTweets = useAppSelector(selectTweets);

	const [hasFetched, setHasFetched] = useState(false);

	const dispatch = useStoreDispatch();

	const { ref, inView } = useInView({
		threshold: 0,
	});

	useEffect(() => {
		const fetchMore = async (page: number) => {
			//Fetch 3 more tweets when we hit the last one
			const data = await fetchTweets({
				page,
				count: BASE_TWEETS_PER_PAGE + 3,
			});

			if (data) {
				dispatch(onUpdateTweets(data.tweets));
				dispatch(onTotalPagesChange(data.totalPages));
			}
		};

		if (totalTweets.length < 8) {
			if (inView && totalPages) {
				if (currentPage < totalPages && !hasFetched) {
					dispatch(onPageChange(currentPage + 1));
					fetchMore(currentPage + 1);
					setHasFetched(true);
				}
			}
		}
	}, [inView, totalPages, currentPage, dispatch, hasFetched, totalTweets]);

	return <div className={styles.ct} ref={ref} />;
};
