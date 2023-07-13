import Router from '@koa/router'
import { ChainId, Hash256, UnixTime } from '@l2beat/shared-pure'

import { ReportRecord } from '../peripherals/database/ReportRepository'

export interface ApplicationModule {
  routers?: Router[]
  start?: () => Promise<void> | void
}

export interface TvlSubmodule {
  updater: AssetUpdater
  start?: () => Promise<void> | void
}

export interface AssetUpdater {
  getChainId: () => ChainId
  getConfigHash: () => Hash256
  getReportsWhenReady(
    timestamp: UnixTime,
    refreshIntervalMs?: number,
  ): Promise<ReportRecord[]>
}
