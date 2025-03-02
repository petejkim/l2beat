import { Config } from '../../../../build/config'
import { getFooterProps, getNavbarProps } from '../../../../components'
import { getIncludedProjects } from '../../../../utils/getIncludedProjects'
import { orderByTvl } from '../../../../utils/orderByTvl'
import { PagesData, Wrapped } from '../../../Page'
import { ScalingDetailedTvlPageProps } from '../view/ScalingDetailedTvlPage'
import { getPageMetadata } from './getPageMetadata'
import { getScalingDetailedTvlView } from './getScalingDetailedTvlView'

export function getProps(
  config: Config,
  pagesData: PagesData,
): Wrapped<ScalingDetailedTvlPageProps> {
  const { tvlApiResponse } = pagesData

  const included = getIncludedProjects(config.layer2s, tvlApiResponse)
  const ordering = orderByTvl(included, tvlApiResponse)

  const detailedTvlEndpoint = '/api/scaling-detailed-tvl.json'
  return {
    props: {
      detailedTvlEndpoint,
      showActivity: config.features.activity,
      navbar: getNavbarProps(config, 'scaling'),
      footer: getFooterProps(config),
      detailedTvlView: getScalingDetailedTvlView(tvlApiResponse, ordering),
    },
    wrapper: {
      metadata: getPageMetadata(),
      banner: config.features.banner,
    },
  }
}
