import { parseInfo } from "@/app/integrations/axiom";

export async function POST(request: Request) {
	const { address } = (await request.json()) as { address: string };
	console.log(address);

	const data = await parseInfo({ address });

	return Response.json(data, { status: 200 });
}
