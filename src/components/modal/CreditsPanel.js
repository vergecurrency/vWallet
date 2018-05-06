import React from 'react'
import { Button, Input, Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'
import Modal from '../Modal'
import github from '../../assets/images/github.png'
import T from 'i18n-react'

const Title = styled.p`
	color: #476b84;
	font-size: 18px;
	font-weight: 400;
	line-height: 20px;
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

const SubTitle = styled.p`
	color: #909090;
	font-family: 'Avenir Next';
	font-size: 12px;
	font-weight: 400;
	line-height: 30px;
`
const UnlockButton = styled.button`
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

const TitleItem = styled.span`
	color: #476b84;
	font-size: 16px;
	font-weight: 400;
`

const NameItem = styled.div`
	color: #647e90;
	font-size: 15px;
	font-weight: 400;
	line-height: 1.5em;
`

const ContributorButton = styled.button`
	width: 253px;
	height: 62px;
	border-radius: 4px;
	background-color: #25292e;
	border: 0;
	box-shadow: none;
	color: #ffffff;
	font-size: 18px;
	font-weight: 400;
	line-height: 29.02px;
	text-align: center;
	margin-top: 35px;
`

const CenterContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`

const githubImage = styled.img`
	width: 16px;
	height: 16px;
`

export default props => (
	<Modal {...props} title="Credits">
		<Row>
			<Col md="6">
				<TitleItem>{T.translate('credits.development')}</TitleItem>
			</Col>
			<Col md="6">
				<NameItem>Justin, @justinvendetta</NameItem>
				<NameItem>Marvin, @marpme_</NameItem>
			</Col>
		</Row>
		<hr />
		<Row>
			<Col md="6">
				<TitleItem>{T.translate('credits.design')}</TitleItem>
			</Col>
			<Col md="6">
				<NameItem>Hassan, @waveon3</NameItem>
			</Col>
		</Row>
		<hr />
		<Row>
			<Col md="6">
				<TitleItem>{T.translate('credits.translation')}</TitleItem>
			</Col>
			<Col md="6">
				<NameItem>Marvin, @marpme_ (English/German)</NameItem>
			</Col>
		</Row>

		<CenterContainer>
			<ContributorButton>
				<img src={github} /> {T.translate('credits.contributorButton')}
			</ContributorButton>
		</CenterContainer>
	</Modal>
)
