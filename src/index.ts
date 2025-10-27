/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { IndicatorSeries, KLineData, registerIndicator, registerOverlay } from 'klinecharts'

import overlays from './extension'

import DefaultDatafeed from './DefaultDatafeed'
import KLineChartPro from './KLineChartPro'

import { load } from './i18n'

import { Datafeed, SymbolInfo, Period, DatafeedSubscribeCallback, ChartProOptions, ChartPro, SymbolDetails } from './types'

import './index.less'

overlays.forEach(o => { registerOverlay(o) })

registerIndicator({
  name: 'customIndicatorBasic',
  shortName: 'Basic',
  series: IndicatorSeries.Price,
  figures: [{
    key: 'close',
    title: 'close: ',
    type: 'line'
  }],
  calc: (data: KLineData[]) => {
    return data.map((item) => ({
      timestamp: item.timestamp,
      close: item.close + 1
    }))
  }
})

export {
  DefaultDatafeed as PolygonIoDatafeed,
  KLineChartPro,
  load as loadLocales
}

export type {
  Datafeed, SymbolInfo, Period, DatafeedSubscribeCallback, ChartProOptions, ChartPro, SymbolDetails
}
