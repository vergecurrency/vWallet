declare module '*.png'
declare module '*.json' {
  const value: any
  export default value
}

declare module '@ledgerhq/hw-transport-node-hid'
declare module '@ledgerhq/hw-app-btc'
declare module '@ledgerhq/hw-transport'
declare module '@ledgerhq/live-common/*'
declare module '@ledgerhq/ledger-core'
