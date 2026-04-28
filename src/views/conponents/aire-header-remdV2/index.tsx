
import { FC, memo, ReactNode } from "react"
import {  HeaderV2Wrapper } from "./style"
import { Link } from "react-router-dom"

interface IProps {
  children?: ReactNode
  title?: string
  moreText?: string
  moreLink?: string
}
const AireHeaderRemdV2: FC<IProps> = (props: IProps) => {
  const { title = '默认标题', moreText, moreLink } = props

  return (
    <HeaderV2Wrapper>
      <h3 className="title">{title}</h3>
      {moreText && moreLink && <Link to={moreLink}>{moreText}</Link>}
    </HeaderV2Wrapper>
  )
}

export default memo(AireHeaderRemdV2)