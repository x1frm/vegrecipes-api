declare module 'pino-debug' {
  import { Logger } from 'pino';

  declare function P(pinoInstance: Logger): undefined;

  export = P;
}
