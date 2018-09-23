import * as Client from 'bitcore-wallet-client'
import settings from '../../src/settings'

export const bwsClientMock = new Client({
  baseUrl: settings.BITPAY_WALLET.BWS_INSTANCE_URL,
  verbose: settings.BITPAY_WALLET.VERBOSE,
  doNotVerifyPayPro: true,
})

/**
 * Spoofing that we created a new wallet :)
 */
bwsClientMock.__proto__.createWallet = (
  walletname,
  name,
  n,
  m,
  options,
  callback,
) => {
  callback(null)
}
