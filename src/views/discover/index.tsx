import { memo, ReactNode,FC, Suspense } from "react";
import { Outlet} from "react-router-dom";
import NavBar from "./conponent/nav-bar";

interface IProps {
  children?:ReactNode
}

const Discover : FC<IProps>=()=>{
  return (
    <div>
     <NavBar></NavBar>
      <Suspense fallback=''>
           <Outlet />
      </Suspense>
    </div>
  )
}

export default memo(Discover)