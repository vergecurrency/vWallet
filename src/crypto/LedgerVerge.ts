import { withDevice } from './helpers/deviceAccess'
import btc from './helpers/getAddressForCurrency/btc'
import hwAppBtc from '@ledgerhq/hw-app-btc'

const coinDefinition = {
  id: 'verge',
  coinType: 1,
  name: 'Verge',
  managerAppName: 'Verge',
  ticker: 'XVG',
  scheme: 'verge',
  color: '#ffae35',
  units: [
    {
      name: 'bitcoin',
      code: 'BTC',
      symbol: 'Ƀ',
      magnitude: 8,
    },
    {
      name: 'mBTC',
      code: 'mBTC',
      symbol: 'Ƀ',
      magnitude: 5,
    },
    {
      name: 'bit',
      code: 'bit',
      symbol: 'Ƀ',
      magnitude: 2,
    },
    {
      name: 'satoshi',
      code: 'sat',
      symbol: 'Ƀ',
      magnitude: 0,
    },
  ],
  supportsSegwit: false,
  family: 'bitcoin',
  ledgerExplorerId: 'xvg',
  blockAvgTime: 0.5 * 60,
  bitcoinLikeInfo: {
    P2PKH: 30,
    P2SH: 33,
  },
}

export enum sigHashType {
  SIGHASH_ALL = 1,
  SIGHASH_NONE = 2,
  SIGHASH_SINGLE = 3,
  SIGHASH_FORKID = 0x40,
  SIGHASH_ANYONECANPAY = 0x80
}

export const getPublicWalletAddress = async ({
  devicePath,
  path,
  ...options
}) =>
  withDevice(devicePath)(transport => {
    return btc(transport, coinDefinition, path, options)
  }).catch(e => {
    if (e && e.name === 'TransportStatusError') {
      if (e.statusCode === 0x6b00 && options.verify) {
        throw new Error('0x6b00')
      }
      if (e.statusCode === 0x6985) {
        throw new Error('0x6985')
      }
    }
    throw e
  })

export function encode({ type, version, xpub, walletName }) {
  return `${type}:${version}:${xpub}:${walletName}`
}

export function decode(accountId: string): any {
  const splitted = accountId.split(':')
  const [type, version, xpub, walletName] = splitted
  return { type, version, xpub, walletName }
}

export function bigNumberToLibcoreAmount(core: any, njsWalletCurrency: *, bigNumber: ) {
  return new core.NJSAmount(njsWalletCurrency, 0).fromHex(njsWalletCurrency, bigNumber.toString(16))
}

export const buildNewTransaction = async (walletName, index, core, normalAmount, fee, recipient) => {
  const njsWallet = await core.getPoolInstance().getWallet(walletName)
  const njsAccount = await njsWallet.getAccount(index)
  const bitcoinLikeAccount = njsAccount.asBitcoinLikeAccount()
  const njsWalletCurrency = njsWallet.getCurrency()
  const amount = bigNumberToLibcoreAmount(
    core,
    njsWalletCurrency,
    normalAmount,
  )
  const fees = bigNumberToLibcoreAmount(
    core,
    njsWalletCurrency,
    fee,
  )
  const transactionBuilder = bitcoinLikeAccount.buildTransaction()

  // TODO: check if is valid address. if not, it will fail silently on invalid

  transactionBuilder.sendToAddress(amount, recipient)
  // TODO: don't use hardcoded value for sequence (and first also maybe)
  transactionBuilder.pickInputs(0, 0xffffff)
  transactionBuilder.setFeesPerByte(fees)

  return await transactionBuilder.build()
}

export const signVergeTransaction = async (
  devicePath,
  currencyId,
  builtTransaction,
  sigHashType,
) =>
  withDevice(devicePath)(async transport =>
    signTransaction({
      currencyId,
      hwApp: new hwAppBtc(transport),
      transaction: builtTransaction,
      sigHashType: parseInt(sigHashType, 16),
      supportsSegwit: false,
      isSegwit: false,
      hasTimestamp: true,
    }),
  )
