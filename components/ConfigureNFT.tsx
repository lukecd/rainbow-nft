"use client";

import { useState, useEffect } from "react";
//@ts-ignore
import { CirclePicker } from "react-color";

import { ethers } from "ethers";
import JSONViewer from "./JSONViewer";
import { uploadImage, uploadJSON } from "../utils/irysFunctions";

const ConfigureNFT = () => {
	const [color, setColor] = useState("#e91e63");
	const [walletAddress, setWalletAddress] = useState("");
	const [nftMetadata, setNftMetadata] = useState({
		name: "Rainbow NFT",
		symbol: "RNFT",
		description: "Taste the rainbow",
		image: "", // Placeholder, will be filled with dataUrl after saveState
		attributes: [{ trait_type: "Color", value: "Default" }], // Placeholder
	});

	// Update the NFT metadata when color changes
	useEffect(() => {
		setNftMetadata((prevMetadata) => ({
			...prevMetadata,
			attributes: [{ trait_type: "Color", value: color }],
		}));
	}, [color]);

	const handleChangeComplete = (color) => {
		setColor(color.hex);
	};

	useEffect(() => {
		// Check if the user has already connected their wallet
		//@ts-ignore
		if (window.ethereum && window.ethereum.selectedAddress) {
			//@ts-ignore
			setWalletAddress(window.ethereum.selectedAddress);
		}
	}, []);

	const connectWallet = async () => {
		let signer = null;

		let provider;
		//@ts-ignore
		if (window.ethereum == null) {
			console.log("MetaMask not installed; using read-only defaults");
			//@ts-ignore
			provider = ethers.getDefaultProvider();
		} else {
			//@ts-ignore
			provider = new ethers.BrowserProvider(window.ethereum);
			signer = await provider.getSigner();
			//@ts-ignore
			setWalletAddress(window.ethereum.selectedAddress);
		}
	};

	const disconnectWallet = () => {
		setWalletAddress("");
	};

	const saveState = () => {
		// Generate and download the PNG file
		const canvas = document.createElement("canvas");
		canvas.width = 800;
		canvas.height = 800;
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Convert canvas to Blob
		canvas.toBlob(async (blob) => {
			if (blob) {
				try {
					const imageUrl = await uploadImage(blob);
					const updatedMetadata = {
						...nftMetadata,
						image: imageUrl,
					};

					// Update the NFT metadata state
					setNftMetadata(updatedMetadata);

					// Convert updated metadata to JSON string and upload
					const metadataJSON = JSON.stringify(updatedMetadata);
					await uploadJSON(metadataJSON, "nOudf_UfTHj9ZqZ-Mma_B_gziV65kHaULFlqCWitwUI");
				} catch (e) {
					console.error("Error in uploading image", e);
				}
			}
		}, "image/jpeg");
	};

	return (
		<div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center justify-between w-full h-full">
			<div className="py-1 max-w-200">
				<JSONViewer data={nftMetadata} />
			</div>

			<div className="flex flex-col w-full mt-4">
				<div className="mb-10">
					<CirclePicker
						color={color}
						onChangeComplete={handleChangeComplete}
						width="100%"
						circleSize={30}
						circleSpacing={15}
					/>
				</div>
				{walletAddress && (
					<div className="bg-blue-700 text-white p-2 rounded-2xl mb-4">Connected as {walletAddress}</div>
				)}
				<button
					className={`w-full p-2 text-white rounded-2xl shadow ${
						walletAddress ? "bg-blue-700" : "bg-blue-500"
					}`}
					onClick={walletAddress ? saveState : connectWallet}
				>
					{walletAddress ? "Save State" : "Connect Wallet"}
				</button>
			</div>
		</div>
	);
};

export default ConfigureNFT;
