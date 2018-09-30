export interface Balance {
  /**
   * General (unconfirmed/cofirmed) balances
   */
  totalAmount: number
  availableAmount: number
  lockedAmount: number

  /**
   * General only confirmed balances
   */
  totalConfirmedAmount: number
  availableConfirmedAmount: number
  lockedConfirmedAmount: number

  /**
   * Addresses that hold any value
   */
  byAddress: any[]
}
