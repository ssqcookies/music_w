import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// 1. 定义初始状态类型和值
interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

// 2. 创建切片（包含 state、reducers、actions）
const counterSlice = createSlice({
  name: 'counter', // 切片名，会作为 action type 的前缀
  initialState,
  reducers: {
    // 同步 reducer：直接修改 state（Immer 会帮你处理 immutable）
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // 带 payload 的 reducer
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

// 3. 导出 action creator（组件里 dispatch 用）
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// 4. 导出 reducer，给 store 使用
export default counterSlice.reducer