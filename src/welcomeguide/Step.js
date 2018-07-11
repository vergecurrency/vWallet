import React from 'react'
import { TitleBar } from 'electron-react-titlebar'
import styled from 'styled-components'
import logo from '../assets/images/verge-logo-white.png'
import { platform } from 'os'

const Background = styled.div`
  background-color: #07121b;
  background-image: linear-gradient(
    38deg,
    #07121b 0%,
    #0c1b27 48%,
    #07121b 100%
  );
  height: 100%;
  text-align: center;
  align-content: center;
  align-items: center;
  display: grid;
`

const Title = styled.p`
  color: #fcf1eb;
  font-size: 90px;
  font-weight: 500;
  line-height: 70%;
  /* Text style for "Hello" */
  color: #00b8dc;
`

const SmallTitle = styled.p`
  height: 61px;
  color: #ffffff;
  font-size: 60px;
  font-weight: 400;
  margin-bottom: 40px;
`

const SubTitle = styled.p`
  color: #fcf1eb;
  font-size: 35px;
  font-weight: 400;
  margin-bottom: 45px;
`

const LogoFix = styled.div`
  position: fixed;
  bottom: 40px;
  left: 60px;
  color: #fff;
`

const BackLink = styled.div`
  position: fixed;
  bottom: 40px;
  right: 60px;
  color: #fff;
`

export default ({ title, subtitle, small, component, history, ...props }) => {
  return (
    <div style={{ height: '100%' }}>
      <TitleBar menu={[]} className={platform()} />
      <Background>
        {!small ? <Title>{title}</Title> : <SmallTitle>{title}</SmallTitle>}
        <SubTitle>{subtitle}</SubTitle>
        {props.children}
        <LogoFix>
          <img src={logo} width="125px" />
        </LogoFix>
        {history ? (
          <BackLink>
            <a onClick={() => history.goBack()}>{'< Back'}</a>
          </BackLink>
        ) : null}
      </Background>
    </div>
  )
}
