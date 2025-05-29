import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { Background } from "@/components/Backgroud/Background";
import { Utilities } from "@/components/Utilities/Utilities";
import { Token } from "@/components/Token/Token";
import { BackgroundVideo } from "./shared/components/Background-video/BackgroundVideo";

export default function Home() {
	return (
		<main>
			<Background />
			<BackgroundVideo />
			<Hero />
			<About />
			<Utilities />
			<Token />
		</main>
	);
}
