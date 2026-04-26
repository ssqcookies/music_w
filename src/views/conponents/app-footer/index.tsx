

import { memo, ReactNode,FC } from "react";
import { HeaderWrapper, LiWrapper } from "./style";
import footerLink from '@/assets/data/footer-link.json'
import {footerLinks} from '@/assets/data/local-data'
interface IProps {
  children?:ReactNode
}

const AppFooter:FC<IProps> = ()=>{
  return  <HeaderWrapper>
    <ul className="enter">
        {footerLink.map(item=>{
          return (
            <LiWrapper bgp={item.bgp} hbgp={item.hbgp} key={item.link}>
                <a className="logonew foot_enter_new2" href={item.link} target="_blank"></a>
                <span className="tt">{item.title}</span>
            </LiWrapper>
          
          )
        })}
    </ul>
    <div className="copy">
      <div className="link">
      {
        footerLinks.map(item=>{
          return (
            <div className="link-item" key={item.title}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
            <span className="line">|</span>
          </div>
          )
        })
      }
      </div>
      <div >网易公司版权所有©1997-2026</div>
      <div >学习作品，只用于练习学习知识,无其他盈利或非法行为</div>
    
    </div>
  </HeaderWrapper>
}

export default memo(AppFooter)