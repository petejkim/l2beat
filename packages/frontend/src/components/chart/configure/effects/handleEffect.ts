import { ZodSchema } from 'zod'

import { Message } from '../messages'
import {
  ActivityResponse,
  AggregateDetailedTvlChartToRemove,
  AggregateDetailedTvlResponse,
  AggregateTvlResponse,
  TokenTvlResponse,
} from '../state/State'
import {
  Effect,
  FetchActivityEffect,
  FetchAggregateTvlEffect,
  FetchAlternativeTvlEffect,
  FetchDetailedAggregateTvlEffect,
  FetchTokenTvlEffect,
} from './effects'

export function handleEffect(
  effect: Effect,
  dispatch: (message: Message) => void,
) {
  switch (effect.type) {
    case 'FetchAggregateTvl':
      return handleFetchAggregateTvl(effect, dispatch)
    case 'FetchDetailedAggregateTvl':
      return handleFetchDetailedAggregateTvl(effect, dispatch)
    case 'FetchAlternativeTvl':
      return handleFetchAlternativeTvl(effect, dispatch)
    case 'FetchTokenTvl':
      return handleFetchTokenTvl(effect, dispatch)
    case 'FetchActivity':
      return handleFetchActivity(effect, dispatch)
  }
}

function handleFetchAggregateTvl(
  { url, requestId }: FetchAggregateTvlEffect,
  dispatch: (message: Message) => void,
) {
  timeoutLoader(requestId, dispatch)
  fetchThenDispatch(
    url,
    dispatch,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    (data) => ({ type: 'AggregateTvlLoaded', requestId, data }),
    () => ({ type: 'AggregateTvlFailed', requestId }),
    AggregateTvlResponse,
  )
}

function handleFetchDetailedAggregateTvl(
  { url, requestId }: FetchDetailedAggregateTvlEffect,
  dispatch: (message: Message) => void,
) {
  console.log('radomski', url, requestId)
  console.log(dispatch)
  const generateData = () => {
    const result: AggregateDetailedTvlChartToRemove = {
      types: ['timestamp', 'usd', 'eth'],
      data: [],
    }
    for (let i = 0; i < 1000; i++) {
      result.data.push([
        Date.now(),
        {
          tvl: 3*(i * (Math.cos(i / 10) + i)),
          ebv: i * (Math.cos(i / 10) + i),
          cbv: i * (Math.cos(i / 10) + i),
          nmv: i * (Math.cos(i / 10) + i),
        },
        {
          tvl: (i * Math.cos(i / 1000) + 1) + (i * Math.sin(i / 1000) + 1) + (i * Math.cos(i / 1000) + 1),
          ebv: i * Math.cos(i / 1000) + 1,
          cbv: i * Math.sin(i / 1000) + 1,
          nmv: i * Math.cos(i / 1000) + 1,
        },
      ])
    }

    return result
  }
  const data: AggregateDetailedTvlResponse = {
    hourly: generateData(),
    sixHourly: generateData(),
    daily: generateData(),
  }
  dispatch({ type: 'AggregateDetailedTvlLoaded', requestId, data })
}

function handleFetchAlternativeTvl(
  { url, requestId }: FetchAlternativeTvlEffect,
  dispatch: (message: Message) => void,
) {
  timeoutLoader(requestId, dispatch)
  fetchThenDispatch(
    url,
    dispatch,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    (data) => ({ type: 'AlternativeTvlLoaded', requestId, data }),
    () => ({ type: 'AlternativeTvlFailed', requestId }),
    AggregateTvlResponse,
  )
}

function handleFetchTokenTvl(
  { url, requestId, token }: FetchTokenTvlEffect,
  dispatch: (message: Message) => void,
) {
  timeoutLoader(requestId, dispatch)
  fetchThenDispatch(
    url,
    dispatch,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    (data) => ({ type: 'TokenTvlLoaded', requestId, token, data }),
    () => ({ type: 'TokenTvlFailed', requestId }),
    TokenTvlResponse,
  )
}

function handleFetchActivity(
  { url, requestId }: FetchActivityEffect,
  dispatch: (message: Message) => void,
) {
  timeoutLoader(requestId, dispatch)
  fetchThenDispatch(
    url,
    dispatch,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    (data) => ({ type: 'ActivityLoaded', requestId, data }),
    () => ({ type: 'ActivityFailed', requestId }),
    ActivityResponse,
  )
}

function fetchThenDispatch(
  url: string,
  dispatch: (message: Message) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  successMessage: (data: any) => Message,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage: (error: any) => Message,
  schema: ZodSchema<AggregateTvlResponse | TokenTvlResponse | ActivityResponse>,
) {
  fetch(url)
    .then((res) => res.json())
    .then((json) => schema.parse(json))
    .then(
      (data) => dispatch(successMessage(data)),
      (error) => {
        console.error(error)
        dispatch(errorMessage(error))
      },
    )
}

function timeoutLoader(
  requestId: number,
  dispatch: (message: Message) => void,
) {
  setTimeout(() => dispatch({ type: 'LoaderTimedOut', requestId }), 300)
}
