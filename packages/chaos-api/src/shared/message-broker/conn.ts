import retry from 'async-retry'
import { connect, Connection } from 'amqplib'

import { MESSAGE_BROKER_URL } from '@/config'

export type { Connection } from 'amqplib'

let messageBrokerConn: Connection | Promise<Connection> | null = null

export async function getConn(): Promise<Connection> {
  if (!MESSAGE_BROKER_URL) {
    throw new Error('MESSAGE_BROKER_URL is not provided')
  }
  if (messageBrokerConn == null) {
    messageBrokerConn = retry(
      async () => connect(MESSAGE_BROKER_URL as string),
      {
        minTimeout: 1000,
        randomize: true,
        retries: 5,
      }
    )
    messageBrokerConn = await messageBrokerConn
  }
  return messageBrokerConn
}
