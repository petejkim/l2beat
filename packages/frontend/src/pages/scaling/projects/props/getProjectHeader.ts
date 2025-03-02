import { Layer2, ProjectLinks } from '@l2beat/config'
import {
  ActivityApiResponse,
  DetailedTvlApiCharts,
  DetailedTvlApiResponse,
} from '@l2beat/shared-pure'

import { Config } from '../../../../build/config'
import { TvlStats } from '../../../../components/header/TvlSummary'
import { formatLargeNumber } from '../../../../utils'
import { getTpsDaily } from '../../../../utils/activity/getTpsDaily'
import { getTpsWeeklyChange } from '../../../../utils/activity/getTpsWeeklyChange'
import { getTransactionCount } from '../../../../utils/activity/getTransactionCount'
import { isAnySectionUnderReview } from '../../../../utils/project/isAnySectionUnderReview'
import { getRiskValues } from '../../../../utils/risks/values'
import { getTvlBreakdown } from '../../../../utils/tvl/getTVLBreakdown'
import { unifyTokensResponse } from '../../../../utils/tvl/getTvlStats'
import { getDetailedTvlWithChange } from '../../../../utils/tvl/getTvlWithChange'
import { ProjectHeaderProps } from '../view/ProjectHeader'

export function getProjectHeader(
  project: Layer2,
  config: Config,
  tvlApiResponse: DetailedTvlApiResponse,
  activityApiResponse?: ActivityApiResponse,
): ProjectHeaderProps {
  const apiProject = tvlApiResponse.projects[project.id.toString()]

  const getDetailed = (chart: DetailedTvlApiCharts | undefined) => {
    const { parts, partsWeeklyChange } = getDetailedTvlWithChange(chart)
    return {
      tvl: parts.tvl,
      tvlWeeklyChange: partsWeeklyChange.tvl,
      canonical: parts.canonical,
      external: parts.external,
      native: parts.native,
    }
  }

  const { tvl, tvlWeeklyChange, canonical, external, native } = getDetailed(
    apiProject?.charts,
  )

  const activityData =
    activityApiResponse?.projects[project.id.toString()]?.daily.data
  const tpsDaily = getTpsDaily(activityData, 'project')
  const tpsWeeklyChange = getTpsWeeklyChange(activityData, 'project')
  const transactionMonthlyCount = getTransactionCount(
    activityData,
    'project',
    'month',
  )

  const tvlBreakdown = getTvlBreakdown(
    project.display.name,
    project.config.associatedTokens ?? [],
    tvl,
    unifyTokensResponse(apiProject?.tokens),
  )

  return {
    icon: `/icons/${project.display.slug}.png`,
    title: project.display.name,
    titleLength: getTitleLength(project.display.name),
    tvlStats: getTvlStats(
      project,
      tvl,
      tvlWeeklyChange,
      canonical,
      external,
      native,
    ),
    tpsDaily: tpsDaily?.toFixed(2) ?? '',
    tpsWeeklyChange,
    transactionMonthlyCount:
      transactionMonthlyCount !== undefined
        ? formatLargeNumber(transactionMonthlyCount)
        : undefined,
    purpose: project.display.purpose,
    technology: project.display.category,
    tvlBreakdown: project.config.escrows.length > 0 ? tvlBreakdown : undefined,
    showTvlBreakdown: config.features.tvlBreakdown,
    tvlBreakdownHref: `/scaling/projects/${project.display.slug}/tvl-breakdown`,
    links: getLinks(project.display.links),
    stage: project.stage,
    // TODO: will need to be riskValues when rosette has hover
    risks: getRiskValues(project.riskView),
    isArchived: project.isArchived,
    isUpcoming: project.isUpcoming,
    isUnderReview: project.isUnderReview,
    showProjectUnderReview: isAnySectionUnderReview(project),
    warning: project.display.headerWarning,
  }
}

function getTitleLength(name: string): 'long' | 'very-long' | undefined {
  switch (name) {
    case 'Optimism':
    case 'rhino.fi':
    case 'Immutable X':
      return 'long'
    case 'OMG Network':
    case 'Layer2.Finance':
    case 'ZKSwap V2':
    case 'Polygon Hermez':
    case 'Metis Andromeda':
      return 'very-long'
  }
}

function getLinks(links: ProjectLinks) {
  const items = [
    {
      name: 'Website',
      links: links.websites,
    },
    {
      name: 'App',
      links: links.apps,
    },
    {
      name: 'Documentation',
      links: links.documentation,
    },
    {
      name: 'Explorer',
      links: links.explorers,
    },
    {
      name: 'Repository',
      links: links.repositories,
    },
    {
      name: 'Social',
      links: links.socialMedia,
    },
  ] as const

  return items.filter((link) => link.links.length > 0)
}

function getTvlStats(
  project: Layer2,
  tvl: number,
  tvlWeeklyChange: string,
  canonical: number | undefined,
  external: number | undefined,
  native: number | undefined,
): TvlStats | undefined {
  // TODO(radomski): This is solution is really janky and can be improved once
  // we deprecate the usage of the original endpoint to fetch data for the frontend.
  const parts = [
    project.config.escrows.length > 0 ? tvl : 0,
    canonical ?? 0,
    external ?? 0,
    native ?? 0,
  ]

  if (parts.every((x) => notUndefined(x))) {
    const ps = parts.filter(notUndefined)
    return {
      tvlChange: tvlWeeklyChange,
      tvl: ps[0],
      canonical: ps[1],
      external: ps[2],
      native: ps[3],
    }
  }

  return undefined
}

function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined
}
