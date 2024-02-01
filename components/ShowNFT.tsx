"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Spinner from "./Spinner";

const ShowNFT = () => {
	const metadataURL = `https://gateway.irys.xyz/mutable/${process.env.NEXT_PUBLIC_ROOT_TX}`;
	const [nftData, setNftData] = useState({ image: "", name: "", description: "", symbol: "" });
	const [actionActive, setActionActive] = useState<boolean>(false);

	useEffect(() => {
		loadNFTData();
	}, []);

	const loadNFTData = async () => {
		setActionActive(true);
		try {
			const response = await fetch(metadataURL);
			const data = await response.json();
			setNftData({
				image: data.image,
				name: data.name,
				description: data.description,
				symbol: data.symbol,
			});
		} catch (error) {
			console.error("Error loading NFT data:", error);
		}
		setActionActive(false);
	};

	const refresh = () => {
		loadNFTData();
	};

	return (
		<div className="bg-[#e5e4f9] rounded-2xl shadow-lg p-4 flex flex-col items-center justify-between w-[500px] ">
			{nftData.image && <img src={nftData.image} alt={nftData.name} className="w-full my-2 rounded-2xl" />}
			<div className="bg-blue-700 text-white p-2 rounded-2xl mb-4 w-full">
				{nftData.name && <h2 className="text-xl font-bold">{nftData.name}</h2>}
				<div className="flex flex-row">
					{nftData.description && <p className="text-sm">{nftData.description}</p>}
				</div>
			</div>
			<div className="text-black p-2 rounded-2xl  text-sm">
				NFT:{" "}
				<a
					href="https://testnets.opensea.io/assets/base-sepolia/0xdf1ac9a22c255ea72764a22b4b93f167c2148101/2"
					target="_blank"
					className="underline text-black hover:text-blue-300"
				>
					https://testnets.opensea.io/assets/base-sepolia/0xdf1ac9a22c255ea72764a22b4b93f167c2148101/2
				</a>
			</div>
			<button className="w-full p-2 bg-blue-700 text-white rounded-2xl shadow mt-4" onClick={refresh}>
				{actionActive ? (
					<div className="flex flex-row items-center justify-center">
						<Spinner />
					</div>
				) : (
					"Refresh"
				)}
			</button>
		</div>
	);
};

export default ShowNFT;
