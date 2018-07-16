import * as React from 'react'
import { inject, observer } from 'mobx-react'

import SearchMagnify from '../../icons/SearchMagnify'
import styled from 'styled-components'
import { translate } from 'react-i18next'

const SearchRow = styled.input``

const Icon = styled.div``

const SearchBar = ({ TransactionStore, i18n }) => {
  return (
    <div className="row transaction-list-search-group">
      <Icon className="transaction-list-search-icon">
        <SearchMagnify style={{ fill: '#757575' }} width={16} height={16} />
      </Icon>
      <SearchRow
        className="transaction-list-search-input"
        placeholder={i18n.t('transaction.searchplaceholder')}
        value={TransactionStore.searchValue}
        onChange={e => TransactionStore.setSearch(e)}
      />
    </div>
  )
}

export default translate()(inject('TransactionStore')(observer(SearchBar)))
