const settings: {
  TRANSACTION_LINK: string
  BLOCK_LINK: string
  COIN: string
  NETWORK: string
  DEFAULT_ACCOUNT: number
  WALLET_PATH_NAME: string
  BITPAY_WALLET: {
    BWS_INSTANCE_URL: string
    VERBOSE: boolean,
  },
} = {
  // TODO: CHANGE TO XVG
  COIN: 'xvg',
  // TODO: CHANGE TO MAIN NET
  NETWORK: 'livenet',
  DEFAULT_ACCOUNT: 0,
  TRANSACTION_LINK: 'https://verge-blockchain.info/tx/',
  BLOCK_LINK: 'https://verge-blockchain.info/block/',
  WALLET_PATH_NAME: 'wallet.dat',
  // TODO: Switch to HTTPS
  BITPAY_WALLET: {
    // BWS_INSTANCE_URL: 'https://usxvglw.vergecoreteam.com/bws/api',
    // BWS_INSTANCE_URL: 'https://garagenet.internet-box.ch/vws/api',
    // BWS_INSTANCE_URL: 'https://load.vergecoreteam.com/bws/api',
    BWS_INSTANCE_URL: 'https://vws.vergecurrency.network/vws/api',
    // BWS_INSTANCE_URL: 'http://localhost:3232/vws/api',
    VERBOSE: true,
  },
}

export default settings
