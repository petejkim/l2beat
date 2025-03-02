import {
  ActivityApiResponse,
  DetailedTvlApiResponse,
  ProjectAssetsBreakdownApiResponse,
  VerificationStatus,
} from '@l2beat/shared-pure'
import { ReactElement } from 'react'

export interface Page {
  slug: string
  page: ReactElement
}

export interface Wrapped<Props> {
  props: Props
  wrapper: WrapperProps
}

export interface WrapperProps {
  htmlClassName?: string
  metadata: PageMetadata
  preloadApi?: string
  banner: boolean | undefined
}
export interface PageMetadata {
  title: string
  description: string
  image: string
  url: string
}

export interface PagesData {
  tvlApiResponse: DetailedTvlApiResponse
  activityApiResponse: ActivityApiResponse | undefined
  verificationStatus: VerificationStatus
  tvlBreakdownApiResponse: ProjectAssetsBreakdownApiResponse | undefined
}
