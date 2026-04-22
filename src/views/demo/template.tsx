import { memo, ReactNode } from "react";

interface IProps {
  children?:ReactNode
}

const Template = ({children}:IProps)=>{
  return <div>template {children}</div>
}

export default memo(Template)