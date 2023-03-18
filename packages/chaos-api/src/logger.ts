import type { FastifyServerOptions } from 'fastify'

export const LOGGER_CONFIG: Record<string, FastifyServerOptions['logger']> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        levelFirst: true,
        messageFormat: '{res.statusCode}{req.method} {req.url}',
        singleLine: true,
        translateTime: 'HH:MM:ss Z',
      },
    },
  },
  production: true,
  test: true,
}
