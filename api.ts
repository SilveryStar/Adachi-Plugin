import fetch from "node-fetch";

const __API = {
	MUSIC_QQ: "https://api.qq.jsososo.com/search/quick",
	MUSIC_163: "https://music.163.com/api/search/get"
};

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
	const URL: string = `${ __API.MUSIC_QQ }?key=${ encodeURI( name.trim() ) }`;
	
	return new Promise( ( resolve ) => {
		fetch( URL, {
			method: "GET",
			headers: HEADER.MUSIC_QQ,
			mode: "cors",
			credentials: "omit"
		} )
			.then( async ( result: Response ) => {
				const resp: any = await result.json();
				if ( resp.result === 100 ) {
					if ( resp.data.song.count !== 0 ) {
						const songID: string = resp.data.song.itemlist[0].id;
						resolve( `[CQ:music,type=qq,id=${ songID }]` );
					} else {
						resolve( "没有搜索到歌曲" );
					}
				} else {
					resolve( `API 错误: ${ resp.result }` );
				}
			} );
	} );
}

export async function getMusic163( name: string ): Promise<string> {
	const URL: string = `${ __API.MUSIC_163 }?s=${ encodeURI( name.trim() ) }&type=1&limit=1`;
	
	return new Promise( ( resolve ) => {
		fetch( URL, {
			method: "GET",
			headers: HEADER.MUSIC_163
		} )
			.then( async ( result: Response ) => {
				const resp: any = await result.json();
				if ( resp.code === 200 ) {
					if ( resp.result.songs ) {
						const songID: number = resp.result.songs[0].id;
						resolve( `[CQ:music,type=163,id=${ songID }]` );
					} else {
						resolve( "没有搜索到歌曲" );
					}
				} else {
					resolve( `API 错误: ${ resp.result }` );
				}
			} );
	} );
}