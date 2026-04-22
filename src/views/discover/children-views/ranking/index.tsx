import { memo, ReactNode } from "react";

interface IProps {
  children?:ReactNode
}

const Ranking = ({children}:IProps)=>{
  return <div>Ranking {children}</div>
}

export default memo(Ranking)