declare module '*.png'
declare module '*.json' {
  const value: any
  export default value
}
declare module 'invariant'
declare module 'superagent'

declare interface NodeModule {
  hot: {
    accept(path: string, fn: () => void, callback?: () => void): void
  }
}
