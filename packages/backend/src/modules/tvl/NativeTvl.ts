import { Logger } from '@l2beat/shared'

import { Config } from '../../config'
import { NMVUpdater } from '../../core/assets/NMVUpdater'
import { Clock } from '../../core/Clock'
import { PriceUpdater } from '../../core/PriceUpdater'
import { TvlSubmodule } from '../ApplicationModule'
import { TvlDatabase } from './types'

export function createNativeTvlSubmodule(
  db: TvlDatabase,
  priceUpdater: PriceUpdater,
  config: Config,
  logger: Logger,
  clock: Clock,
): TvlSubmodule | undefined {
  if (!config.tvl.ethereum) {
    logger.info('Ethereum TVL module disabled')
    return
  }

  const nativeAssetUpdater = new NMVUpdater(
    priceUpdater,
    db.reportRepository,
    db.reportStatusRepository,
    clock,
    logger,
  )

  // #endregion

  const start = async () => {
    logger = logger.for('EthereumTvlModule')
    logger.info('Starting')

    await nativeAssetUpdater.start()

    logger.info('Started')
  }

  return {
    start,
    updater: nativeAssetUpdater,
  }
}
