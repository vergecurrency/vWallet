import * as winston from 'winston'
import { remote } from 'electron'

const myFormat = winston.format.printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `${remote.app.getAppPath()}/error.log`,
      level: 'error',
    }),
    new winston.transports.File({
      filename: `${remote.app.getAppPath()}/combined.log`,
    }),
  ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.label({ label: 'Wallet' }),
        winston.format.timestamp(),
        myFormat,
      ),
      level: 'info',
    }),
  )
}
