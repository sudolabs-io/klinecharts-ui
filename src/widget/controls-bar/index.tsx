import { CandleType, Chart, Nullable } from "klinecharts";

interface ControlsBarProps {
  onChangeCandleType: (type: CandleType) => void
  isDrawingBarVisible: boolean
  widget: Nullable<Chart>
}

export function ControlsBar({onChangeCandleType, isDrawingBarVisible, widget}: ControlsBarProps) {
  return (
    <div class="klinecharts-pro-controls-bar" data-drawing-bar-visible={isDrawingBarVisible}>
        <button onClick={() => {  onChangeCandleType(CandleType.CandleSolid) }} data-selected={widget?.getStyles().candle.type === CandleType.CandleSolid}>
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="#000000" d="M8 20q-.425 0-.713-.288T7 19v-1H6q-.425 0-.713-.288T5 17V7q0-.425.288-.713T6 6h1V5q0-.425.288-.713T8 4q.425 0 .713.288T9 5v1h1q.425 0 .713.288T11 7v10q0 .425-.288.713T10 18H9v1q0 .425-.288.713T8 20Zm8 0q-.425 0-.713-.288T15 19v-4h-1q-.425 0-.713-.288T13 14V9q0-.425.288-.713T14 8h1V5q0-.425.288-.713T16 4q.425 0 .713.288T17 5v3h1q.425 0 .713.288T19 9v5q0 .425-.288.713T18 15h-1v4q0 .425-.288.713T16 20Z"/></svg>
        </button>
        <button onClick={() => {  onChangeCandleType(CandleType.Area) }} data-selected={widget?.getStyles().candle.type === CandleType.Area}>
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path fill="#000000" d="M20 2v16H.32c-.318 0-.416-.209-.216-.465l4.469-5.748a.526.526 0 0 1 .789-.062l1.419 1.334a.473.473 0 0 0 .747-.096l3.047-4.74a.466.466 0 0 1 .741-.09l2.171 2.096c.232.225.559.18.724-.1l5.133-7.785C19.51 2.062 19.75 2 20 2z"/></svg>
        </button>
        <button onClick={() => {  onChangeCandleType(CandleType.Ohlc) }} data-selected={widget?.getStyles().candle.type === CandleType.Ohlc}>
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 16v-2m7 7v-2m7-6v-2M5 8V6m7 7v-2m7-6V3M7 8.6v4.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V8.6a.6.6 0 0 1 .6-.6h2.8a.6.6 0 0 1 .6.6Zm7 5v4.8a.6.6 0 0 1-.6.6h-2.8a.6.6 0 0 1-.6-.6v-4.8a.6.6 0 0 1 .6-.6h2.8a.6.6 0 0 1 .6.6Zm7-8v4.8a.6.6 0 0 1-.6.6h-2.8a.6.6 0 0 1-.6-.6V5.6a.6.6 0 0 1 .6-.6h2.8a.6.6 0 0 1 .6.6Z"/></svg>
        </button>
    </div>
  )
}