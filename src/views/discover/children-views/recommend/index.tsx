import { memo, ReactNode } from "react";

interface IProps {
  children?:ReactNode
}

const Recommond = ({children}:IProps)=>{
  return <div>Recommond {children}</div>
}

export default memo(Recommond)