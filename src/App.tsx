import { Suspense } from "react"
import routes from "./router"
import {useRoutes,Link} from 'react-router-dom'
function App() {
  return (
  <div className="App">
    <div className="nav">
      <Link to='/discover'>发现音乐</Link>
      <Link to='/mine'>我的</Link>
      <Link to='/focus'>关注</Link>
      <Link to='/download'>下载客户端</Link>
    </div>
    <Suspense fallback=''>
       <div className="main">
      {useRoutes(routes)}
    </div>
    </Suspense>
   
  </div>
  )
}

export default App
