import { memo, ReactNode,FC } from "react";

interface IProps {
  children?:ReactNode
}

const Focus : FC<IProps>=()=>{
  return <div>Focus </div>
}

export default memo(Focus)