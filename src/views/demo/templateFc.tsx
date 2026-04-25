import { memo, ReactNode } from "react";

interface IProps {
  children?:ReactNode
}

const Template = ({children}:IProps)=>{
  return <div>template {children}</div>
}

export default memo(Template)


// import {Link} from 'react-router-dom'
// import { memo, ReactNode,FC } from "react";

// interface IProps {
//   children?:ReactNode
// }

// const AppHeader:FC<IProps> = ()=>{
//   return  <div className="nav">   
//     </div>
// }

// export default memo(AppHeader)