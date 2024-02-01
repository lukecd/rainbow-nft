import type { NextApiRequest, NextApiResponse } from "next";
import { TypedEthereumSigner } from "arbundles";
import { NextResponse } from "next/server";
import Irys from "@irys/sdk";

/**
 *
 * @returns A signed version of the data, signatureData, as sent by the client.
 */
async function uploadJSON(jsonData: string): Promise<boolean> {
	const key = process.env.PRIVATE_KEY;
	const token = "matic";
	const url = "https://node2.irys.xyz";

	const serverIrys = new Irys({
		url,
		token,
		key,
	});
	const jsonObject = JSON.parse(jsonData);
	console.log("creaated json object:", jsonObject);
	try {
		const tags = [
			{ name: "Content-Type", value: "application/json" },
			{ name: "Root-TX", value: process.env.NEXT_PUBLIC_ROOT_TX },
		];
		console.log("uploading=", jsonObject);
		//@ts-ignore
		const receipt = await serverIrys.upload(jsonObject, { tags });
		console.log("🚀 ~ receipt:", receipt);
		console.log(`JSON uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
		return true;
	} catch (e) {
		console.error("Error uploading data", e);
	}
	return false;
}

async function readFromStream(stream: ReadableStream): Promise<string> {
	const reader = stream.getReader();
	let result = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		result += new TextDecoder().decode(value);
	}

	return result;
}

export async function POST(req: Request) {
	try {
		//@ts-ignore
		const rawData = await readFromStream(req.body);
		const body = JSON.parse(rawData);
		const newJSON = body.newJSON;

		console.log("newJSON=", newJSON);
		const jsonString = JSON.stringify(newJSON);
		console.log("jsonString=", newJSON);

		const jsonUpload = await uploadJSON(jsonString);
		return NextResponse.json({ jsonUpload: jsonUpload });
	} catch (error) {
		console.error("Error:", error);
		return NextResponse.json({ jsonUpload: "false" });
	}
}
