import { useAppDispatch } from "@/store";
import { memo, ReactNode, useEffect } from "react";
import { fetchBannerDataAction } from "./store";

interface IProps {
  children?:ReactNode
}

const Recommond = ({children}:IProps)=>{
  console.log("11111")
  /**发起action（获取数据） */
    const dispatch = useAppDispatch()
    useEffect(()=>{
 

      dispatch(fetchBannerDataAction())
    },[])



  return <div>1111Recommond {children}</div>
}

export default memo(Recommond)