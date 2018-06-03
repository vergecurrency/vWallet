import './assets/css/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import * as React from 'react'
import * as history from 'history'

import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import { render } from 'react-dom'

// Since we are using HtmlWebpackPlugin WITHOUT a template,
// we should create our own root node in the body element before rendering into it
let root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

render(
  <AppContainer>
    <Root history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module && module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root') // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
