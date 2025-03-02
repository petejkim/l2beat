import React, { ReactNode } from 'react'

import { HorizontalSeparator } from './HorizontalSeparator'

interface TabsProps {
  items: Tab[]
}

interface Tab {
  id: string
  name: string
  content: ReactNode
  icon?: ReactNode
  itemsCount?: number
  shortName?: string
}

export function Tabs({ items }: TabsProps) {
  return (
    <div className="Tabs">
      <div className="relative">
        <div className="TabsItemsContainer grid auto-cols-fr grid-flow-col md:flex md:gap-x-8">
          {items.map((tab) => (
            <a
              className="TabsItem group relative flex items-center justify-center gap-1.5 py-3 px-4 font-semibold transition-colors"
              key={tab.id}
              id={tab.id}
              href={`#${tab.id}`}
            >
              {tab.icon && <span className="hidden md:inline">{tab.icon}</span>}
              <span className="hidden text-base md:inline">{tab.name}</span>
              <span className="inline text-xs md:hidden">
                {tab.shortName ?? tab.name}
              </span>
              {tab.itemsCount && (
                <span className="TabsItem-CountBadge flex items-center justify-center rounded-full bg-purple-100 px-1.5 py-0.5 text-2xs tabular-nums leading-none text-white md:text-xs">
                  {tab.itemsCount}
                </span>
              )}
              <span className="absolute bottom-0 left-0 block h-1 w-full rounded-t-sm bg-gray-700 opacity-0 transition-all duration-300 group-hover:opacity-80" />
            </a>
          ))}
        </div>
        <span className="TabsUnderline absolute bottom-0 block h-1 rounded-t-sm bg-pink-900 transition-all duration-300 dark:bg-pink-200" />
      </div>
      <HorizontalSeparator className="mb-3 md:mb-6" />
      {items.map((tab) => (
        <div className="TabsContent hidden" id={tab.id} key={tab.id}>
          {tab.content}
        </div>
      ))}
    </div>
  )
}
