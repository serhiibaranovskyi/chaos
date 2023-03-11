'use client'
import React, { useContext, useState } from 'react'
import { useToggle } from 'react-use'

export type TopicActionsContext = {
  isCreateTopicDialogOpen: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
  toggleCreateTopicDialog: (to?: boolean) => void
}

function contextStub() {
  throw new Error('The provider is missing')
}

const Context = React.createContext<TopicActionsContext>({
  isCreateTopicDialogOpen: false,
  searchTerm: '',
  setSearchTerm: contextStub,
  toggleCreateTopicDialog: contextStub,
})

export function useTopicActionsContext() {
  return useContext(Context)
}

export function TopicActionsProvider(props: React.PropsWithChildren) {
  const { children } = props
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateTopicDialogOpen, toggleCreateTopicDialog] = useToggle(false)

  return (
    <Context.Provider
      value={{
        searchTerm,
        setSearchTerm,
        isCreateTopicDialogOpen,
        toggleCreateTopicDialog,
      }}
    >
      {children}
    </Context.Provider>
  )
}
