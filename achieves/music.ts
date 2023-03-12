import { InputParameter } from "@modules/command";
import { music } from "../init";
import { isGroupMessage } from "@modules/message";
import { Friend, Group } from "icqq";

export async function main(
	{ sendMessage, messageData, client, logger }: InputParameter
): Promise<void> {
	const name: string = messageData.raw_message;
	try {
		const { id, platform } = await music.getMusic( name );
		
		const unit: Group | Friend = isGroupMessage( messageData ) ?
			client.pickGroup( messageData.group_id ) :
			client.pickFriend( messageData.sender.user_id );
		
		await unit.shareMusic( platform, id );
	} catch ( err ) {
		if ( typeof err === "string" ) {
			await sendMessage( err );
		} else {
			logger.error( ( <Error>err ).stack );
			await sendMessage( "点歌出现异常错误，请联系持有者进行反馈" );
		}
	}
}