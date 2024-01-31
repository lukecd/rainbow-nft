"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import RainbowABI from "../smart-contract/RainbowABI.json";

const ShowNFT = () => {
	const metadataURL = "https://gateway.irys.xyz/mutable/nOudf_UfTHj9ZqZ-Mma_B_gziV65kHaULFlqCWitwUI";
	const [nftData, setNftData] = useState({ image: "", name: "", description: "", symbol: "" });

	useEffect(() => {
		loadNFTData();
	}, []);

	const loadNFTData = async () => {
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
	};

	const refresh = () => {
		loadNFTData();
	};

	return (
		<div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-between w-[500px] h-full">
			{nftData.image && <img src={nftData.image} alt={nftData.name} className="w-full my-2 rounded-2xl" />}
			<div className="bg-blue-700 text-white p-2 rounded-2xl mb-4 w-full">
				{nftData.name && <h2 className="text-xl font-bold">{nftData.name}</h2>}
				<div className="flex flex-row">
					{nftData.description && <p className="text-sm my-2">{nftData.description}</p>}
				</div>
			</div>
			<button className="w-full p-2 bg-blue-500 text-white rounded-2xl shadow mt-4" onClick={refresh}>
				Refresh
			</button>
		</div>
	);
};

export default ShowNFT;
