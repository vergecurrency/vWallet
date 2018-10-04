var Client = require('bitcore-wallet-client')
var os = require('os')

var fs = require('fs')
var BWS_INSTANCE_URL = 'http://104.248.128.165:3232/bws/api'

var client = new Client({
  baseUrl: BWS_INSTANCE_URL,
  verbose: true,
  doNotVerifyPayPro: true,
})

// CREATE A BRAND NEW WALLET
// WITH MNEMONIC AND SAVING IT LOCALLY (ENCRYPTED)

/*client.seedFromRandomWithMnemonic({
  coin: 'btc',
  network: 'testnet',
  passphrase: 'lolol',
  account: 0,
})

client.createWallet(
  'My Personal Wallet',
  os.userInfo().username,
  1,
  1,
  { network: 'testnet' },
  (err, wallet) => {
    console.error(err)
    console.log(wallet)
    client.encryptPrivateKey('lolol')
    fs.writeFileSync('irene.dat', client.export())
  },
)*/

// GET CURRENT BALANCE

/*
client.import(fs.readFileSync('irene.dat').toString())
client.getBalance({}, (err, balance) => {
  console.error(err)
  console.log(JSON.stringify(balance))
})
*/

// GET NEW ADDRESS GENERATED
/*
client.import(fs.readFileSync('irene.dat').toString())
client.createAddress({}, (err, address) => {
  console.error(err)
  console.log(JSON.stringify(address))
})
*/

// GET UNSPENT OUTPUTS (NOT REALLY NEEDED)
/*
client.import(fs.readFileSync('irene.dat').toString())
client.getUtxos({}, (err, outputs) => {
  console.error(err)
  console.log(outputs)
})
*/

// CREATE A NEW TRANSACTION
//client.import(fs.readFileSync('irene.dat').toString())
//client.decryptPrivateKey('lolol')
/* client.createTxProposal(
  {
    outputs: [
      {
        toAddress: 'mtZ1yA34cMANwKwv1Ypmbg4gRgkU4gUmsp',
        amount: 0.00001 * 100000000,
        message: '',
      },
    ],
    message: '',
    feePerKb: 2000,
  },
  (err, txp) => {
    console.error(err)
    console.log(txp)

    // SIGN PROPOSAL
    //
    client.publishTxProposal({ txp }, (err, processedTxp) => {
      console.error(err)
      console.log(processedTxp)

      if (!err) {
        // BROADCAST PROPOSAL
        client.signTxProposal(processedTxp, 'lolol', (err, stxp) => {
          console.error(err)
          console.log(stxp)

          client.broadcastTxProposal(processedTxp, (err, tx) => {
            console.error(err)
            console.log(tx)
          })
        })
      }
    })

    //client.encryptPrivateKey('lolol')
  },
)
*/

// GET OLDER PROPOSALS TO TRANSACT
/*
client.getTxProposals({}, (err, proposals) => {
  console.error(err)
  console.log(proposals)

  const processedTxp = proposals[0]

  if (!err) {
    // BROADCAST PROPOSAL
    client.signTxProposal(processedTxp, 'lolol', (err, stxp) => {
      console.error(err)
      console.log(stxp)

      client.broadcastTxProposal(processedTxp, (err, tx) => {
        console.error(err)
        console.log(tx)
      })
    })
  }
})
*/

// GET TX HISTORY

/*client.import(fs.readFileSync('irene.dat').toString())
client.getTxHistory({ limit: 10 }, (err, history) => {
  console.error(err)
  console.log(history)
})*/

// RESTORE MY OLDER KEYS
/*const words =
  'thumb domain struggle fat olive hub congress actress funny network sea make'
client.seedFromMnemonic(words, {
  passphrase: 'lolol',
  account: 0,
  network: 'testnet',
})
console.log(client.credentials.xPrivKey)

client.import(fs.readFileSync('irene.dat').toString())
client.decryptPrivateKey('lolol')
console.log(client.credentials.xPrivKey)
console.log(client.credentials.mnemonic)
*/
