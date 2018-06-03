import React, { Component } from 'react'
import SettingsItems from './settingitems'
import Keymap from './keymaps/Keymap'
import T from 'i18n-react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import uuid from 'uuid'

import settingIcon from '../../assets/images/settings.png'
import commandIcon from '../../assets/images/command.png'

const settingOptions = [...SettingsItems]

const SettingPanel = styled.div`
  position: absolute;
  background-color: #fff;
  bottom: 330px;
  left: 30px;
  border-radius: 0.3em;
`

const KeymapPanel = styled.div`
  position: absolute;
  background-color: #fff;
  bottom: 30px;
  left: 30px;
  border-radius: 0.3em;
`

const Title = styled.span`
  color: #003b54;
  font-size: 23px;
  font-weight: 500;
  line-height: 54.93px;
`

const TitleIcon = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 10px;
  margin-top: -5px;
`

const KeymapIcon = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 10px;
  margin-top: -5px;
`

const HeaderTitle = styled.div`
  border-bottom: 1px solid #eeeeee;
`

class SettingsPanel extends Component {
  getKeyMaps() {
    const id = this.props.SettingsStore.getLocaleId
    return [
      {
        name: T.translate('settings.shortkey.quicksend.name'),
        keyName: 'CTRL/CMD + S',
        usage: T.translate('settings.shortkey.quicksend.usage'),
      },
      {
        name: T.translate('settings.shortkey.hideinformation.name'),
        keyName: 'CTRL/CMD + H',
        usage: T.translate('settings.shortkey.hideinformation.usage'),
      },
      {
        name: T.translate('settings.shortkey.lockwallet.name'),
        keyName: 'CTRL/CMD + L',
        usage: T.translate('settings.shortkey.lockwallet.usage'),
      },
    ]
  }

  render() {
    return (
      <div>
        <SettingPanel className="container">
          <HeaderTitle>
            <TitleIcon src={settingIcon} />
            <Title>{T.translate('settings.title')}</Title>
          </HeaderTitle>
          <div className="row">
            <div className="container-fluid">
              {settingOptions.map(Item => <Item />)}
            </div>
          </div>
        </SettingPanel>
        <KeymapPanel className="container">
          <HeaderTitle>
            <KeymapIcon src={commandIcon} />
            <Title>{T.translate('settings.keymap')}</Title>
          </HeaderTitle>
          <div className="row">
            <div className="container-fluid">
              {this.getKeyMaps().map(keyItem => (
                <Keymap key={uuid()} {...keyItem} />
              ))}
            </div>
          </div>
        </KeymapPanel>
      </div>
    )
  }
}

inject('SettingsStore')(observer(SettingsPanel))
