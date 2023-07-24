import { State } from '../state/State'
import { fillBelowChart } from './fillBelowChart'
import { strokeChartLine } from './strokeChartLine'
import {
  getEBVStyle,
  getCBVStyle,
  getMainStyle,
  getSecondaryStyle,
  getNMVStyle,
} from './style'

export function renderChart(
  state: State,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  if (!state.view.chart) {
    return
  }

  const box = canvas.getBoundingClientRect()
  canvas.width = box.width * window.devicePixelRatio
  canvas.height = box.height * window.devicePixelRatio

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const mainStyle = getMainStyle(canvas, ctx)
  const secondaryStyle = getSecondaryStyle(canvas, ctx)

  if (
    state.controls.showEthereum &&
    state.view.chart.type === 'ActivityChart'
  ) {
    const mainPoints = state.view.chart.points
    const secondaryPoints = mainPoints.map((p) => ({ x: p.x, y: p.y2 }))
    fillBelowChart(ctx, secondaryPoints, canvas, secondaryStyle.fillGradient, {
      fade: true,
    })
    fillBelowChart(ctx, mainPoints, canvas, mainStyle.fillGradient)
    strokeChartLine(ctx, secondaryPoints, canvas, secondaryStyle.strokeGradient)
    strokeChartLine(ctx, mainPoints, canvas, mainStyle.strokeGradient)
  } else if (state.view.chart.type === 'AggregateDetailedTvlChart') {
    const cbvFillSTyle = getCBVStyle(canvas, ctx)
    const ebvFillStyle = getEBVStyle(canvas, ctx)
    const nmvFillStyle = getNMVStyle(canvas, ctx)
    const cbvPoints = state.view.chart.points.map((p) => ({
      x: p.x,
      y: p.ys.cbv,
    }))
    const ebvPoints = state.view.chart.points.map((p) => ({
      x: p.x,
      y: p.ys.ebv,
    }))
    const nmvPoints = state.view.chart.points.map((p) => ({
      x: p.x,
      y: p.ys.nmv,
    }))

    fillBelowChart(ctx, cbvPoints, canvas, cbvFillSTyle)
    fillBelowChart(ctx, ebvPoints, canvas, ebvFillStyle)
    fillBelowChart(ctx, nmvPoints, canvas, nmvFillStyle)
  } else {
    const mainPoints = state.view.chart.points
    fillBelowChart(ctx, mainPoints, canvas, mainStyle.fillGradient)
    strokeChartLine(ctx, mainPoints, canvas, mainStyle.strokeGradient)
  }
}
