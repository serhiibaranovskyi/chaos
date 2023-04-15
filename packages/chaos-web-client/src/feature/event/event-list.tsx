'use client'
import type { ChaosEvent } from '@/api/core/event'
import { EventListItem } from '@/feature/event/event-list-item'
import { List, ListProps } from '@/shared/components/list'

export type EventListProps = {
  data?: ChaosEvent[]
} & ListProps

export function EventList(props: EventListProps) {
  const { data = [], ...other } = props

  return (
    <List {...other}>
      {data.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </List>
  )
}
