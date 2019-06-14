import { Client } from '../vClient'
import MockClient from '../utils/mockups/MockClient'

import { logger } from '../utils/Logger'

const { remote } = require('electron')

const MODE = remote.getGlobal('process').env
  ? remote.getGlobal('process').env.NODE_ENV
  : 'prod'

let client: Client

function getClientByDriver(driver: String = '') {
  switch (driver) {
    case 'mock':
      logger.info('Using Mock Client')
      return MockClient
    case 'deamon':
    default:
      logger.info('Using Deamon Client')
      return Client
  }
}
const {
  rpcusername: user,
  rpcpassword: pass,
  clientDriver: driver,
} = require('../dev-config.json')

if (MODE === 'dev' && driver === 'mock') {
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
