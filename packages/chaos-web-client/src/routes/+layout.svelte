<script lang="ts">
  import { browser } from '$app/environment'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  })
</script>

<QueryClientProvider client={queryClient}>
  <TopAppBar variant="static">
    <Row>
      <Section align="end" toolbar>
        <Title>Chaos</Title>
      </Section>
    </Row>
  </TopAppBar>
  <slot />
</QueryClientProvider>
