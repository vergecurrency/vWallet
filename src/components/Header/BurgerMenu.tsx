import * as React from 'react'
import { translate, Trans } from 'react-i18next'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import Menu from 'react-material-icon-svg/dist/MenuIcon'
import Wallet from 'react-material-icon-svg/dist/WalletIcon'
import Addressbook from 'react-material-icon-svg/dist/BookOpenPageVariantIcon'
import Settings from 'react-material-icon-svg/dist/SettingsIcon'
import BlockchainExplorer from 'react-material-icon-svg/dist/OpenInNewIcon'
import { Link } from 'react-router-dom'
import { shell } from 'electron'

const openBlockExplorer = function() {
  shell.openExternal('https://verge-blockchain.info/')
}

const BurgerMenu = props => (
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
    <DropdownMenu className="burger-menu-dropdown-menu">
      <Link to="/">
        <DropdownItem>
          <Wallet />
          <Trans i18nKey={'header.menu.wallet'} />
        </DropdownItem>
      </Link>
      <Link to="/addressbook">
        <DropdownItem>
          <Addressbook />
          <Trans i18nKey={'header.menu.addressbook'} />
        </DropdownItem>
      </Link>
      <Link to="/settings">
        <DropdownItem>
          <Settings />
          <Trans i18nKey={'header.menu.settings'} />
        </DropdownItem>
      </Link>
      <a onClick={openBlockExplorer}>
        <DropdownItem>
          <BlockchainExplorer />
          <Trans i18nKey={'header.menu.blockchain_explorer'} />
        </DropdownItem>
      </a>
    </DropdownMenu>
  </Dropdown>
)

export default translate()(BurgerMenu)
