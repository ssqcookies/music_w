import { useAppSelector } from "@/store"
import AireHeaderRemd from "@/views/conponents/aire-header-remd"
import NewAlbumsItem from "@/views/conponents/new-albums-item"
import { AlbumWrapper } from "@/views/demo"
import { Carousel } from "antd"
import { ComponentRef, FC, memo, ReactNode, useRef } from "react"
import { shallowEqual } from "react-redux"

interface IProps {
  children?: ReactNode
}
const NewAlbum: FC<IProps> = () => {
  /** 定义内部数据 */
  const bannerRef = useRef<ComponentRef<typeof Carousel>>(null)


  const { newAlbumList } = useAppSelector(
    (state) => (
      {
        newAlbumList: state.recommend.newAlbumList
      }),
    shallowEqual
  )


  return <AlbumWrapper>
    <AireHeaderRemd title="新碟上架"
      morePath="/discover/album">
    </AireHeaderRemd>
    <div className="content">
      <button
        className="sprite_02 arrow arrow-left"
        onClick={() => bannerRef.current?.prev()}
      ></button>
      <div className="banner">
        <Carousel ref={bannerRef} dots={false} speed={1500}>
          {
            [0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbumList.map((album:any) => {
                      return <NewAlbumsItem key={album.id} itemData={album} />
                    })}
                  </div>
                </div>
              )
            })
          }
        </Carousel>
      </div>
      <button
        className="sprite_02 arrow arrow-right"
        onClick={() => bannerRef.current?.next()}

      ></button>

    </div>
  </AlbumWrapper>
}

export default memo(NewAlbum)
