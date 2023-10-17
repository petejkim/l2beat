import { EthereumAddress, UnixTime } from '@l2beat/shared-pure'

export interface Layer2LivenessConfig {
  stateUpdates: (FunctionCallParams | TransferParams)[]
  batchSubmissions: (FunctionCallParams | TransferParams)[]
}

interface FunctionCallParams {
  formula: 'functionCall'
  address: EthereumAddress
  selector: string
  sinceTimestamp: UnixTime
  untilTimestamp?: UnixTime
}

interface TransferParams {
  formula: 'transfer'
  from: EthereumAddress
  to: EthereumAddress
  sinceTimestamp: UnixTime
  untilTimestamp?: UnixTime
}
