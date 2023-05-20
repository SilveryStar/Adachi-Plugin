import { AuthLevel } from "@modules/management/auth";
import { OrderConfig } from "@modules/command";
import { PluginSetting } from "@modules/plugin";
import { Music } from "./module";

export const music = new Music();

const getMusic: OrderConfig = {
	type: "order",
	cmdKey: "silvery-star.music",
	desc: [ "点播歌曲", "[歌名]" ],
	headers: [ "__点歌" ],
	regexps: [ ".+" ],
	main: "achieves/music"
};

const toggleSource: OrderConfig = {
	type: "order",
	cmdKey: "silvery-star.music-source-toggle",
	desc: [ "切换音源", "[网易|QQ]" ],
	headers: [ "__音源切换" ],
	regexps: [ "(网易|QQ)" ],
	main: "achieves/toggle",
	auth: AuthLevel.Manager
};

export async function init(): Promise<PluginSetting> {
	return {
		pluginName: "music",
		cfgList: [ getMusic, toggleSource ],
		repo: {
			owner: "SilveryStar",
			repoName: "Adachi-Plugin",
			ref: "music"
		}
	};
}