import styled from 'styled-components'


export const HeaderWrapper = styled.div`
    position: relative;
    height: 325px;
    overflow: hidden;
    border-top: 1px solid #d3d3d3;
    background: #f2f2f2;
  
    .enter{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 33px;
    }

    .copy{
        padding-top: 60px;
        line-height: 24px;
        margin: 0 auto;
        text-align: center;
        .link{
         display: flex;
         justify-content: center;
                .link-item{
                    display:flex
                }
                .line{
                    margin: 0 8px 0 8px;
                    color: #D9D9D9;
                }
        }
       
    }
`
interface FooterEnterProps {
    bgp: string,
    hbgp: string,
  }
export const LiWrapper = styled.li<FooterEnterProps>`
  width: 45px;
            margin-left: 80px;
            text-align: center;
            color: #666;
            .logonew{
                display: block;
                float: none;
                width: 45px;
                height: 45px;
                margin: 0 auto;
                background-position: ${(props) => props.bgp};
                background-size: 220px 220px;
                &:hover{
                background-position: ${(props) => props.hbgp};
                
                }
            }
                .tt{
                  display: inline-block;
                  width: 100px;
                  margin-top: 10px;
                  margin-left: -27.5px;
                  font-weight: 400;
                  font-size: 12px;
                  text-align: center;
                  color: rgba(0, 0, 0, 0.5);
                }
`

    