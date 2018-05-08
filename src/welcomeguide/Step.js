import React from 'react'
import { TitleBar } from 'electron-react-titlebar'
import styled from 'styled-components'

const Background = styled.div`
	background-color: #07121b;
	background-image: linear-gradient(
		38deg,
		#07121b 0%,
		#0c1b27 48%,
		#07121b 100%
	);
	height: 740px;
	text-align: center;
	align-content: center;
	align-items: center;
	display: grid;
`

const Title = styled.p`
	color: #fcf1eb;
	font-size: 110px;
	font-weight: 400;
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
	font-size: 43px;
	font-weight: 500;
	margin-bottom: 45px;
`

export default ({ title, subtitle, small, ...props }) => {
	return (
		<div>
			<TitleBar disableMaximize={true} menu={[]} />
			<Background>
				{!small ? (
					<Title>{title}</Title>
				) : (
					<SmallTitle>{title}</SmallTitle>
				)}
				<SubTitle>{subtitle}</SubTitle>
				{props.children}
			</Background>
		</div>
	)
}
