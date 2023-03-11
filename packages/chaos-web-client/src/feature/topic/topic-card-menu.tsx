'use client'
import React from 'react'

import type { Topic } from '@/api/core/topic'
import { DeleteIcon, EditIcon } from '@/shared/components/icons'
import { ListItemIcon } from '@/shared/components/list-item-icon'
import { ListItemText } from '@/shared/components/list-item-text'
import { Menu, MenuProps } from '@/shared/components/menu'
import { MenuItem } from '@/shared/components/menu-item'

export type TopicCardMenuProps = MenuProps & {
  topic: Topic
  onDelete: (topic: Topic) => void
  onEdit: (topic: Topic) => void
}

export function TopicCardMenu(props: TopicCardMenuProps) {
  const { onDelete, onEdit, topic, ...other } = props

  return (
    <Menu
      id="lock-menu"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      {...other}
      MenuListProps={{
        'aria-labelledby': 'lock-button',
        role: 'listbox',
        ...other?.MenuListProps,
      }}
    >
      <MenuItem onClick={() => onEdit(topic)}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => onDelete(topic)}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  )
}
