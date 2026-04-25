import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import { ThemeProvider } from 'styled-components'

// 导入 theme
import theme from '@/assets/theme/index.ts'
import 'normalize.css'
// 引入 Ant Design 重置样式
import 'antd/dist/reset.css'
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
      <ThemeProvider theme={theme}>
       <HashRouter>
         <App />
       </HashRouter>
       </ThemeProvider>
    </Provider>
   
  </StrictMode>,
)
