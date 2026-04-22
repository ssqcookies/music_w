import { memo, ReactNode,FC } from "react";

interface IProps {
  children?:ReactNode
}

const Download : FC<IProps>=()=>{
  return <div>Download </div>
}

export default memo(Download)