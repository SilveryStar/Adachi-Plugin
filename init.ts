import { addPlugin } from "../../modules/plugin";
import { AuthLevel } from "../../modules/auth";
import { Music } from "./module";

let music: Music;

async function init(): Promise<any> {
	music = new Music();
	
	return addPlugin( "music", {
		commandType: "order",
		key: "silvery-star.music",
		docs: [ "点歌", "<歌名>" ],
		headers: [ "__点歌" ],
		main: "achieves/music",
		regexps: [ " *.+" ]
	}, {
		commandType: "order",
		key: "silvery-star.music-source-toggle",
		docs: [ "切换音源", "<网易|QQ>" ],
		headers: [ "__音源切换" ],
		main: "achieves/toggle",
		regexps: [ " *(网易|QQ|qq)" ],
		authLimit: AuthLevel.Manager
	} );
}

export { init, music }
