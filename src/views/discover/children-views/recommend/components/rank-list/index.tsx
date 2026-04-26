import { FC, memo, ReactNode, } from "react"

import { RankingListWrapper } from "./style"
import AireHeaderRemd from "@/views/conponents/aire-header-remd"
import RankingListItem from '../rank-list-item'
import { useAppSelector } from "@/store"
import { shallowEqual } from "react-redux"
interface IProps {
  children?: ReactNode
}
const RankingList: FC<IProps> = () => {
  /** redux中获取数据 */
  const { rankingList } = useAppSelector(
    (state) => ({
      rankingList: state.recommend.rankingList
    }),
    shallowEqual
  )
  console.log("rankingList", rankingList)
  return <RankingListWrapper>
    <AireHeaderRemd title="榜单" morePath="/discover/ranking" />
    <div className="content">
      {rankingList.map(item => {
        return (
          <RankingListItem key={item.id} itemData={item}></RankingListItem>
        )
      })}
    </div>
  </RankingListWrapper>
}

export default memo(RankingList)