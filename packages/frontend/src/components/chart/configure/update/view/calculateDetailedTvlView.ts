import { formatRange, formatTimestamp } from '../../../../../utils'
import { State } from '../../state/State'
import { formatCurrency } from './format'
import { getAppropriateEntries } from './getAppropriateEntries'
import { getYAxis } from './getYAxis'

export function calculateDetailedTvlView(
  data: State['data'],
  controls: State['controls'],
): State['view'] | undefined {
  const response = data.aggregateDetailedTvl
  if (!response) {
    return undefined
  }

  // const entries = getAppropriateEntries(controls.days, response)
  const entries = response.daily.data
  const dateRange = formatRange(entries[0][0], entries[entries.length - 1][0])
  const { labels, getY } = getYAxis(
    entries.flatMap((x) => (controls.currency === 'usd' ? [x[1].tvl, x[1].nmv] : [x[2].tvl, x[2].nmv])),
    controls.labelCount,
    controls.isLogScale,
    (x) => formatCurrency(x, controls.currency),
  )

  const points = entries.map(([timestamp, usd, eth], i) => ({
    x: i / (entries.length - 1),
    ys: {
        tvl: getY(controls.currency === 'usd' ? usd.tvl : eth.tvl),
        cbv: getY(controls.currency === 'usd' ? usd.cbv + usd.ebv + usd.nmv : eth.cbv + eth.ebv + eth.nmv),
        ebv: getY(controls.currency === 'usd' ? usd.ebv + usd.nmv : eth.ebv + eth.nmv),
        nmv: getY(controls.currency === 'usd' ? usd.nmv : eth.nmv),
    },
    date: formatTimestamp(timestamp, true),
    usd: usd.tvl,
    eth: eth.tvl,
    milestone: data.milestones[timestamp],
  }))

  return {
    chart: { type: 'AggregateDetailedTvlChart', points },
    dateRange,
    labels,
    showHoverAtIndex: undefined,
    showMilestoneHover: undefined,
  }
}
