
import { FC, memo, ReactNode } from "react"
import { AireHeaderWapper } from "./style"
import { Link } from "react-router-dom"

interface IProps {
  children?: ReactNode
  title: string
  keywords?: string[]
  morePath: string,
  moreText?:string
}
const AireHeaderRemd: FC<IProps> = (props: IProps) => {
  const { title, keywords = [], morePath ,moreText = '更多'} = props
  return (
    <AireHeaderWapper className="sprite_02">
      <div className="left">
        <h2 className="title">{title}</h2>
        <div className="keyword">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link to={morePath}>{moreText}</Link>
        <i className="icon sprite_02"></i>
      </div>
    </AireHeaderWapper>
  )
}

export default memo(AireHeaderRemd)