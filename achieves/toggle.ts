import { InputParameter } from "@modules/command";
import { music } from "../init";

export async function main(
	{ sendMessage, messageData }: InputParameter
): Promise<void> {
	const opt: string = messageData.raw_message
	await music.toggleMusicSource( opt );
	await sendMessage( `音源已修改为：${ opt }` );
}