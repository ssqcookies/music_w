import styled from 'styled-components'

export const AlbumItemWrapper = styled.div`
  .top {
    position: relative;
    width: 118px;
    height: 100px;
    overflow: hidden;
    margin-top: 15px;
    &:hover{
        >.play{
        display:block}
        }   
    img {
      width: 100px;
      height: 100px;
    }

    .cover {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-position: 0 -570px;
      text-indent: -9999px;
    }
    .play {
        display:none;
        position: absolute;
        right:23px;
        bottom: 5px;
        width: 16px;
        height: 17px;
        background-position: 0 0;
        } 
        
  }

  .bottom {
    font-size: 12px;
    width: 100px;
    .name {
      color: #000;
      ${(props) => props.theme.mixin.textNowrap}
      &:hover {
         text-decoration: underline;
         cursor:pointer
      }
    }

    .artist {
      color: #666;
      ${(props) => props.theme.mixin.textNowrap}
        &:hover {
         text-decoration: underline;
         cursor:pointer
      }
    }
  }
`
