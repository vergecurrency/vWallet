import React from 'react'
import { TitleBar } from 'electron-react-titlebar'
import styled from 'styled-components'
import Step from '../Step'
import { Link } from 'react-router-dom'

const NewButton = styled.button`
	width: 192px;
	height: 95px;
	border-radius: 4px;
	background-color: #00b8dc;
	color: #fff;
	border: none;
	height: 78px;
	font-size: 27px;
	font-weight: 400;
	line-height: 33.78px;
`

const PasswordField = styled.input`
	width: 600px;
	height: 78px;
	border-radius: 4px;
	background-color: #ffffff;
	color: #9ba8ab;
	font-family: 'Avenir Next';
	font-size: 28px;
	font-style: italic;
	line-height: 78px;
	padding-left: 40px;
	padding-top: 30px;
	padding-bottom: 30px;
	margin-right: 30px;
`
export default props => {
	return (
		<Step
			title={'Create a password.'}
			subtitle={'Choose a password to secure your wallet.'}
			small
		>
			<div>
				<PasswordField
					type="password"
					placeholder="Enter a strong password"
				/>
				<Link to="/wallet/create">
					<NewButton>Contiune</NewButton>
				</Link>
			</div>
		</Step>
	)
}
