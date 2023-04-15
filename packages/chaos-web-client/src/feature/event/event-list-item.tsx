'use client'
import type { ChaosEvent } from '@/api/core/event'
import { Box } from '@/shared/components/box'
import { displayDateTime } from '@/shared/utils/date-fmt'
import { JsonView } from '@/shared/components/json-view'
import { ListItem, ListItemProps } from '@/shared/components/list-item'
import { styled } from '@/shared/styles'
import { Typography } from '@/shared/components/typography'

export type EventListItemProps = {
  event: ChaosEvent
} & ListItemProps

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

export function EventListItem(props: EventListItemProps) {
  const { event, ...other } = props

  return (
    <StyledListItem disableGutters {...other}>
      <Box
        alignItems="flex-end"
        display="flex"
        justifyContent="space-between"
        width="100%"
      >
        <Typography color="grey.600" fontWeight="bold">
          #{event.id}
        </Typography>
        <Typography color="grey.500" fontWeight="bold" variant="caption">
          {displayDateTime(event.createdAt)}
        </Typography>
      </Box>
      <Box width="100%">
        <JsonView src={event.payload} />
      </Box>
    </StyledListItem>
  )
}
