import request, { Response as resp } from "request";
import fetch from "node-fetch";
import bot from "ROOT";

const __API = {
	MUSIC_QQ: "https://c.y.qq.com/soso/fcgi-bin/client_search_cp",
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
	const URL: string = `${ __API.MUSIC_QQ }?qqmusic_ver=1298&new_json=1`
		+ `&t=0&aggr=1&cr=1&p=1&n=5&w=${ encodeURI( name.trim() ) }`;
	
	return new Promise( ( resolve, reject ) => {
		request( {
			method: "GET",
			headers: HEADER.MUSIC_QQ,
			url: URL
		}, ( error: any, response: resp, body: any ) => {
			if ( error ) {
				bot.logger.error( error );
				reject( error );
				return;
			}
			try {
				const reg: RegExp = /callback\((.*)\)/;
				const b: string = ( <RegExpExecArray>reg.exec( body ) )[1];
				const data = JSON.parse( b ).data;
				
				if ( data.song.curnum !== 0 ) {
					const songID: string = data.song.list[0].id.toString();
					resolve( songID );
				} else {
					reject( "没有搜索到歌曲" );
				}
			} catch ( err ) {
				bot.logger.error( ( <Error>err ).stack );
				reject( err );
			}
		} );
	} );
}

export async function getMusic163( name: string ): Promise<string> {
	const URL: string = `${ __API.MUSIC_163 }?s=${ encodeURI( name.trim() ) }&type=1&limit=1`;
	
	let resp: any;
	
	try {
		const result: Response = await fetch( URL, {
			method: "GET",
			headers: HEADER.MUSIC_163
		} );
		resp = await result.json();
	} catch ( err ) {
		bot.logger.error( `API 错误: ${ ( <Error>err ).stack }` )
		throw `API 错误: ${ ( <Error>err ).message }`;
	}
	
	if ( resp.code === 200 ) {
		if ( resp.result.songs ) {
			return resp.result.songs[0].id.toString();
		} else {
			throw "没有搜索到歌曲";
		}
	} else {
		const errMsg: string = `API 错误: ${ resp.result }`;
		bot.logger.error( errMsg )
		throw errMsg;
	}
}