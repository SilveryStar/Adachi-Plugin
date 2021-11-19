import { InputParameter } from "@modules/command";
import { music } from "../init";

export async function main(
	{ sendMessage, messageData }: InputParameter
): Promise<void> {
	const name: string = messageData.raw_message;
	const result: string = await music.getMusic( name );
	await sendMessage( result );
}