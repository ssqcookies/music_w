
import { memo, type FC, type ReactNode } from 'react'
import { LoginWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const UserLogin: FC<IProps> = () => {
  return (
    <LoginWrapper >
      <img className='dis_vip_card_img' src={getImageSize('https://music.163.com/style/web2/img/dis_vip_card.png',100)}></img>
      <div className='user-profile sprite_02'>
      <p className="desc">
        登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
      </p>
      <a href="#/login" className="sprite_02">
        用户登录
      </a>
      </div>
     
    </LoginWrapper>
  )
}

export default memo(UserLogin)
