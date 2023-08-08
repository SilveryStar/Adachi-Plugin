import { music } from "../init";
import { defineDirective } from "@/modules/command";
import { segment } from "@/modules/lib";

export default defineDirective( "order", async ( { sendMessage, matchResult, client, logger } ) => {
	const name = matchResult.match[0];
	try {
		const { id, platform } = await music.getMusic( name );
		await sendMessage( segment.music( id, platform ) );
	} catch ( error ) {
		if ( typeof error === "string" ) {
			await sendMessage( error );
		} else {
			logger.error( ( <Error>error ).stack );
			throw error;
		}
	}
} );