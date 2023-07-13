import { ArbiscanClient, HttpClient, Logger } from '@l2beat/shared'
import { ChainId } from '@l2beat/shared-pure'

import { Config } from '../../config'
import { NMVUpdater } from '../../core/assets/NMVUpdater'
import { BlockNumberUpdater } from '../../core/BlockNumberUpdater'
import { Clock } from '../../core/Clock'
import { PriceUpdater } from '../../core/PriceUpdater'
import { TvlSubmodule } from '../ApplicationModule'
import { TvlDatabase } from './types'

export function createArbitrumTvlSubmodule(
  db: TvlDatabase,
  priceUpdater: PriceUpdater,
  config: Config,
  logger: Logger,
  http: HttpClient,
  clock: Clock,
): TvlSubmodule | undefined {
  if (!config.tvl.arbitrum) {
    logger.info('Arbitrum TVL module disabled')
    return
  }

  // #region peripherals

  const arbiscanClient = new ArbiscanClient(
    http,
    config.tvl.arbitrum.arbiscanApiKey,
    logger,
  )

  // #endregion
  // #region updaters

  const arbiscanBlockNumberUpdater = new BlockNumberUpdater(
    arbiscanClient,
    db.blockNumberRepository,
    clock,
    logger,
    ChainId.ARBITRUM,
  )

  const dummyUpdater = new NMVUpdater(
    priceUpdater,
    db.reportRepository,
    db.reportStatusRepository,
    clock,
    logger,
  )

  // #endregion

  const start = async () => {
    logger = logger.for('ArbitrumTvlModule')
    logger.info('Starting')

    await arbiscanBlockNumberUpdater.start()

    logger.info('Started')
  }

  return {
    start,
    updater: dummyUpdater,
  }
}
