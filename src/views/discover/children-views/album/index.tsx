import { memo, ReactNode } from "react";

interface IProps {
  children?:ReactNode
}

const Album = ({children}:IProps)=>{
  return <div>Album {children}</div>
}

export default memo(Album)