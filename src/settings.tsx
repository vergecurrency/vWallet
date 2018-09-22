const settings: {
  TRANSACTION_LINK: string
  BLOCK_LINK: string
  COIN: string
  NETWORK: string
  WALLET_PATH_NAME: string
  BITPAY_WALLET: {
    BWS_INSTANCE_URL: string
    VERBOSE: boolean
  }
} = {
  // TODO: CHANGE TO XVG
  COIN: 'btc',
  // TODO: CHANGE TO MAIN NET
  NETWORK: 'testnet',
  TRANSACTION_LINK: 'https://verge-blockchain.info/tx/',
  BLOCK_LINK: 'https://verge-blockchain.info/block/',
  WALLET_PATH_NAME: 'wallet.dat',
  // TODO: Switch to HTTPS
  BITPAY_WALLET: {
    BWS_INSTANCE_URL: 'http://104.248.128.165:3232/bws/api',
    VERBOSE: false,
  },
}

export default settings
