import { Suspense, useEffect } from "react"
import routes from "./router"
import { useRoutes } from 'react-router-dom'
import AppHeader from "./views/conponents/app-header"
import AppFooter from "./views/conponents/app-footer"
import AppPlayBar from "@/views/player/app-player-bar"
import { useAppDispatch } from "./store"
import { fetchGetSongDetailAction } from "./views/player/store/player"
function App() {
  // 获取某一首喜欢的歌曲
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchGetSongDetailAction(11))
  }, [])
  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback=''>
        <div className="main">
          {useRoutes(routes)}
        </div>
      </Suspense>
      <AppFooter />

      {/* 播放器工具栏 */}
      <AppPlayBar></AppPlayBar>
    </div>
  )
}

export default App
