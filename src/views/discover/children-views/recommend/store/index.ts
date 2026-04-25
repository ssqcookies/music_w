import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { getTopBanners } from '../service'

export const fetchBannerDataAction = createAsyncThunk('banners',async (arg,{dispatch})=>{
  const res = await getTopBanners()
  dispatch(changeBannersAction(res.data))
})

interface IRecommendState{
  banners:any[]
}
const initialState:IRecommendState={
  banners:[]
}

const recommendSlice = createSlice({
  name:'recommend',
  initialState,
  reducers:{
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
  }
})


export  const { changeBannersAction } = recommendSlice.actions
export default recommendSlice.reducer