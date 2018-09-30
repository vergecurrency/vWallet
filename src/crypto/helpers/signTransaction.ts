async function signTransaction({
  hwApp,
  currencyId,
  transaction,
  sigHashType,
  supportsSegwit,
  isSegwit,
  hasTimestamp,
}: {
  hwApp: any
  currencyId: string
  transaction: any
  sigHashType: number
  supportsSegwit: boolean
  isSegwit: boolean
  hasTimestamp: boolean
}) {
  const additionals = []
  let expiryHeight

  if (currencyId === 'bitcoin_cash' || currencyId === 'bitcoin_gold') {
    additionals.push('bip143')
  }
  if (currencyId === 'zcash') {
    expiryHeight = Buffer.from([0x00, 0x00, 0x00, 0x00])
  }

  const rawInputs = transaction.getInputs()

  const hasExtraData = currencyId === 'zcash'

  const inputs = await Promise.all(
    rawInputs.map(async input => {
      const rawPreviousTransaction = await input.getPreviousTransaction()
      const hexPreviousTransaction = Buffer.from(
        rawPreviousTransaction,
      ).toString('hex')
      const previousTransaction = hwApp.splitTransaction(
        hexPreviousTransaction,
        supportsSegwit,
        hasTimestamp,
        hasExtraData,
      )
      const outputIndex = input.getPreviousOutputIndex()
      const sequence = input.getSequence()
      return [
        previousTransaction,
        outputIndex,
        undefined, // we don't use that TODO: document
        sequence, // 0xffffffff,
      ]
    }),
  )

  const associatedKeysets = rawInputs.map(input => {
    const derivationPaths = input.getDerivationPath()
    return derivationPaths[0].toString()
  })

  const outputs = transaction.getOutputs()

  const output = outputs.find(output => {
    const derivationPath = output.getDerivationPath()
    if (derivationPath.isNull()) {
      return false
    }
    const strDerivationPath = derivationPath.toString()
    const derivationArr = strDerivationPath.split('/')
    return derivationArr[derivationArr.length - 2] === '1'
  })

  const changePath = output ? output.getDerivationPath().toString() : undefined
  const outputScriptHex = Buffer.from(transaction.serializeOutputs()).toString(
    'hex',
  )
  const initialTimestamp = hasTimestamp ? transaction.getTimestamp() : undefined

  // FIXME
  // should be `transaction.getLockTime()` as soon as lock time is
  // handled by libcore (actually: it always returns a default value
  // and that caused issue with zcash (see #904))
  const lockTime = undefined

  const signedTransaction = await hwApp.createPaymentTransactionNew(
    inputs,
    associatedKeysets,
    changePath,
    outputScriptHex,
    lockTime,
    sigHashType,
    isSegwit,
    initialTimestamp,
    additionals,
    expiryHeight,
  )

  return signedTransaction
}
