import { ComponentType, render, h } from 'preact'
import { createRootFragment } from './preactRootFragment'

export class IslandRegistry {
  private islands = new Map<string, ComponentType<any>>()
  private nextIslandId = 1

  registerIsland<P = {}>(
    island: ComponentType<P>,
    name = `i${this.nextIslandId++}`,
    element: keyof JSX.IntrinsicElements = 'div',
  ): ComponentType<P> {
    this.islands.set(name, island)
    return function Island(props: P) {
      const propString = JSON.stringify(props)
      return h(element, {
        'data-island': name,
        'data-props': propString !== '{}' ? propString : undefined,
      } as any)
    }
  }

  hydrateIslands() {
    const islands = document.querySelectorAll<HTMLElement>('[data-island]')
    islands.forEach((island) => {
      const name = island.getAttribute('data-island')
      const props = island.getAttribute('data-props')
      if (name) {
        const Component = this.islands.get(name)
        if (Component) {
          render(
            h(Component, props ? JSON.parse(props) : null),
            createRootFragment(island.parentElement!, island),
          )
        }
      }
    })
  }
}
