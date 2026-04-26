import styled from 'styled-components'
export const RecommendSection = styled.div`
  border: 1px solid #d3d3d3;
  width: 980px;
  background-image: url(${new URL('@/assets/img/wrap-bg.png',import.meta.url).href});
  display: flex;
`
export const RecommendLeft = styled.div`
  padding: 20px;
  width: 729px;
`
export const RecommendRight = styled.div`
  width: 250px;
  margin-left:2px
`

export const RecommendWrapper = styled.div`
  position: relative;
  background-image: url(${new URL('@/assets/img/body_bg.jpeg',import.meta.url).href});
  background-repeat: no-repeat;
  background-size: 2166px;
  background-position: center -8px;
  min-height: 1000px;

  &::before {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translate(-716px);
    width: 225px;
    height: 120px;
    background-image:url(${new URL('@/assets/img/body_bg02.jpeg',import.meta.url).href});
  background-repeat: no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    content: '';
  }

  &::after {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translate(492px);
    width: 196px;
    height: 131px;
    background: url(${new URL('@/assets/img/body_bg03.png',import.meta.url).href});
  background-repeat: no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    content: '';
  }
`
