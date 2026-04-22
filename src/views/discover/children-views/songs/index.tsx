import { memo, ReactNode } from "react";

interface IProps {
  children?:ReactNode
}

const Songs = ({children}:IProps)=>{
  return <div>Songs {children}</div>
}

export default memo(Songs)