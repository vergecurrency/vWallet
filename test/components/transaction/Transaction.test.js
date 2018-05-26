import React from 'react'
import Transaction from '../../../src/components/transaction/Transaction.js'
import TransactionStore from '../../../src/stores/TransactionStore'
import renderer from 'react-test-renderer'

test('Transaction changes the class when hovered', () => {
  const component = renderer.create(
    <Transaction
      TransactionStore={TransactionStore}
      SettingsStore={{ getLocale: 'en-US' }}
      amount={123.123}
      hide={true}
    />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
