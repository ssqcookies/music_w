import { memo, ReactNode } from "react";
import { SongCoverWrapper } from "./style";
import { Link } from "react-router-dom";
import { getImageSize, playCount } from "@/utils/format";

interface IProps {
  children?: ReactNode,
  info: any
}

const SongCover = ({ info }: IProps) => {
  return <SongCoverWrapper>
    <div className="cover-top">
      <img src={getImageSize(info.coverImgUrl, 140)} alt="" />
      <div className="cover sprite_cover">
        <div className="info sprite_cover">
          <span>
            <i className="sprite_icon headset"></i>
            {playCount(info.playCount)}
          </span>
          <button
            className="sprite_icon play"
          ></button>
        </div>
      </div>
    </div>
    <div className="cover-bottom"><Link to={info.targetUrl}>{info.name}</Link></div>
  </SongCoverWrapper>
}

export default memo(SongCover)