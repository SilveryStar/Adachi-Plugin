import { register } from "@/utils/request";

export const apis = {
	MUSIC_QQ: "https://c.y.qq.com/soso/fcgi-bin/client_search_cp",
	MUSIC_163: "https://music.163.com/api/search/get"
};

const { request: $https } = register( {
	baseURL: "https://server.awbugl.top/botarcapi/",
	headers: {
		Authorization: "Bearer 0005000951383648da82be15ec3bd10b028fc0e0"
	},
	timeout: 30000,
	responseType: "json",
}, apis );

const HEADER = {
	MUSIC_QQ: {
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
		"Upgrade-Insecure-Requests": "1",
		"Pragma": "no-cache",
		"Cache-Control": "no-cache",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0"
	},
	MUSIC_163: {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66"
	}
}

export async function getMusicQQ( name: string ): Promise<string> {
	const { data: result } = await $https.MUSIC_QQ.get( {
		qqmusic_ver: 1298,
		new_json: 1,
		t: 0,
		aggr: 1,
		cr: 1,
		p: 1,
		n: 5,
		w: name
	}, {
		headers: HEADER.MUSIC_QQ
	} );
	const reg: RegExp = /callback\((.*)\)/;
	const b: string = ( <RegExpExecArray>reg.exec( result ) )[1];
	const data = JSON.parse( b ).data;
	
	if ( data.song.curnum !== 0 ) {
		return data.song.list[0].id.toString();
	} else {
		throw `没有搜索到歌曲[${ name }]`;
	}
}

export async function getMusic163( name: string ): Promise<string> {
	const { data } = await $https.MUSIC_163.get( {
		s: name,
		type: 1,
		limit: 1
	}, {
		headers: HEADER.MUSIC_163
	} );
	
	const songs: any[] | undefined = data.result.songs;
	if ( songs ) {
		return songs[0].id.toString();
	} else {
		throw `没有搜索到歌曲[${ name }]`;
	}
}