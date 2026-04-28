
import { memo, type FC, type ReactNode } from 'react'
import { SingerWrapper } from './style'

import { getImageSize } from '@/utils/format'
import AireHeaderRemdV2 from '@/views/conponents/aire-header-remdV2'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {

const { artistsList } = useAppSelector(
  (state) => ({
    artistsList: state.recommend.artistsList
  }),
  shallowEqual
)

  return (
    <SingerWrapper>
      <AireHeaderRemdV2
        title="入驻歌手"
        moreText="查看全部 &gt;"
        moreLink="#/discover/artist"
      />
      <div className="artists">
        {artistsList.map((item) => {
          return (
            <a href="#/discover/artist" className="item" key={item.id}>
              <img src={getImageSize(item.coverImgUrl, 80)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alias">{item.transName}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for " >
        <a href="#/" className='sprite_button'>申请成为网易音乐人</a>
      </div>
    </SingerWrapper>
  )
}

export default memo(SettleSinger)


