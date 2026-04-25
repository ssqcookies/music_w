import { useAppSelector } from "@/store"
import {  FC, memo, ReactNode, useCallback, useRef, useState } from "react"
import { shallowEqual } from "react-redux"
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from "./style"
import { Carousel } from "antd"
import classNames from 'classnames'

import type {ComponentRef} from "react"
interface IProps {
  children?: ReactNode
}
const TopBanner: FC<IProps> = () => {
  /** 记录轮播图的播放序号 */
  const [currentIndex, setCurrentIndex] = useState(0)

  const bannerRef = useRef<ComponentRef<typeof Carousel>>(null)
  const divRef = useRef<HTMLDivElement>(null)

  /** redux中获取数据 */
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )


 /** 事件监听的方法 */
 const bannerChange = useCallback((from: number, to: number) => {
  setTimeout(() => {
    setCurrentIndex(to)
  }, 0)
}, [])

 /** 获取背景图片，动态传入 */
  const bgImage =
    banners[currentIndex] &&
    banners[currentIndex].bannerPic + '?imageView&blur=40x20'
  return <div>
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2" ref={divRef}>
        <BannerLeft>
          <Carousel
            dots={false}
            autoplay
            ref={bannerRef}
            effect="fade"
            beforeChange={bannerChange}
            autoplaySpeed={3000}
          >

            {
              banners.map((item: any) => {
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img
                      className="image"
                      src={item.bannerPic}
                      alt={item.typeTitle}
                    />
                  </div>
                )
              })
            }
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: currentIndex === index
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
      <BannerControl>
        <button
          className="btn left"
          onClick={() => bannerRef.current?.prev()}
        ></button>
        <button
          className="btn right"
          onClick={() => bannerRef.current?.next()}
        ></button>
      </BannerControl>
      </div>
     
    </BannerWrapper>

  </div>
}

export default memo(TopBanner)