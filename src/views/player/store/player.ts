
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILyric, parseLyric } from '@/utils/parse-lyric'
import { getSongDetail, getSongLyric } from "../service";
import { RootState } from "@/store";


interface IPlayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}

interface IThunkState {
  state: RootState
}

export const fetchGetSongDetailAction = createAsyncThunk<void, number, IThunkState>('currentSongs', async (id: number, { dispatch, getState }) => {
  // 获取当前列表的歌曲数据,检查当前歌曲是否在播放列表里
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    //获取当前歌曲信息
    const song = await getSongDetail()
    const newPlaySongList = [...playSongList]
    newPlaySongList.push(song.data)
    dispatch(changeCurrentSongAction(song.data))
    dispatch(changepPlaySongListAction(newPlaySongList))
    dispatch(changePlaySongIndexAction(newPlaySongList.length-1))
  } else {
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))
  }
  //获取当前歌曲的歌词信息
  const lyris = await getSongLyric(1)
  // 获取歌词的字符串
  const lyricString = lyris.data
  // 对歌词进行解析(一个个对象)
  const lyrics = parseLyric(lyricString)
  // 将歌词放到state中
  dispatch(changeLyricsAction(lyrics))
})

export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changemuisc',
 async (isNext, { dispatch, getState }) => {
      // 1.获取state中的数据
      const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playSongIndex
    const songList = player.playSongList



     // 2.根据不同的模式计算不同的下一首歌曲的索引
     let newIndex = songIndex
     if (playMode === 1) {
       // 随机播放
       newIndex = Math.floor(Math.random() * songList.length)
     } else {
       // 单曲顺序和顺序播放
       newIndex = isNext ? songIndex + 1 : songIndex - 1
       if (newIndex > songList.length - 1) newIndex = 0
       if (newIndex < 0) newIndex = songList.length - 1
     }
 
     // 3.获取当前的歌曲
     const song = songList[newIndex]
     dispatch(changeCurrentSongAction(song))
     dispatch(changePlaySongIndexAction(newIndex))

      // 4.请求新的歌词
      const lyris = await getSongLyric(song.id)
      // 获取歌词的字符串
      const lyricString = lyris.data
      // 对歌词进行解析(一个个对象)
      const lyrics = parseLyric(lyricString)
      // 将歌词放到state中
      dispatch(changeLyricsAction(lyrics))
  
  })



const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  playSongList: [
   
    {
      name: '起风了',
      id: 12,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 12085562,
          name: '买辣椒也用券',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 42,
      crbt: null,
      cf: '',
      al: {
        id: 74715426,
        name: '起风了',
        picUrl:
          'https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg',
        tns: [],
        pic_str: '109951163699673355',
        pic: 109951163699673360
      },
      dt: 325868,
      h: {
        br: 320000,
        fid: 0,
        size: 13037236,
        vd: -77525,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 7822359,
        vd: -74987,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 5214920,
        vd: -73504,
        sr: 44100
      },
      sq: {
        br: 985873,
        fid: 0,
        size: 40158105,
        vd: -77524,
        sr: 44100
      },
      hr: {
        br: 2832349,
        fid: 0,
        size: 115371553,
        vd: -77475,
        sr: 88200
      },
      a: null,
      cd: '1',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 536879104,
      originCoverType: 1,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 42,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      single: 0,
      noCopyrightRcmd: null,
      mv: 10782615,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 1415923,
      publishTime: 0
    }
  ],
  playSongIndex: -1,
  playMode: 0 // 0:顺序播放 1:随机播放 2:单曲循环
}
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changepPlaySongListAction(state,{payload}){
      state.playSongList = payload
    },
    changePlaySongIndexAction(state,{payload}){
      state.playSongIndex = payload
    },
    changePlayModeAction(state,{payload}){
      state.playMode = payload
    }
  }
})

export const { changeCurrentSongAction, changeLyricsAction, changeLyricIndexAction ,changePlayModeAction,changepPlaySongListAction,changePlaySongIndexAction} = playerSlice.actions
export default playerSlice.reducer