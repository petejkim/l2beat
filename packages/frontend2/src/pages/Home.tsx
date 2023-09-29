import { PageWrapper } from '../components/PageWrapper'
import { CounterIsland } from '../islands'

export function Home() {
  return (
    <PageWrapper>
      <div>Home</div>
      <CounterIsland />
      <CounterIsland />
      <CounterIsland />
      <CounterIsland />
    </PageWrapper>
  )
}
