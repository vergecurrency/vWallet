const settings: {
  TRANSACTION_LINK: string
  BLOCK_LINK: string
  COIN: string
  NETWORK: string
  DEFAULT_ACCOUNT: number
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
  DEFAULT_ACCOUNT: 0,
  TRANSACTION_LINK: 'https://verge-blockchain.info/tx/',
  BLOCK_LINK: 'https://verge-blockchain.info/block/',
  WALLET_PATH_NAME: 'wallet.dat',
  // TODO: Switch to HTTPS
  BITPAY_WALLET: {
    // BWS_INSTANCE_URL: 'https://usxvglw.vergecoreteam.com/bws/api',
    // BWS_INSTANCE_URL: 'https://garagenet.internet-box.ch/bws/api',
    BWS_INSTANCE_URL: 'https://load.vergecoreteam.com/bws/api',
    VERBOSE: true,
  },
}

export default settings
