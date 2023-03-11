import { redirect } from 'next/navigation'

function RootPage() {
  redirect('/topics')
  return null
}

export default RootPage
