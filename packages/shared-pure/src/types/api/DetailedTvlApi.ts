import z from 'zod'

import { AssetId } from '../AssetId'
import { AssetType } from '../AssetType'
import { branded } from '../branded'
import { ChainId } from '../ChainId'
import { EthereumAddress } from '../EthereumAddress'
import { UnixTime } from '../UnixTime'

const DetailedTvlApiChartPoint = z.tuple([
  branded(z.number(), (n) => new UnixTime(n)),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
])
export type DetailedTvlApiChartPoint = z.infer<typeof DetailedTvlApiChartPoint>

const DetailedTvlApiChart = z.object({
  types: z.tuple([
    z.literal('timestamp'),
    z.literal('valueUsd'),
    z.literal('cbvUsd'),
    z.literal('ebvUsd'),
    z.literal('nmvUsd'),
    z.literal('valueEth'),
    z.literal('cbvEth'),
    z.literal('ebvEth'),
    z.literal('nmvEth'),
  ]),
  data: z.array(DetailedTvlApiChartPoint),
})
export type DetailedTvlApiChart = z.infer<typeof DetailedTvlApiChart>

export const DetailedTvlApiCharts = z.object({
  hourly: DetailedTvlApiChart,
  sixHourly: DetailedTvlApiChart,
  daily: DetailedTvlApiChart,
})
export type DetailedTvlApiCharts = z.infer<typeof DetailedTvlApiCharts>

export const DetailedTvlApiToken = z.object({
  assetId: branded(z.string(), AssetId),
  chainId: branded(z.number(), ChainId),
  assetType: branded(z.string(), AssetType),
  usdValue: z.number(),
})

export type DetailedTvlApiToken = z.infer<typeof DetailedTvlApiToken>

export const DetailedTvlApiProject = z.object({
  tokens: z.object({
    CBV: z.array(DetailedTvlApiToken),
    EBV: z.array(DetailedTvlApiToken),
    NMV: z.array(DetailedTvlApiToken),
  }),
  charts: DetailedTvlApiCharts,
})
export type DetailedTvlApiProject = z.infer<typeof DetailedTvlApiProject>

export const DetailedTvlApiResponse = z.object({
  bridges: DetailedTvlApiCharts,
  layers2s: DetailedTvlApiCharts,
  combined: DetailedTvlApiCharts,
  projects: z.record(z.string(), DetailedTvlApiProject.optional()),
})
export type DetailedTvlApiResponse = z.infer<typeof DetailedTvlApiResponse>

const BaseAssetBreakdownData = z.object({
  assetId: branded(z.string(), AssetId),
  chainId: branded(z.number(), ChainId),
  amount: z.string(),
  usdValue: z.string(),
  usdPrice: z.string(),
})

type BaseAssetBreakdownData = z.infer<typeof BaseAssetBreakdownData>

export const CanonicalAssetBreakdownData = BaseAssetBreakdownData.extend({
  escrows: z.array(
    z.object({
      amount: z.string(),
      usdValue: z.string(),
      escrowAddress: branded(z.string(), EthereumAddress),
    }),
  ),
})

export type CanonicalAssetBreakdownData = z.infer<
  typeof CanonicalAssetBreakdownData
>

export const ExternalAssetBreakdownData = BaseAssetBreakdownData.extend({
  tokenAddress: z.optional(branded(z.string(), EthereumAddress)),
})

export type ExternalAssetBreakdownData = z.infer<
  typeof ExternalAssetBreakdownData
>

export const NativeAssetBreakdownData = BaseAssetBreakdownData.extend({
  tokenAddress: z.optional(branded(z.string(), EthereumAddress)),
})

export type NativeAssetBreakdownData = z.infer<typeof NativeAssetBreakdownData>

export const ProjectAssetsBreakdownApiResponse = z.object({
  dataTimestamp: branded(z.number(), (n) => new UnixTime(n)),
  breakdowns: z.record(
    z.string(), // Project Id
    z.object({
      // escrow -> asset[]
      canonical: z.array(CanonicalAssetBreakdownData),
      external: z.array(ExternalAssetBreakdownData),
      native: z.array(NativeAssetBreakdownData),
    }),
  ),
})

export type ProjectAssetsBreakdownApiResponse = z.infer<
  typeof ProjectAssetsBreakdownApiResponse
>
