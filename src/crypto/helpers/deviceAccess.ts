// import type Transport from '@ledgerhq/hw-transport'
import hwTransportNodeHid from '@ledgerhq/hw-transport-node-hid'

let queue = Promise.resolve()

const mapError = e => {
  if (
    e &&
    e.message &&
    e.message.indexOf('cannot open device with path') >= 0
  ) {
    throw new Error(e.message)
  }
  if (e && e.message && e.message.indexOf('HID') >= 0) {
    throw new Error(e.message)
  }
  throw e
}

export const withDevice = devicePath => job => {
  const p = queue.then(async () => {
    // $FlowFixMe not sure what's wrong
    const t = await hwTransportNodeHid.open(devicePath)
    try {
      const res = await job(t).catch(mapError)
      return res
    } finally {
      await t.close()
    }
  })

  queue = p.catch(() => null)

  return p
}
