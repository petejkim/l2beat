import { VNode } from 'preact'

export interface Page {
  slug: string
  page: VNode
}

export interface Wrapped<Props> {
  props: Props
  wrapper: WrapperProps
}

export interface WrapperProps {
  htmlClassName?: string
  metadata: PageMetadata
  preloadApi?: string
}

export interface PageMetadata {
  title: string
  description: string
  image: string
  url: string
}
