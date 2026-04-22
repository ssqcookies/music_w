import type {RouteObject} from 'react-router-dom'
import {Navigate} from 'react-router-dom'
import {lazy} from 'react'
const Recommend = lazy(()=>import('@/views/discover/children-views/recommend'))
const Songs = lazy(()=>import('@/views/discover/children-views/songs'))
const Djradio = lazy(()=>import('@/views/discover/children-views/djradio'))
const Album = lazy(()=>import('@/views/discover/children-views/album'))
const Artist = lazy(()=>import('@/views/discover/children-views/artist'))
const Ranking = lazy(()=>import('@/views/discover/children-views/ranking'))

const Discover = lazy(()=>import('@/views/discover'))
const Mine = lazy(()=>import('@/views/mine'))
const Download = lazy(()=>import('@/views/download'))
const Focus = lazy(()=>import('@/views/focus'))


const routes:RouteObject[] = [
  {
    path:'/',
    element:<Navigate to="/discover"/>
  },
  {
    path:'/discover',
    element:<Discover/>,
    children:[
      {
         path:'/discover/recommend',
         element:<Navigate to="/discover/recommend"/>,
      },
        {
         path:'/discover/songs',
         element:<Songs/>,
      },
        {
         path:'/discover/djradio',
         element:<Djradio/>,
      },
        {
         path:'/discover/album',
         element:<Album/>,
      },
        {
         path:'/discover/ranking',
         element:<Ranking/>,
      },
      {
         path:'/discover/artist',
         element:<Artist/>,
      }
    ]
  },
   {
    path:'/mine',
    element:<Mine/>
  },
   {
    path:'/download',
    element:<Download/>
  },
   {
    path:'/focus',
    element:<Focus/>
  },
]

export default routes