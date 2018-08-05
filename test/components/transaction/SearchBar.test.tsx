import * as React from 'react'
import * as ReactShallowRenderer from 'react-test-renderer/shallow'
import * as TestUtils from 'react-dom/test-utils'

import SearchBar from '../../../src/components/transaction/SearchBar'
import TransactionStore from '../../../src/stores/TransactionStore'

jest.mock('electron', () => {
  return { remote: { getGlobal: () => 'dev' } }
})

test('SearchBar changes the class when hovered', () => {
  const renderer = new ReactShallowRenderer()
  expect(
    renderer.create(<SearchBar TransactionStore={TransactionStore} />),
  ).toMatchSnapshot()

  // manually trigger the callback
  TransactionStore.setSearch({
    target: { value: 'MyTransaction' },
  })

  expect(
    renderer.create(<SearchBar TransactionStore={TransactionStore} />),
  ).toMatchSnapshot()
})
