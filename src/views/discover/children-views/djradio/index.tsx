import { memo, ReactNode } from "react";

interface IProps {
  children?:ReactNode
}

const Djradio = ({children}:IProps)=>{
  return <div>Djradio {children}</div>
}

export default memo(Djradio)