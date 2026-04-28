import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getArtistsList, getHotRecommend, getNewAlbumList, getRankingList, getTopBanners, getTopList } from '../service'

export const fetchBannerDataAction = createAsyncThunk('banners', async (arg, { dispatch }) => {
  const res = await getTopBanners()
  dispatch(changeBannersAction(res.data))
})


export const fetchHotRecommendListAction = createAsyncThunk('personalizedRecommend', async (arg, { dispatch }) => {
  const res = await getHotRecommend()
  dispatch(changeHotRecommendsAction(res.data))
})

export const fetchNewAlbumListAction = createAsyncThunk('newAlbums', async (arg, { dispatch }) => {
  const res = await getNewAlbumList()
  dispatch(changeNewAlbumsAction(res.data))
})


export const fetchArtistsListAction = createAsyncThunk('artistsList',async (arg,{dispatch})=>{
  const res = await getArtistsList()
  dispatch(changeArtistsAction(res.data))

})



export const fetchRankingListAction = createAsyncThunk('rankingList', async (arg, { dispatch }) => {
 
 await getTopList().then(async res=>{
  const rankingIds =  res.data

  const promises: Promise<any>[] = []
  for (const item of rankingIds) {
  const res = await getRankingList(item.id)
  promises.push({...item,list:res.data})
  }

  Promise.all(promises).then(results => {
    dispatch(changeRankingAction(results))
  })
 })
})


interface IRecommendState {
  banners: any[],
  hotRecommends: any[],
  newAlbumList: any[],
  rankingList: any[],
  artistsList:any[]
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbumList: [],
  rankingList: [],
  artistsList:[]
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendsAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }) {
      state.newAlbumList = payload
    },

    changeRankingAction(state, { payload }) {
      state.rankingList = payload
    },
    changeArtistsAction(state,{payload}){
      state.artistsList = payload
    }
  }
})


export const { changeBannersAction, changeHotRecommendsAction, changeNewAlbumsAction, changeRankingAction ,changeArtistsAction} = recommendSlice.actions
export default recommendSlice.reducer