import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getHotRecommend, getNewAlbumList, getRankingList, getTopBanners, getTopList } from '../service'

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






export const fetchRankingListAction = createAsyncThunk('rankingList', async (arg, { dispatch }) => {
 
 await getTopList().then(async res=>{
  const rankingIds =  res.data

  console.log("rankingIds",rankingIds)
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
  rankingList: any[]
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbumList: [],
  rankingList: []
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
    }
  }
})


export const { changeBannersAction, changeHotRecommendsAction, changeNewAlbumsAction, changeRankingAction } = recommendSlice.actions
export default recommendSlice.reducer