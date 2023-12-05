import logger from 'pino';

const log = logger({
  base: { pid: false },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  timestamp: () => `,"time": "${new Date().toISOString()}"`,
  // prettyPrint: true,
});

export default log;
