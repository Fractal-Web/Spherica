import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About/About";
import { Background } from "./shared/components/Backgroud/Background";
import { Utilities } from "./shared/components/Utilities/Utilities";

export default function Home() {
	return (
		<main>
			<Background />
			<Hero />
			<About />
			<Utilities />
		</main>
	);
}
