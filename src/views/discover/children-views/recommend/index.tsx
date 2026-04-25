import { useAppDispatch } from "@/store";
import { memo, ReactNode, useEffect } from "react";
import { fetchBannerDataAction } from "./store";

interface IProps {
  children?:ReactNode
}

const Recommoend = ({children}:IProps)=>{
  console.log("11111")
  /**发起action（获取数据） */
    // const dispatch = useAppDispatch()
    // useEffect(()=>{
    //   dispatch(fetchBannerDataAction())
    // },[])

    useEffect(() => {
      fetch('/api/banners') // 注意：这里用相对路径，Vite 会代理
        .then(res => res.json())
        .then(data => console.log('✅ 数据:', data))
        .catch(err => console.error('❌ 错误:', err));
    }, []);

  return <div>1111Recommond {children}</div>
}

export default memo(Recommoend)