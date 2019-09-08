import * as React from 'react'
import { translate, Trans } from 'react-i18next'
const { getCurrentWindow } = require('electron').remote
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import Menu from 'react-material-icon-svg/dist/Menu'
import Wallet from 'react-material-icon-svg/dist/Wallet'
import BookOpenPageVariant from 'react-material-icon-svg/dist/BookOpenPageVariant'
import DeleteForever from 'react-material-icon-svg/dist/DeleteForever'
import Settings from 'react-material-icon-svg/dist/Settings'
import OpenInNew from 'react-material-icon-svg/dist/OpenInNew'
import { Link } from 'react-router-dom'
import { shell } from 'electron'
import VergeCacheStore from '../../stores/VergeCacheStore'

const openBlockExplorer = function () {
  shell.openExternal('https://verge-blockchain.info/')
}

const unlinkWallet = function () {
  VergeCacheStore.delete('WALLET')
  getCurrentWindow().reload()
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
          <BookOpenPageVariant />
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
          <OpenInNew />
          <Trans i18nKey={'header.menu.blockchain_explorer'} />
        </DropdownItem>
      </a>
      <a onClick={unlinkWallet}>
        <DropdownItem>
          <DeleteForever />
          <Trans i18nKey={'header.menu.unlink_wallet'} />
        </DropdownItem>
      </a>
    </DropdownMenu>
  </Dropdown>
)

export default translate()(BurgerMenu)
