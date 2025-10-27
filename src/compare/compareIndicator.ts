import type { IndicatorTemplate, KLineData } from 'klinecharts'

interface CompareIndicator {
  close?: number
}

/**
 * Compare Indicator
 */
// @ts-expect-error
const compareIndicator: IndicatorTemplate<CompareIndicator, number> = {
  name: 'compareIndicator',
  shortName: 'COMPARE',
  series: 'price',
  figures: [
    { key: 'close', title: 'COMPARE: ', type: 'line' }
  ],
  calc: (data: KLineData) => {
    // @ts-expect-error
    return data.reduce((prev, kLineData) => {
      prev[kLineData.timestamp] = {close: 2500}
    }, {})
  }
}

export default compareIndicator