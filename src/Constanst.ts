export class Constants {
  /**
   * The timeout used for fetching wallet data.
   */
  static fetchWalletTimeout: number = 30

  /**
   * The timeout used for fetching fiat rating data.
   */
  static fetchRateTimeout: number = 150

  static walletBalanceFetchInterval: number = 15000 // ms
  static walletNotificationFetchInterval: number = 5000 // ms

  /**
   * Amounts are fetched in satoshis and so we need to divide all price labels.
   */
  static satoshiDivider: number = 1000000.0

  /**
   * Confirmations needed to change the UI.
   */
  static confirmationsNeeded: number = 1

  /**
   * The maximum of digits.
   */
  static maximumFractionDigits: number = 6

  /**
   * Verge Currency website.
   */
  static website: string = 'https://vergecurrency.com/'

  /**
   * Verge Currency iOS wallet repository.
   */
  static iOSRepo: string = 'https://github.com/vergecurrency/vIOS/'

  /**
   * The blockchain explorer used.
   */
  static blockchainExlorer: string = 'https://verge-blockchain.info/'

  /**
   * The application terms of use link.
   */
  static termsOfUse: string = 'https://vergecurrency.com/wallets/terms'

  /**
   * The fiat rate data service.
   */
  static priceDataEndpoint: string =
    'https://vws.vergecurrency.network/price/api/v1/price/'

  /**
   * Chart data endpoint.
   */
  static chartDataEndpoint: string =
    'https://vws.vergecurrency.network/price/api/v1/chart/'

  /**
   * IP Address endpoint.
   */
  static ipCheckEndpoint: string =
    'https://vws2.swenvanzanten.com/price/api/v1/ip/'

  /**
   * The Verge Currency CORE team donation address.
   */
  static donationXvgAddress: string = 'DHe3mTNQztY1wWokdtMprdeCKNoMxyThoV'
}
