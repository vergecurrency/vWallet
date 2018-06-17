import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import SearchMagnify from '../../icons/SearchMagnify'
import styled from 'styled-components'
import i18nReact from 'i18n-react'

const SearchRow = styled.input`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 35px !important;
  padding-right: 15px !important;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: -7px;
  margin-bottom: 5px;
  border-radius: 10px;
  background-color: hsl(210, 9%, 96%);
  border: none;
`

const Icon = styled.div`
  position: relative;
  top: 30px;
  left: 42px;
  z-index: 1;
`

const SearchBar = ({ TransactionStore }) => {
  return (
    <div className="row">
      <Icon>
        <SearchMagnify style={{ fill: '#757575' }} width={16} height={16} />
      </Icon>
      <SearchRow
        className="col-md-11"
        placeholder={i18nReact.translate('transaction.searchplaceholder')}
        value={TransactionStore.searchValue}
        onChange={e => TransactionStore.setSearch(e)}
      />
    </div>
  )
}

export default inject('TransactionStore')(observer(SearchBar))
