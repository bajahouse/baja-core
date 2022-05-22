import { $, SmartFrame, FrameOptions } from '../lib'

export interface NumericOptions extends FrameOptions {
  initial?: number
  onAccept?: (text: number, element: SmartFrame) => number | void
  onCancel?: (text: number, element: SmartFrame) => number | void
  onChange?: (text: number, element: SmartFrame) => number | void
  // FIXME: min/max
}

export const Numeric = (options: NumericOptions) => {
  let number = options.initial || 0
  const input = $({
    ...options,
    height: options.height || 30,
    backdrop: 'tooltip',
  })

  const width = options.width || options.parent.Inner().GetWidth()

  input.SetWidth(width)

  const inner = $({
    width: input.GetWidth() - 16,
    height: input.GetHeight(),
    parent: input,
  })
  inner.SetPoint('CENTER')
  const e = CreateFrame('EditBox', `${options.uid}-editbox`, inner)
  e.SetAllPoints(inner)
  e.SetNumeric()
  e.SetNumber(number)
  e.SetPoint('CENTER')
  e.SetAutoFocus(false)
  e.SetFont('Fonts/FRIZQT__.TTF', 12)
  e.ClearFocus()
  e.SetScript('OnTextChanged', () => {
    if (options.onChange)
      options.onChange(number, input)
  })
  inner.Inner(e as any)
  input.EnableMouse(true)
  input.SetScript('OnMouseDown', () => {
    e.SetFocus()
  })
  const fn = () => {
    number = e.GetNumber()
    e.ClearFocus()
    if (options.onAccept)
      options.onAccept(number, input)
    PlaySound(1115)
  }
  inner.EnableMouseWheel(true)
  e.SetScript('OnTabPressed', () => fn())
  e.SetScript('OnEnterPressed', () => fn())
  e.SetScript('OnEscapePressed', () => {
    e.SetNumber(number)
    e.ClearFocus()
    if (options.onCancel)
      options.onCancel(number, input)
  })

  return input
}

