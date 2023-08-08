import { music } from "../init";
import { defineDirective } from "@/modules/command";

export default defineDirective( "order", async ( { sendMessage, messageData } ) => {
	const opt: string = messageData.raw_message
	await music.toggleMusicSource( opt );
	await sendMessage( `音源已修改为：${ opt }` );
} );