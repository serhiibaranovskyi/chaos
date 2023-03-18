import * as process from 'process'

export const ENV = process.env.NODE_ENV || 'development'
export const SERVER_PORT = +(process.env.PORT || 3001)
export const SERVER_HOST = process.env.HOST || '0.0.0.0'
