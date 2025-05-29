import { useLenis } from "lenis/react";
import { useEffect } from "react";

export default function useDisableScroll() {
	const lenis = useLenis();

	useEffect(() => {
		const html = document.querySelector("html");
		if (lenis && html) {
			lenis.options.smoothWheel = false;
			html.style.marginRight = `${
				window.innerWidth - document.documentElement.clientWidth
			}px`;
			html.style.overflow = "hidden";
		}

		return () => {
			if (lenis && html) {
				lenis.options.smoothWheel = true;
				html.style.marginRight = "0px";
				html.style.overflow = "unset";
			}
		};
	}, [lenis]);
}
