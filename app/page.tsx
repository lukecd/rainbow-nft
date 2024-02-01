import ConfigureNFT from "../components/ConfigureNFT";
import ShowNFT from "../components/ShowNFT";
export default function Home() {
	return (
		<div className="bg-black min-h-screen flex items-center justify-center">
			<div className="flex flex-col p-2 rounded-2xl">
				<div className="flex flex-row gap-2 mx-auto">
					<div className="flex-1">
						<ConfigureNFT />
					</div>
					<div className="flex-1">
						<ShowNFT />
					</div>
				</div>
				<div className="flex flex-col items-center justify-center"></div>
			</div>
		</div>
	);
}
