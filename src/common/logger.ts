import pino from 'pino';
import createLoggerMiddleware from 'pino-http';
import { getReasonPhrase } from 'http-status-codes';
import { multistream, Streams, prettyStream, PrettyStreamOptions } from 'pino-multi-stream';
import pinoDebug from 'pino-debug';
import debugModule from 'debug';
import { LOG_DIR, NODE_ENV, LOG_LEVEL } from './config';

const isDev = NODE_ENV === 'development';

// In dev mode, router responses with status <500 are marked as "debug"
// Debug+ logs are written to the file, Info+ are also written to stdout

// In prod, router responses are marked with "info", "warn" or "error"
// Everything is logged only to the file

const prettyStreamOptions: PrettyStreamOptions = {
  prettyPrint: {
    colorize: true,
    translateTime: true,
  },
  dest: pino.destination(1),
};

const streams: Streams = [
  { level: LOG_LEVEL || 'info', stream: prettyStream(prettyStreamOptions) },
  { level: 'debug', stream: pino.destination(`${LOG_DIR}/app.log`) },
];

const logger = pino(
  {
    base: null,
    level: LOG_LEVEL || (isDev ? 'debug' : 'info'),
    redact: ['password'],
  },
  isDev ? multistream(streams) : pino.destination(`${LOG_DIR}/app.log`)
);

pinoDebug(logger);

export const debug = debugModule('vegrecipes').extend;

export const loggerMiddleware = createLoggerMiddleware({
  logger: logger.child({ src: 'router' }),

  serializers: {
    req(req) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req.body = req.raw.body;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return req;
    },
  },

  customLogLevel(res, err) {
    if (res.statusCode >= 500 || err) {
      return 'error';
    }
    if (isDev) {
      return 'debug';
    }
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    }
    return 'info';
  },

  customSuccessMessage(res) {
    return `${res.statusCode} ${getReasonPhrase(res.statusCode)}`;
  },

  customErrorMessage(error, res) {
    return `${res.statusCode} ${getReasonPhrase(res.statusCode)}: ${error.message}`;
  },

  customAttributeKeys: {
    req: 'request',
    res: 'response',
    err: 'error',
  },
});

export default logger;
