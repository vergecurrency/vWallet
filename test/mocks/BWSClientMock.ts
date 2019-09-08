import * as Client from 'verge-wallet-client'
import settings from '../../src/settings'

/**
 * Spoofing that we created a new wallet :)
 */
Client.prototype.createWallet = function (
  walletname,
  name,
  n,
  m,
  options,
  callback,
) {
  this.credentials.n = n
  this.credentials.m = m
  callback(null)
}

export const bwsClientMock = () =>
  new Client({
    baseUrl: settings.BITPAY_WALLET.BWS_INSTANCE_URL,
    verbose: settings.BITPAY_WALLET.VERBOSE,
    doNotVerifyPayPro: true,
  })
