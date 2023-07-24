import { z } from 'zod'

main().catch((e) => {
  console.error(e)
})

export type TokenTvlChart = z.infer<typeof TokenTvlChart>
const TokenTvlChart = z.object({
  types: z.tuple([z.literal('timestamp'), z.string(), z.literal('usd')]),
  data: z.array(z.tuple([z.number(), z.number(), z.number()])),
})

export type TokenTvlResponse = z.infer<typeof TokenTvlResponse>
export const TokenTvlResponse = z.object({
  hourly: TokenTvlChart,
  sixHourly: TokenTvlChart,
  daily: TokenTvlChart,
})

async function getTokenTVL(url: string) {
  const res = await fetch(url)
  const json = await res.json()
  const parsed = TokenTvlResponse.parse(json)

  return parsed
}

function diffData(
  title: string,
  prod: TokenTvlChart['data'],
  stage: TokenTvlChart['data'],
) {
  console.log(`---*****---   ${title}   ---*****---\n`)
  let diffCount = 0

  stage.forEach((h) => {
    const p = prod.find((p) => p[0] === h[0])
    if (!p) {
      console.log('Missing production', h[0])
    } else if (p[1] !== h[1]) {
      console.log('❌', new Date(h[0] * 1000).toISOString(), p[1] - h[1])
      diffCount++
    } else {
      console.log('✅', new Date(h[0] * 1000).toISOString(), p[1] - h[1])
    }
  })

  console.log('\n')
  console.log('Total', stage.length)
  console.log('Diff count', diffCount)
}

async function main() {
  const production = await getTokenTVL(
    'https://l2beat.com/api/projects/arbitrum/tvl/assets/usdc-usd-coin',
  )
  const staging = await getTokenTVL(
    'https://l2beat-staging.vercel.app/api/projects/arbitrum/tvl/assets/usdc-usd-coin',
  )

  diffData('Hourly', production.hourly.data, staging.hourly.data)
  diffData('Six hourly', production.sixHourly.data, staging.sixHourly.data)
  diffData('Daily', production.daily.data, staging.daily.data)
}
