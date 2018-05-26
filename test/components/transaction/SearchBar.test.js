import React from 'react'
import SearchBar from '../../../src/components/transaction/SearchBar.js'
import TransactionStore from '../../../src/stores/TransactionStore'
import renderer from 'react-test-renderer'

test('SearchBar changes the class when hovered', () => {
  const component = renderer.create(
    <SearchBar TransactionStore={TransactionStore} />
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
  TransactionStore.setSearch({
    target: { value: 'MyTransaction' },
  })

  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
