import Query from "@irys/query";
import { WebIrys } from "@irys/sdk";
import { ethers } from "ethers";

// const nodeUrl = "https://node2.irys.xyz";
const nodeUrl = "https://devnet.irys.xyz";

const getWebIrys = async () => {
	//@ts-ignore
	await window.ethereum.enable();
	//@ts-ignore
	const provider = new ethers.BrowserProvider(window.ethereum);

	const url = "https://node2.irys.xyz";
	const token = "matic";
	// const rpcURL = "https://polygon-mumbai.g.alchemy.com/v2/demo";

	// Create a wallet object
	const wallet = { name: "ethersv6", provider: provider };
	// Use the wallet object
	const webIrys = new WebIrys({ url, token, wallet });
	await webIrys.ready();

	return webIrys;
};

export const uploadImage = async (originalBlob: Blob): Promise<string> => {
	try {
		// Initialize WebIrys
		const webIrys = await getWebIrys();
		// Convert Blob to File
		const imageFile = new File([originalBlob], "rainbow.png", {
			type: "image/png",
		});
		console.log("Image file size: ", imageFile.size);

		const tags = [{ name: "Content-Type", value: "image/png" }];

		//@ts-ignore
		const receipt = await webIrys.uploadFile(imageFile, { tags });
		console.log("🚀 ~ receipt:", receipt);
		console.log(`Image uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
		return `https://gateway.irys.xyz/${receipt.id}`;
	} catch (e) {
		console.error("Error uploading data", e);
	}
	return `INVALID URL`;
};

export const uploadJSON = async (metadata: string, rootTX: string): Promise<string> => {
	try {
		// Initialize WebIrys
		const webIrys = await getWebIrys();

		const tags = [
			{ name: "Content-Type", value: "application/json" },
			{ name: "Root-TX", value: rootTX },
		];

		//@ts-ignore
		const receipt = await webIrys.upload(metadata, { tags });
		console.log("🚀 ~ receipt:", receipt);
		console.log(`JSON uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
		return `https://gateway.irys.xyz/${receipt.id}`;
	} catch (e) {
		console.error("Error uploading data", e);
	}
	return `INVALID URL`;
};
