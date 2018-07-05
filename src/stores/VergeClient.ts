import { Client } from 'verge-node-typescript'
import MockClient from './MockClient'

const { remote } = require('electron')

const MODE = remote.getGlobal('process').env
  ? remote.getGlobal('process').env.NODE_ENV
  : 'prod'

let client: Client

function getClientByDriver(driver: String = '') {
  switch (driver) {
    case 'mock':
      return MockClient
    case 'deamon':
    default:
      return Client
  }
}

if (MODE === 'dev') {
  const {
    rpcusername: user,
    rpcpassword: pass,
    clientDriver: driver,
  } = require('../dev-config.json')
  const clientClass = getClientByDriver(driver)
  client = new clientClass({
    user,
    pass,
  })
  remote.getGlobal('sharedObj').state = '100'
} else {
  client = new Client({
    user: remote.getGlobal('sharedObj').user,
    pass: remote.getGlobal('sharedObj').pass,
  })
}

export default client
