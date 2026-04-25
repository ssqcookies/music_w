import { memo, ReactNode, useEffect } from "react";

interface IProps {
  children?:ReactNode
}

const Ranking = ({children}:IProps)=>{
  useEffect(() => {
    fetch('/api/banners') // 注意：这里用相对路径，Vite 会代理
      .then(data => console.log('✅ 数据:', data))
      .catch(err => console.error('❌ 错误:', err));
  }, []);
  return <div>Ranking {children}</div>
}

export default memo(Ranking)