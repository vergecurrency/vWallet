import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import banner from '../assets/images/banner.png'
import styled from 'styled-components'
import LoadingIcon from '../components/LoadingIcon'
import vergeLogo from '../assets/images/verge-logo-white.png'
import { inject, observer } from 'mobx-react'
import { ipcRenderer } from 'electron'

const Verge = styled.span`
	color: #5dacc5;
	font-weight: 500px;
	font-size: 18px;
`
const Title = styled.div`
	color: #d5dfe8;
	font-weight: 500px;
	font-size: 18px;
`

const Header = styled.span`
	font-weight: 400px;
	font-size: 12px;
	color: #9ba3ac;
`

const Thanks = styled.div`
	font-weight: 400px;
	font-size: 10px;
	line-height: 1.5em;
	color: #9ba3ac;
`

const Artwork = styled.div`
	margin-top: 10px;
	font-weight: 400px;
	font-size: 12px;
	line-height: 1.8em;
	color: #9ba3ac;
`

const Artist = styled.span`
	font-weight: 600px;
	font-style: bold;
	font-size: 12px;
	line-height: 1.8em;
	color: #a5adb6;
`

@inject('CoinStatsStore')
@observer
export default class LoadingRoot extends React.Component {
	componentDidUpdate() {
		console.warn('We got updated!')
		if (this.props.CoinStatsStore.getUpdatedStats.price) {
			ipcRenderer.send('finalized-loading')
		} else {
			console.error('wrong')
			console.log(this.props.CoinStatsStore.getUpdatedStats)
		}
	}

	render() {
		return (
			<Container
				fluid={true}
				style={{ backgroundColor: '#121c29', height: '576px' }}
			>
				<span>{this.props.CoinStatsStore.getUpdatedStats.price}</span>
				<Row style={{ maxWidth: '825px', objectFit: 'cover' }}>
					<img
						src={banner}
						style={{
							height: '450px',
							width: '825px',
						}}
					/>{' '}
				</Row>
				<Row>
					<Col
						sm="3"
						style={{
							paddingTop: '20px',
							paddingLeft: '30px',
						}}
					>
						<Header>Official</Header>
						<Title>
							<Verge>Verge</Verge> Core Wallet
						</Title>
						<Header>version 0.0.4 (alpha)</Header>
					</Col>
					<Col
						sm="6"
						style={{
							paddingTop: '20px',
							paddingLeft: '20px',
						}}
					>
						<Thanks>
							Special thanks to Sunerok, CryptoRekt, Marpme,
							Waveon3, MKinney, BearSylla, Hypermist, Pallas1,
							FuzzBawls, BuZz, glodfinch, InfernoMan, AhmedBodi,
							BitSpill, MentalCollatz, ekryski and the entire
							#VERGE community!
						</Thanks>
						<Artwork>
							Community artwork by{' '}
							<Artist>Community Member @marpme_</Artist>
						</Artwork>
					</Col>
					<Col
						sm="3"
						style={{
							textAlign: 'right',
							paddingTop: '20px',
							paddingRight: '30px',
						}}
					>
						{' '}
						<div>
							<LoadingIcon color="white" height="35" width="35" />
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
			</Container>
		)
	}
}
