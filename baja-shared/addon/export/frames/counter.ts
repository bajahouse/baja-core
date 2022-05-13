import { Input } from './input'
import { $, SmartFrame, FrameOptions } from '../lib'
import { Button } from './button'

export interface CounterOptions extends SmartFrame {
  width?: number
  min?: number
  max?: number
  initial?: number
  onAccept?: (amount: number, element: SmartFrame) => number | void
  onCancel?: (amount: number, element: SmartFrame) => number | void
}

export const Counter = options => {
  let count = options.initial || 0
  const counter = $({
    ...options,
    height: options.height || 30,
    backdrop: 'tooltip',
  })
  counter.SetBackdropColor(0, 0, 0, 1)
  counter.SetHeight(options.height || 30)

  const width = options.width || options.parent.inner.GetWidth()

  counter.SetWidth(width - 15)

  const input = Input({
    mod: options.mod,
    width: counter.GetWidth() - 16,
    height: counter.GetHeight(),
    parent: counter,
  })
  input.ref.SetPoint('CENTER')
  const i = CreateFrame('EditBox', `${options.name}-editbox`, input.ref)
  i.SetAllPoints(input.ref)
  i.SetNumeric()
  i.SetNumber(count)
  i.SetPoint('CENTER')
  i.SetAutoFocus(false)
  i.SetFont('Fonts/FRIZQT__.TTF', 12)
  i.ClearFocus()
  i.SetScript('OnTextChanged', () => {
  })
  input.inner = i as any
  counter.EnableMouse(true)
  counter.SetScript('OnMouseDown', () => {
    i.SetFocus()
  })
  const fn = (isDontTrigger?: boolean) => {
    i.ClearFocus()
    let current = i.GetNumber()
    if (!!options.max && (current > options.max))
      current = options.max
    if (!!options.min && (current < options.min))
      current = options.min
    count = current
    const r = options.onAccept(count, counter)
    if (typeof r === 'number')
      count = r
    i.SetNumber(count)
    PlaySound(1115)
  }
  const increment = () => {
    let current = i.GetNumber() + 1
    if (!!options.max && (current > options.max))
      current = options.max
    if (!!options.min && (current < options.min))
      current = options.min
    count = current
    const r = options.onAccept(count, counter)
    if (typeof r === 'number')
      count = r
    i.SetNumber(current)
  }
  const decrement = () => {
    let current = i.GetNumber() - 1
    if (!!options.max && (current > options.max))
      current = options.max
    if (!!options.min && (current < options.min))
      current = options.min
    count = current
    const r = options.onAccept(count, counter)
    if (typeof r === 'number')
      count = r
    i.SetNumber(current)
  }
  input.ref.EnableMouseWheel(true)
  input.ref.SetScript('OnMouseWheel', (_, d) => {
    if (d > 0)
      increment()
    if (d < 0)
      decrement()
  })
  i.SetScript('OnTabPressed', () => fn())
  i.SetScript('OnSpacePressed', () => fn())
  i.SetScript('OnEnterPressed', () => fn())
  i.SetScript('OnEscapePressed', () => {
    i.SetNumber(count)
    i.ClearFocus()
    options.onCancel(count, counter)
  })
  const plus = Button({
    mod: options.mod,
    parent: input,
    text: '+',
    width: 30,
    fontSize: 20,
    isBordered: false,
    scale: 0.5,
    textXOffset: -2,
    onClick: () => {
      increment()
    },
  })
  const minus = Button({
    mod: options.mod,
    parent: input,
    text: '-',
    width: 30,
    fontSize: 24,
    isBordered: false,
    scale: 0.5,
    textXOffset: 0,
    textYOffset: 2,
    onClick: () => {
      decrement()
    },
  })
  plus.SetPoint('TOPLEFT', i, 'TOPRIGHT', 15, 0)
  minus.SetPoint('BOTTOMLEFT', i, 'BOTTOMRIGHT', 15, 0)

  return counter
}
