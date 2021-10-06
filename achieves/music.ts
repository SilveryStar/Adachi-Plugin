import { CommonMessageEventData as Message } from "oicq";
import { sendType } from "../../../modules/message";
import { music } from "../init";

async function main( sendMessage: sendType, message: Message ): Promise<void> {
	const name: string = message.raw_message;
	const result: string = await music.getMusic( name );
	await sendMessage( result );
}

export { main }