import { Redis } from "../../bot";
import { getMusic163, getMusicQQ } from "./api";

export class Music {
	public sourceID: number = 0;
	
	constructor() {
		Redis.getString( "silvery-star.music-source" ).then( result => {
			this.sourceID = result === null ? 1 : parseInt( result );
		} );
	}
	
	public async toggleMusicSource( opt: string ): Promise<void> {
		const sourceID: number = opt === "网易" ? 1 : 2;
		this.sourceID = sourceID;
		await Redis.setString( "silvery-star.music-source", sourceID );
	}
	
	public async getMusic( name: string ): Promise<string> {
		let res: string = this.sourceID === 1
						? await getMusic163( name )
						: await getMusicQQ( name );
		return res;
	}
}