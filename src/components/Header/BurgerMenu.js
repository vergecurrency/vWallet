import React from 'react'
import T from 'i18n-react'
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'
import Menu from 'react-material-icon-svg/dist/MenuIcon'
import { Link } from 'react-router-dom'

export default props => (
	<Dropdown isOpen={props.dropdownOpen} toggle={props.toggle}>
		<DropdownToggle
			style={{
				backgroundColor: 'inherit',
				borderColor: 'transparent',
				boxShadow: 'none',
				margin: '0 auto',
				display: 'inline-block',
				verticalAlign: 'middle',
				paddingTop: '18%',
			}}
		>
			<Menu
				style={{
					color: 'white',
					fill: 'white',
					height: '32px',
					width: '32px',
				}}
			/>
		</DropdownToggle>
		<DropdownMenu>
			<Link to="/">
				<DropdownItem>{T.translate('header.menu.wallet')}</DropdownItem>
			</Link>
			<Link to="/settings">
				<DropdownItem>
					{T.translate('header.menu.settings')}
				</DropdownItem>
			</Link>
		</DropdownMenu>
	</Dropdown>
)
