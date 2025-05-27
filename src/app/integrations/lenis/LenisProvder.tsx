"use client";
import React, { PropsWithChildren } from "react";
import { ReactLenis, useLenis } from "lenis/react";

export const LenisProvder = ({ children }: PropsWithChildren) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	useLenis((_) => {
		// called every scroll
		// console.log(lenis);
	});
	return (
		<>
			{children}
			<ReactLenis root options={{ lerp: 0.05 }} />
		</>
	);
};
