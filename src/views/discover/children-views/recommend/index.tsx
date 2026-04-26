import { useAppDispatch } from "@/store";
import { FC, memo, ReactNode, useEffect } from "react";
import { fetchBannerDataAction, fetchHotRecommendListAction, fetchNewAlbumListAction, fetchRankingListAction } from "./store";
import TopBanner from "./components/top-banner";
import { RecommendLeft, RecommendRight, RecommendSection, RecommendWrapper } from "./style";
import HotRecommend from "./components/hot-recommend";
import NewAlbum from "./components/new-album";
import RankList from "./components/rank-list";

interface IProps {
  children?: ReactNode
}

const Recommoend : FC<IProps> = () => {
  /**发起action（获取数据） */
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBannerDataAction())
    dispatch(fetchHotRecommendListAction())
    dispatch(fetchNewAlbumListAction())
    dispatch(fetchRankingListAction())
  }, [])

  return (
    <RecommendWrapper>
    <TopBanner />
    <RecommendSection className="wrap-v2">
      <RecommendLeft>
        <HotRecommend />
        <NewAlbum/>
        <RankList/>
      </RecommendLeft>
      <RecommendRight>right</RecommendRight>
    </RecommendSection>
  </RecommendWrapper>
  )
}

export default memo(Recommoend)