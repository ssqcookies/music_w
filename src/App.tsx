import { Suspense } from "react"
import routes from "./router"
import {useRoutes} from 'react-router-dom'
import AppHeader from "./views/conponents/app-header"
import AppFooter from "./views/conponents/app-footer"
function App() {
  return (
  <div className="App">
   <AppHeader/>
    <Suspense fallback=''>
       <div className="main">
      {useRoutes(routes)}
    </div>
    </Suspense>
   <AppFooter/>
  </div>
  )
}

export default App
