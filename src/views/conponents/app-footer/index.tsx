

import { memo, ReactNode,FC } from "react";

interface IProps {
  children?:ReactNode
}

const AppFooter:FC<IProps> = ()=>{
  return  <div className="footer">
     footer
    </div>
}

export default memo(AppFooter)