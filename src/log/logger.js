import log4js from 'log4js'

log4js.configure('./log4js.json')
const logger = log4js.getLogger('pretty')
logger.setLevel('INFO')

// import winston from 'winston'

// const logger = new (winston.Logger)({
//   transports: [
//     new (winston.transports.Console)()
//   ]
// })


export default logger
