import { Channel } from 'amqplib'

import { getConn } from '@/shared/message-broker/conn'

export type { Channel, ConfirmChannel } from 'amqplib'

export async function createChan(): Promise<Channel> {
  const conn = await getConn()
  return conn.createChannel()
}
