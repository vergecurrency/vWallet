import * as React from 'react'
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import * as TestUtils from 'react-dom/test-utils'

import SettingsStore from '../../../src/stores/SettingsStore'
import Transaction from '../../../src/components/transaction/Transaction'
import TransactionStore from '../../../src/stores/TransactionStore'

describe('<Counter />', () => {
  it('Transaction changes the class when hovered', () => {
    const renderer = new ReactShallowRenderer()
    expect(
      renderer.create(
        <Transaction
          TransactionStore={TransactionStore}
          SettingsStore={SettingsStore}
          amount={123.123}
          hide={true}
        />,
      ),
    ).toMatchSnapshot()
  })
})
