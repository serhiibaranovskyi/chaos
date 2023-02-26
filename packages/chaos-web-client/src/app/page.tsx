'use client'

import { PageLoader } from '@/components/ui/page-loader'
import { TopicGrid } from '@/components/common/topic/topic-grid'
import { useTopicsSearch } from '@/api/react-query/topic'

function Dashboard() {
  const { response, isLoading } = useTopicsSearch()

  return (
    <main>
      {isLoading ? <PageLoader /> : <TopicGrid topics={response?.data ?? []} />}
    </main>
  )
}

export default Dashboard
