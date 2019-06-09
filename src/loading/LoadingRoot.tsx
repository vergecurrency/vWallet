import * as React from 'react'
import * as vergeLogo from '../assets/images/verge-logo-white.png'

import { Col, Container, Row } from 'reactstrap'
import { inject, observer } from 'mobx-react'

import { CoinStatsStore } from '../stores/CoinStatsStore'
import LoadingIcon from '../components/LoadingIcon'
import { SettingsStore } from '../stores/SettingsStore'
import styledComponents from 'styled-components'
import { AccountInformationStore } from '../stores/AccountInformationStore'
const { ipcRenderer } = require('electron')

const Verge = styledComponents.span`
  color: #5dacc5;
  font-weight: 500px;
  font-size: 18px;
`
const Title = styledComponents.div`
  color: #d5dfe8;
  font-weight: 500px;
  font-size: 18px;
`

const Header = styledComponents.span`
  font-weight: 400px;
  font-size: 12px;
  color: #9ba3ac;
`

const Thanks = styledComponents.div`
  font-weight: 400px;
  font-size: 10px;
  line-height: 1.5em;
  color: #9ba3ac;
`

const Artwork = styledComponents.div`
  margin-top: 10px;
  font-weight: 400px;
  font-size: 12px;
  line-height: 1.8em;
  color: #9ba3ac;
`

const Artist = styledComponents.span`
  font-weight: 600px;
  font-style: 500;
  font-size: 12px;
  line-height: 1.8em;
  color: #a5adb6;
`

const vergeFamSplashes = [
  {
    splash: 'splash-1',
    contributer: 'CryptoFan @EngardeMedia',
  },
  {
    splash: 'splash-2',
    contributer: 'Abigail @KillerReich',
  },
  {
    splash: 'splash-3',
    contributer: 'sturdy.cookie @sturdycookie',
  },
  {
    splash: 'splash-4',
    contributer: 'sturdy.cookie @sturdycookie',
  },
]

const randomSplashIndex = Math.floor(Math.random() * vergeFamSplashes.length)

class LoadingRoot extends React.Component<{
  CoinStatsStore?: CoinStatsStore
  SettingsStore?: SettingsStore
  AccountInformationStore?: AccountInformationStore,
}> {
  render() {
    const vergeStatus = this.props.AccountInformationStore!.getUpdatedInfo
      .blocks
    if (vergeStatus) {
      ipcRenderer.send('loading-finished')
    }
    return (
      <Container
        className={['splash', vergeFamSplashes[randomSplashIndex].splash].join(
          ' ',
        )}
        fluid={true}
        style={{ backgroundColor: '#121c29', height: '576px' }}
      >
        <span style={{ position: 'absolute', left: '-1000px' }}>
          {vergeStatus}
        </span>
        <Row />
        <div
          style={{
            marginLeft: '-15px',
            paddingRight: '40px',
            paddingLeft: '40px',
            paddingTop: '32px',
            marginTop: '426px',
            width: '825px',
            height: '150px',
            backgroundColor: 'rgba(7,18,27,0.90)',
          }}
        >
          <Row>
            <Col sm="3">
              <Header>Official</Header>
              <Title>
                <Verge>Verge</Verge> Core Wallet
              </Title>
              <Header>version v{this.props.SettingsStore!.appVersion}</Header>
            </Col>
            <Col sm="6">
              <Thanks>
                Special thanks to Sunerok, CryptoRekt, Marpme, Waveon3, MKinney,
                BearSylla, Hypermist, Pallas1, FuzzBawls, BuZz, glodfinch,
                InfernoMan, AhmedBodi, BitSpill, MentalCollatz, ekryski and the
                entire #VERGE community!
              </Thanks>
              <Artwork>
                Artwork by{' '}
                <Artist>
                  {vergeFamSplashes[randomSplashIndex].contributer}
                </Artist>
              </Artwork>
            </Col>
            <Col
              sm="3"
              style={{
                textAlign: 'right',
              }}
            >
              {' '}
              <div>
                <LoadingIcon
                  color="white"
                  height={35}
                  width={35}
                  strokeWidth={2}
                />
              </div>
              <img
                src={vergeLogo}
                style={{
                  height: 'auto',
                  width: '50%',
                  paddingTop: '10px',
                }}
              />
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

export default inject(
  'CoinStatsStore',
  'SettingsStore',
  'AccountInformationStore',
)(observer(LoadingRoot))
