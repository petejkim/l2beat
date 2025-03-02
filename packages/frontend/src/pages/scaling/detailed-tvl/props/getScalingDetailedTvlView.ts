import { Layer2 } from '@l2beat/config'
import { DetailedTvlApiResponse } from '@l2beat/shared-pure'

import { getTokens } from '../../../../utils/project/getChart'
import { isAnySectionUnderReview } from '../../../../utils/project/isAnySectionUnderReview'
import { getRiskValues } from '../../../../utils/risks/values'
import { getDetailedTvlWithChange } from '../../../../utils/tvl/getTvlWithChange'
import { formatUSD } from '../../../../utils/utils'
import { ScalingDetailedTvlViewEntry } from '../types'
import { ScalingDetailedTvlViewProps } from '../view/ScalingDetailedTvlView'

export function getScalingDetailedTvlView(
  tvlApiResponse: DetailedTvlApiResponse,
  projects: Layer2[],
): ScalingDetailedTvlViewProps {
  return {
    items: projects.map((project) =>
      getScalingDetailedTvlViewEntry(tvlApiResponse, project),
    ),
  }
}

function getScalingDetailedTvlViewEntry(
  tvlApiResponse: DetailedTvlApiResponse,
  project: Layer2,
  isVerified?: boolean,
): ScalingDetailedTvlViewEntry {
  const projectData = tvlApiResponse.projects[project.id.toString()]
  const charts = projectData?.charts
  const { parts, partsWeeklyChange } = getDetailedTvlWithChange(charts)

  return {
    name: project.display.name,
    slug: project.display.slug,
    category: project.display.category,
    provider: project.display.provider,
    riskValues: getRiskValues(project.riskView),
    warning: project.display.warning,
    isArchived: project.isArchived,
    showProjectUnderReview: isAnySectionUnderReview(project),
    isUpcoming: project.isUpcoming,
    isVerified,
    tvl: formatUSD(parts.tvl),
    cbv: formatUSD(parts.canonical),
    ebv: formatUSD(parts.external),
    nmv: formatUSD(parts.native),
    tvlChange: partsWeeklyChange.tvl,
    ebvChange: partsWeeklyChange.external,
    cbvChange: partsWeeklyChange.canonical,
    nmvChange: partsWeeklyChange.native,
    tokens: getTokens(project.id, tvlApiResponse, true),
    stage: project.stage,
  }
}
