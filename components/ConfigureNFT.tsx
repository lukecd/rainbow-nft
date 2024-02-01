"use client";

import { useState, useEffect } from "react";
//@ts-ignore
import { CirclePicker } from "react-color";

import { ethers } from "ethers";
import JSONViewer from "./JSONViewer";
import { uploadImage, uploadJSON } from "../utils/irysFunctions";
import Spinner from "./Spinner";

const ConfigureNFT = () => {
	const [color, setColor] = useState("#e91e63");
	const [actionActive, setActionActive] = useState<boolean>(false);

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
	//@ts-ignore
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
		setActionActive(true);
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
		setActionActive(false);
	};

	const disconnectWallet = () => {
		setWalletAddress("");
	};

	const saveState = async () => {
		setActionActive(true);
		console.log("set action active to true");
		// Generate and download the PNG file
		const canvas = document.createElement("canvas");
		canvas.width = 800;
		canvas.height = 800;
		const ctx = canvas.getContext("2d");
		//@ts-ignore
		ctx.fillStyle = color;
		//@ts-ignore
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
					setActionActive(true);

					const response = await fetch("/api/uploadJSON", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ newJSON: metadataJSON }),
					});
					setActionActive(false);

					console.log("storeMetadata response=", response);
				} catch (e) {
					console.error("Error in uploading image", e);
				}
			}
		}, "image/png");
	};

	return (
		<div className="bg-[#e5e4f9] rounded-2xl shadow-lg p-4 flex flex-col items-center justify-between w-[500px]">
			<div className="py-1 max-w-200">
				<JSONViewer data={nftMetadata} />
			</div>
			<div className=" text-black p-2 rounded-2xl text-sm">
				Metadata:{" "}
				<a
					href="https://gateway.irys.xyz/mutable/nOudf_UfTHj9ZqZ-Mma_B_gziV65kHaULFlqCWitwUI"
					target="_blank"
					className="underline text-black hover:text-blue-300"
				>
					https://gateway.irys.xyz/mutable/ {process.env.NEXT_PUBLIC_ROOT_TX}
				</a>
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
					{actionActive ? (
						<div className="flex flex-row items-center justify-center">
							<Spinner />
						</div>
					) : walletAddress ? (
						"Save State"
					) : (
						"Connect Wallet"
					)}
				</button>
			</div>
		</div>
	);
};

export default ConfigureNFT;
