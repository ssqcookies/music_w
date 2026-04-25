import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchBannerDataAction = createAsyncThunk('banners',async ()=>{
  const res = await getBanners()
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