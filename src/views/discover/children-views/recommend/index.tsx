import { useAppDispatch } from "@/store";
import { memo, ReactNode, useEffect } from "react";
import { fetchBannerDataAction } from "./store";
import TopBanner from "./components/top-banner";

interface IProps {
  children?:ReactNode
}

const Recommoend = ({children}:IProps)=>{
  /**发起action（获取数据） */
    const dispatch = useAppDispatch()
    useEffect(()=>{
      dispatch(fetchBannerDataAction())
    },[])

  return <div>
    <TopBanner></TopBanner>
  </div>
}

export default memo(Recommoend)