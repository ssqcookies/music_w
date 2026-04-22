import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import {Provider} from 'react-redux'


import 'normalize.css'
import '@/assets/css/index.less'


import App from '@/App.tsx'
import store from './store'


const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
       <HashRouter>
         <App />
       </HashRouter>
    </Provider>
   
  </StrictMode>,
)
