import { ChainId } from '@l2beat/shared-pure'
import { assert } from 'console'

import { DiscoveryProvider } from './DiscoveryProvider'

export type DiscoveryProvidersConfig = Record<
  number,
  {
    etherscanLikeUrl: string
    etherscanLikeApiKey: string
    rpcUrl: string
    minBlockTimestamp: UnixTime
  }
>

// export function initDiscoveryProviders(config: DiscoveryProvidersConfig) {
//   const http = new HttpClient()
//   const providersObject: DiscoveryProviders = {}

//   for (const [
//     chainId,
//     { etherscanLikeApiKey, etherscanLikeUrl, minBlockTimestamp, rpcUrl },
//   ] of Object.entries(config)) {
//     const provider = new providers.StaticJsonRpcProvider({
//       url: rpcUrl,
//       // TODO: Make this configurable
//       timeout: 15_000,
//     })

//     const etherscanLikeClient = new EtherscanLikeClient(
//       http,
//       etherscanLikeUrl,
//       etherscanLikeApiKey,
//       minBlockTimestamp,
//     )

//     providersObject[Number(chainId)] = new DiscoveryProvider(
//       provider,
//       etherscanLikeClient,
//     )
//   }
//   return providersObject
// }

export class DiscoveryProviders {
  constructor(private readonly providers: Record<number, DiscoveryProvider>) {}

  get(chainId: ChainId) {
    const provider = this.providers[+chainId]
    assert(provider, `No provider for chain ${chainId.toString()}`)
    return provider
  }
}
