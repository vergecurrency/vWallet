import React from 'react'
import T from 'i18n-react'
import { Button, Input, Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import Modal from '../Modal'

const Title = styled.p`
	color: #476b84;
	font-size: 18px;
	font-weight: 400;
	line-height: 20px;
`

const FolderButton = styled.button`
	margin-left: 20px;
	width: 44px;
	height: 45px;
	border-radius: 3px;
	border: 1px solid #dcdcdc;
	background-color: #f6f6f6;
`

const SubTitle = styled.p`
	color: #909090;
	font-family: 'Avenir Next';
	font-size: 12px;
	font-weight: 400;
	line-height: 30px;
`

const InputHandler = styled.input`
	box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.09);
	border-radius: 3px;
	border: 1px solid #dcdcdc;
	color: #9e9e9e;
	font-size: 14px;
	font-style: italic;
	height: 45px;
	padding: 15px;
`

const InputContainer = styled.div`
	display: inline-flex;
`

const Marker = styled.span`
	color: #000;
	position: absolute;
	left: 423px;
	height: 43px;
	padding-top: 11px;
	bottom: 313px;
	padding-left: 10px;
	border-left: 1px solid #dcdcdc;
	font-weight: 400;
	color: #5e5e5e;
`

const BalanceTitle = styled.div`
	text-shadow: 0 0 73px rgba(255, 255, 255, 0.1);
	color: #476b84;
	font-size: 8px;
	font-weight: 400;
	line-height: 10.53px;
	text-transform: uppercase;
	/* Text style for "X, VG IN U" */
	letter-spacing: 2.12px;
`

const Balance = styled.div`
	text-shadow: 0 0 73px rgba(255, 255, 255, 0.1);
	color: #476b84;
	font-size: 20px;
	font-weight: 400;
	line-height: 20.54px;
`

const SendButton = styled.button`
	width: 460px;
	height: 62px;
	border-radius: 4px;
	background-color: #00b8dc;
	border: 0;
	box-shadow: none;
	color: #ffffff;
	font-size: 18px;
	font-weight: 400;
	line-height: 29.02px;
`

const FEE = 0.1
const PRICE = 0.0872
const BALANCE = 75124114.5167

export default class SendPanel extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			amount: 0,
			address: '',
			label: '',
		}
	}
	render() {
		const props = this.props
		return (
			<Modal {...props} title="Send XVG">
				<Title>{T.translate('sendPanel.recipient')}</Title>
				<InputContainer>
					<InputHandler
						value={this.state.address}
						name="address"
						id="passpharse"
						onChange={e =>
							this.setState({ address: e.target.value })
						}
						/*style={{ width: '396px' }}*/
						style={{ width: '460px' }}
					/>
					{/*<FolderButton />*/}
				</InputContainer>
				<SubTitle>{T.translate('sendPanel.fundwarning')}</SubTitle>
				<Title>{T.translate('sendPanel.addressLabel')}</Title>
				<InputHandler
					placeholder="Example: Johns wallet address"
					value={this.state.label}
					onChange={e => this.setState({ label: e.target.value })}
					style={{ width: '460px' }}
				/>
				<SubTitle>{T.translate('sendPanel.labelInfo')}</SubTitle>
				<Title>{T.translate('sendPanel.amount')}</Title>
				<InputHandler
					value={this.state.amount}
					onChange={e => this.setState({ amount: e.target.value })}
					placeholder="Enter amount"
					style={{ width: '460px' }}
				/>
				<Marker>XVG</Marker>
				<SubTitle>{T.translate('sendPanel.amountInfo')}</SubTitle>
				<hr />
				<Container style={{ marginBottom: '20px' }}>
					<Row>
						<Col md="5">
							<BalanceTitle>
								{T.translate('sendPanel.xvgUSD')}
							</BalanceTitle>
							<Balance>
								${(BALANCE * PRICE).toLocaleString('en-US')}
							</Balance>
						</Col>
						<Col md="7">
							<BalanceTitle>
								{T.translate('sendPanel.balanceXVG')}
							</BalanceTitle>
							<Balance>
								{BALANCE.toLocaleString('en-US')} XVG
							</Balance>
						</Col>
					</Row>
				</Container>
				<SendButton onClick={props.toggle}>
					{T.translate('sendPanel.sendButton')}{' '}
					{this.state.amount
						? `${(this.state.amount - FEE).toLocaleString(
								'en-US'
						  )} XVG ($${(this.state.amount * PRICE).toLocaleString(
								'en-US'
						  )})`
						: ''}
				</SendButton>

				<SubTitle style={{ textAlign: 'center', color: '#476b84' }}>
					{T.translate('sendPanel.walletAfterTransaction')}{' '}
					<b>
						{(BALANCE - this.state.amount).toLocaleString('en-US')}{' '}
						XVG
					</b>
				</SubTitle>
				<hr />
				<SubTitle
					style={{
						textAlign: 'center',
						marginTop: '20px',
						fontSize: '12px',
						fontWeight: '400',
						lineHeight: '19px',
					}}
				>
					{T.translate('sendPanel.sendWarning')}
				</SubTitle>
			</Modal>
		)
	}
}
