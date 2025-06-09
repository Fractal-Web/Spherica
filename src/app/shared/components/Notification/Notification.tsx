"use client";
import { useAppSelector, useStoreDispatch } from "@/app/integrations/redux";
import { selectHasNewPost } from "@/app/integrations/redux/selectors";
import { onToggleHasNewPost } from "@/app/integrations/redux/slice";
import React, { useEffect, useRef } from "react";

export const Notification = () => {
	const ref = useRef<HTMLAudioElement | null>(null);
	const dispatch = useStoreDispatch();
	const hasNewPost = useAppSelector(selectHasNewPost);

	useEffect(() => {
		if (hasNewPost && ref.current) {
			ref.current.play();
			dispatch(onToggleHasNewPost(false));
		}
	}, [hasNewPost, dispatch]);

	return (
		<div
			style={{
				position: "absolute",
				zIndex: -99,
				opacity: 0,
			}}
		>
			<audio
				ref={ref}
				src={"/assets/audio/twitter-notification-sound.mp3"}
			/>
		</div>
	);
};
