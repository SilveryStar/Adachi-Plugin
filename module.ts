import { getMusic163, getMusicQQ } from "./api";
import bot from "ROOT";

export class Music {
	public sourceID: number = 0;
	
	constructor() {
		bot.redis.getString( "silvery-star.music-source" ).then( result => {
			this.sourceID = result === null ? 1 : parseInt( result );
		} );
	}
	
	public async toggleMusicSource( opt: string ): Promise<void> {
		const sourceID: number = opt === "网易" ? 1 : 2;
		this.sourceID = sourceID;
		await bot.redis.setString( "silvery-star.music-source", sourceID );
	}
	
	public async getMusic( name: string ): Promise<string> {
		let res: string = this.sourceID === 1
						? await getMusic163( name )
						: await getMusicQQ( name );
		return res;
	}
}