import { Component, ComponentOptions, Frame, Element } from '../app'
import { BASE_BACKDROP } from '../constants'

export interface NumericOptions extends ComponentOptions {
  initial?: number
  onAccept?: (text: number, element: Element<any, any>) => number | void
  onCancel?: (text: number, element: Element<any, any>) => number | void
  onChange?: (text: number, element: Element<any, any>) => number | void
  // FIXME: min/max
}

export const Numeric: Component<NumericOptions> = options => {
  let number = options.initial || 0
  const input = Frame({
    ...options,
    height: options.height || 30,
  }) as Element<any, any>
  input.ref.SetBackdrop({
    ...BASE_BACKDROP,
  })
  input.ref.SetBackdropColor(0, 0, 0, 1)
  input.ref.SetHeight(options.height || 30)

  const width = options.width || options.parent.inner.GetWidth()

  input.ref.SetWidth(width)

  const inner = Frame({
    name: `${options.name}-input`,
    width: input.ref.GetWidth() - 16,
    height: input.ref.GetHeight(),
    parent: input,
  })
  inner.ref.SetPoint('CENTER')
  const e = CreateFrame('EditBox', `${options.name}-editbox`, inner.ref)
  e.SetAllPoints(inner.ref)
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
  inner.inner = e as any
  input.ref.EnableMouse(true)
  input.ref.SetScript('OnMouseDown', () => {
    e.SetFocus()
  })
  const fn = () => {
    number = e.GetNumber()
    e.ClearFocus()
    if (options.onAccept)
      options.onAccept(number, input)
    PlaySound(1115)
  }
  inner.ref.EnableMouseWheel(true)
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

