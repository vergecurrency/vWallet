import { Client } from 'verge-node-typescript'

const { remote } = require('electron')

const MODE = remote.getGlobal('process').env
  ? remote.getGlobal('process').env.NODE_ENV
  : 'prod'

let client: Client

if (MODE === 'dev') {
  client = new Client({
    user: 'kyon',
    pass: 'lolcat',
  })
  remote.getGlobal('sharedObj').state = '100'
} else {
  client = new Client({
    user: remote.getGlobal('sharedObj').user,
    pass: remote.getGlobal('sharedObj').pass,
  })
}

export default client
