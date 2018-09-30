import hwAppBtc from '@ledgerhq/hw-app-btc'
import getBitcoinLikeInfo from '../devices/getBitcoinLikeInfo'

export default async (
  transport: any,
  currency: any,
  path: string,
  { segwit = false, verify = true },
) => {
  const btc = new hwAppBtc(transport)
  const { bitcoinAddress, publicKey } = await btc.getWalletPublicKey(
    path,
    verify,
    segwit,
  )

  const { bitcoinLikeInfo } = currency
  if (bitcoinLikeInfo) {
    const { P2SH, P2PKH } = await getBitcoinLikeInfo(transport)
    if (P2SH !== bitcoinLikeInfo.P2SH || P2PKH !== bitcoinLikeInfo.P2PKH) {
      throw new Error(`BtcUnmatchedApp ${currency.id}`)
    }
  }

  return { path, publicKey, address: bitcoinAddress }
}
