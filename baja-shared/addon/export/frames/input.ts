import { Component, ComponentOptions, Frame, Element } from '../app'
import { BASE_BACKDROP } from '../constants'

export interface InputOptions extends ComponentOptions {
  initial?: string
  onAccept?: (text: string, element: Element<any, any>) => string | void
  onCancel?: (text: string, element: Element<any, any>) => string | void
  onChange?: (text: string, element: Element<any, any>) => string | void
  // FIXME: min/max
}

export const Input: Component<InputOptions> = options => {
  let text = options.initial || ''
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
  e.SetText(text)
  e.SetPoint('CENTER')
  e.SetAutoFocus(false)
  e.SetFont('Fonts/FRIZQT__.TTF', 12)
  e.ClearFocus()
  e.SetScript('OnTextChanged', () => {
    if (options.onChange)
      options.onChange(text, input)
  })
  input.inner = e as any
  input.ref.EnableMouse(true)
  input.ref.SetScript('OnMouseDown', () => {
    e.SetFocus()
  })
  const fn = () => {
    text = e.GetText()
    e.ClearFocus()
    if (options.onAccept)
      options.onAccept(text, input)
    PlaySound(1115)
  }
  inner.ref.EnableMouseWheel(true)
  e.SetScript('OnTabPressed', () => fn())
  e.SetScript('OnEnterPressed', () => fn())
  e.SetScript('OnEscapePressed', () => {
    e.SetText(text)
    e.ClearFocus()
    if (options.onCancel)
      options.onCancel(text, input)
  })

  return input
}

