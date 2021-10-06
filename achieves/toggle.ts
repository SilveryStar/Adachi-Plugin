import { CommonMessageEventData as Message } from "oicq";
import { sendType } from "../../../modules/message";
import { music } from "../init";

async function main( sendMessage: sendType, message: Message ): Promise<void> {
	const opt: string = message.raw_message
	await music.toggleMusicSource( opt );
	await sendMessage( `音源已修改为：${ opt }` );
}

export { main }