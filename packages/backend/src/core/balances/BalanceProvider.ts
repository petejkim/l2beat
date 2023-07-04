import {
  assert,
  AssetId,
  ChainId,
  EthereumAddress,
  UnixTime,
} from '@l2beat/shared-pure'

import { BalanceRecord } from '../../peripherals/database/BalanceRepository'
import { BalanceCall } from '../../peripherals/ethereum/calls/BalanceCall'
import { MulticallClient } from '../../peripherals/ethereum/MulticallClient'
import { BlockNumberUpdater } from '../BlockNumberUpdater'

export interface HeldAsset {
  holder: EthereumAddress
  assetId: AssetId
}

export class BalanceProvider {
  constructor(
    private readonly multicallClient: MulticallClient,
    private readonly blockNumberUpdater: BlockNumberUpdater,
    private readonly chainId: ChainId,
  ) {}

  getChainId() {
    return this.chainId
  }

  async fetchBalances(
    missingData: HeldAsset[],
    timestamp: UnixTime,
  ): Promise<BalanceRecord[]> {
    const blockNumber = await this.blockNumberUpdater.getBlockNumberWhenReady(
      timestamp,
    )
    assert(blockNumber, 'No timestamp for this block number')

    const calls = missingData.map((m) =>
      BalanceCall.encode(m.holder, m.assetId),
    )

    const multicallResponses = await this.multicallClient.multicall(
      calls,
      blockNumber,
    )

    return multicallResponses.map((res, i) => ({
      holderAddress: missingData[i].holder,
      assetId: missingData[i].assetId,
      balance: BalanceCall.decodeOr(res, 0n),
      timestamp,
      chainId: this.chainId,
    }))
  }
}
