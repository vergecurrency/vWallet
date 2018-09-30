let counter = 0
export default async function withLibcore(job: any): Promise<any> {
  const core = require('./init-libcore').default
  core.getPoolInstance()
  try {
    if (counter++ === 0) {
      /*process.send({
        type: 'setLibcoreBusy',
        busy: true,
      })*/
    }
    const res = await job(core)
    return res
  } finally {
    if (--counter === 0) {
      /*process.send({
        type: 'setLibcoreBusy',
        busy: false,
      })*/
    }
  }
}
