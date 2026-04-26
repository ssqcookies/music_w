
import { FC, memo, ReactNode } from "react"
import { HotWrapper } from "./style"
import AireHeaderRemd from "@/views/conponents/aire-header-remd"
import { useAppSelector } from "@/store"
import { shallowEqual } from "react-redux"
import SongCover from "@/views/conponents/song-cover"

interface IProps {
  children?: ReactNode
}
const HotRecommend: FC<IProps> = () => {
  /** redux中获取数据 */
  const { hotRecommends } = useAppSelector(
    (state) => (
      {
        hotRecommends: state.recommend.hotRecommends
      }),
    shallowEqual
  )



  const keywords = ['华语', '流行', '摇滚', '民谣', '电子']
  return (
    <HotWrapper>
      <AireHeaderRemd title="热门推荐"
        keywords={keywords}
        morePath="/discover/songs">
      </AireHeaderRemd>
      <div className="recommend-list">
          {hotRecommends.map((item) => {
            return <SongCover key={item.id} info={item}/>
          })}
        </div>
    </HotWrapper>
  )
}

export default memo(HotRecommend)

{/* <SectionItemV1 info={item} key={item.id} /> */ }