import { Counter } from './Counter'
import { IslandRegistry } from '../scripts/IslandRegistry'

export const registry = new IslandRegistry()

export const CounterIsland = registry.registerIsland(Counter, 'counter', 'span')
