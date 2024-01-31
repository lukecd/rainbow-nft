import ConfigureNFT from "../components/ConfigureNFT";
import ShowNFT from "../components/ShowNFT";
export default function Home() {
	return (
		<div className="bg-black min-h-screen flex items-center justify-center px-4 ">
			<div className="flex flex-col p-2 rounded-2xl">
				<div className="flex flex-row w-5/6 h-view gap-2 mx-auto">
					<div className="flex-1">
						<ConfigureNFT />
					</div>
					<div className="flex-1">
						<ShowNFT />
					</div>
				</div>
				<div className="flex flex-col items-center justify-center">
					<div className="bg-blue-700 text-white p-2 rounded-2xl mb-4 mt-5 text-sm w-5/6">
						NFT URL:{" "}
						<a
							href="https://testnets.opensea.io/assets/base-sepolia/0xdf1ac9a22c255ea72764a22b4b93f167c2148101/0"
							target="_blank"
							className="underline text-white hover:text-blue-300"
						>
							https://testnets.opensea.io/assets/base-sepolia/0xdf1ac9a22c255ea72764a22b4b93f167c2148101/0
						</a>
						<br />
						Metadata URL:{" "}
						<a
							href="https://gateway.irys.xyz/mutable/nOudf_UfTHj9ZqZ-Mma_B_gziV65kHaULFlqCWitwUI"
							target="_blank"
							className="underline text-white hover:text-blue-300"
						>
							https://gateway.irys.xyz/mutable/nOudf_UfTHj9ZqZ-Mma_B_gziV65kHaULFlqCWitwUI
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
