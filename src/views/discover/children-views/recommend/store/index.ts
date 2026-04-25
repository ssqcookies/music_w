import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { getTopBanners } from '../service'

export const fetchBannerDataAction = createAsyncThunk('banners',async ()=>{
  const res = await getTopBanners()
  console.log("22222")
  return res.data
})

interface IRecommendState{
  banner:any[]
}
const initialState:IRecommendState={
  banner:[]
}

const recommendSlice = createSlice({
  name:'recommend',
  initialState,
  reducers:{}
})

export default recommendSlice.reducer