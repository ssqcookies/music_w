

import { memo, ReactNode,FC } from "react";
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style';
import headerTitles from '@/assets/data/header-title.json'
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
interface IProps {
  children?:ReactNode
}

const AppHeader:FC<IProps> = ()=>{

  //组件展示逻辑
  function showSelectItem(item:any){
    if(item.type === 'path'){
      return (
        <div className="select-item" key={item.title}>
          <NavLink to={item.link}  className={({ isActive }) => (isActive ? 'active' : '')}>
            {item.title}
            <i className="icon sprite_01"></i>
            </NavLink>
        </div>
      )
    }else{
      return (
        <div className="select-item" key={item.title}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
        </div>
      )
    }
    
  }
  return  <HeaderWrapper>
    <div className='content'>
       <HeaderLeft>
        <a className="logo sprite_01" href=''>网易云音乐</a>
        <div className="select-list">
          {
            headerTitles.map(item=>{
              return showSelectItem(item)
            })
          }
        </div>
       </HeaderLeft>
       <HeaderRight>
       <Input
            className="search"
            prefix={<SearchOutlined />}
            placeholder="音乐/视频/电台/用户"
          />
        <span className="center">创作者中心</span>
        <span className="login ">登录</span>
       </HeaderRight>
    </div>
    <div className="divider"></div>
    </HeaderWrapper>
}

export default memo(AppHeader)