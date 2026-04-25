import { FC, memo, ReactNode } from "react"
import { discoverMenu } from "@/assets/data/local-data"
import {  NavLink } from "react-router-dom"
import { NavWrapper } from "./style"

interface IProps {
  children?:ReactNode
}
const NavBar :FC<IProps>= () => {
  return (
    <NavWrapper >
        <div className="nav wrap-v1">
          {discoverMenu.map(item=>{
            return (
              <div className="item" key={item.title}>
                <NavLink to={item.link} className={({ isActive }) => (isActive ? 'active' : '')}>{item.title}</NavLink>
              </div>
            )
          })}
        </div>
     
    </NavWrapper>
  )
}

export default memo(NavBar)