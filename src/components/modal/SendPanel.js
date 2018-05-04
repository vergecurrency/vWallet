import React from 'react'
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
	bottom: 266px;
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

export default props => (
	<Modal {...props} title="Send XVG">
		<Title>Reciepent Address</Title>
		<InputContainer>
			<InputHandler
				name="address"
				id="passpharse"
				/*style={{ width: '396px' }}*/
				style={{ width: '460px' }}
			/>
			{/*<FolderButton />*/}
		</InputContainer>
		<SubTitle>
			Please ONLY enter an XVG address. Funds will be lost otherwise.
		</SubTitle>
		<Title>Label</Title>
		<InputHandler
			placeholder="Example: Johns wallet address"
			style={{ width: '460px' }}
		/>
		<SubTitle>
			Enter a label for this address to add it in your addressbook.
		</SubTitle>
		<Title>Amount</Title>
		<InputHandler placeholder="Enter amount" style={{ width: '460px' }} />
		<Marker>XVG</Marker>
		<SubTitle>Transaction fee, 0.1 XVG</SubTitle>
		<hr />
		<Container style={{ marginBottom: '20px' }}>
			<Row>
				<Col md="4">
					<BalanceTitle>XVG in USD</BalanceTitle>
					<Balance>$32,011.60</Balance>
				</Col>
				<Col md="8">
					<BalanceTitle>Balance in XVG</BalanceTitle>
					<Balance>280,213,000.901823 XVG</Balance>
				</Col>
			</Row>
		</Container>
		<SendButton onClick={props.toggle}>Send</SendButton>

		<SubTitle
			style={{
				textAlign: 'center',
				marginTop: '20px',
				fontSize: '12px',
				fontWeight: '400',
				lineHeight: '19px',
			}}
		>
			Doublecheck that the wallet address is correct. Verge Currency
			cannot be held accountable for loss of XVG sent to wrong wallets.
		</SubTitle>
	</Modal>
)
