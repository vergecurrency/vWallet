import { Client } from 'verge-node-typescript'

const { remote } = require('electron')

console.log(remote.getGlobal('sharedObj').user)
console.log(remote.getGlobal('sharedObj').pass)

const client: Client = new Client({
  user: remote.getGlobal('sharedObj').user,
  pass: remote.getGlobal('sharedObj').pass,
})

export default client
