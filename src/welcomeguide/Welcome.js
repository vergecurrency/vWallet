import React from 'react'
import { TitleBar } from 'electron-react-titlebar'
import styled from 'styled-components'
import Step from './Step'
import { Link } from 'react-router-dom'

const NewButton = styled.button`
	border-radius: 4px;
	background-color: #00b8dc;
	box-shadow: none;
	color: #fff;
	border: none;
	width: 374px;
	height: 78px;
	font-size: 27px;
	font-weight: 400;
	line-height: 33.78px;
	margin-right: 50px;
`

const RestoreButton = styled.button`
	border-radius: 4px;
	border: 3px solid #ffffff;
	background-color: transparent;
	box-shadow: none;
	color: #fff;
	width: 374px;
	height: 78px;
	font-size: 27px;
	font-weight: 400;
	line-height: 33.78px;
`

export default props => {
	return (
		<Step title={'Hello!'} subtitle={'Lets set up your XVG wallet.'}>
			<div>
				<Link to="/wallet/create">
					<NewButton>Create new wallet</NewButton>
				</Link>
				<Link to="/wallet/restore">
					<RestoreButton>Restore your wallet</RestoreButton>
				</Link>
			</div>
		</Step>
	)
}
