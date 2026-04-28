//解析返回的歌词字符串

export interface ILyric {
  time: number
  text: string
}

//[04:09.123]制作人：曹杨 [04:09.12]制作人：曹杨
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString: string) {

  //将字符串按换行符进行切割
  const lines: string[] = lyricString.split('\n')
  // 将对应每一句歌词进行解析，形成对象
  const lyrics: ILyric[] = []
  for (const line of lines) {
    //RegExp.prototype.exec() 方法在一个指定的字符串中执行一个正则表达式的匹配搜索，返回一个结果数组或 null
    const results = timeRegExp.exec(line)
    if (!results) continue
    // 将每一组时间转换成毫秒
    const minutes = Number(results[1]) * 60 * 1000;
    const seconds = Number(results[2]) * 1000;
    const hundredths = results[3].length === 2 ? Number(results[3]) * 2 : Number(results[3]);
    const time = minutes + seconds + hundredths
    // 3.获取每一组的文本
    const text = line.replace(timeRegExp, '')

    lyrics.push({ time, text })
  }
  return lyrics
}