// components/JSONViewer.tsx
const JSONViewer = ({ data }: { data: any }) => {
	return (
		<div className="bg-gray-100 rounded p-4 w-[490px] rounded-2xl overflow-auto">
			<pre className="text-black text-sm">{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default JSONViewer;
