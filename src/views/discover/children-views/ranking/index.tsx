
import { memo, ReactNode, useEffect } from "react";
import { fetchBannerDataAction } from "../recommend/store";
import { useAppDispatch } from "@/store";

interface IProps {
  children?:ReactNode
}

const Ranking = ({children}:IProps)=>{
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(fetchBannerDataAction())
  },[])
  return <div>Ranking {children}</div>
}

export default memo(Ranking)