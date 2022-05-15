import { $, SmartFrame, FrameOptions } from '../lib'

export interface InputOptions extends FrameOptions {
  initial?: string
  onAccept?: (text: string, element: SmartFrame) => string | void
  onCancel?: (text: string, element: SmartFrame) => string | void
  onChange?: (text: string, element: SmartFrame) => string | void
  // FIXME: min/max
}

export const Input = options => {
  let text = options.initial || ''
  const input = $({
    ...options,
    height: options.height || 30,
    backdrop: 'tooltip',
  })

  const width = options.width || options.parent.inner.GetWidth()

  input.SetWidth(width)

  const inner = $({
    width: input.GetWidth() - 16,
    height: input.GetHeight(),
    parent: input,
  })
  inner.SetPoint('CENTER')
  const e = CreateFrame('EditBox', `${options.name}-editbox`, inner)
  e.SetAllPoints(inner)
  e.SetText(text)
  e.SetPoint('CENTER')
  e.SetAutoFocus(false)
  e.SetFont('Fonts/FRIZQT__.TTF', 12)
  e.ClearFocus()
  e.SetScript('OnTextChanged', () => {
    if (options.onChange)
      options.onChange(text, input)
  })
  input.Inner(e)
  input.EnableMouse(true)
  input.SetScript('OnMouseDown', () => {
    e.SetFocus()
  })
  const fn = () => {
    text = e.GetText()
    e.ClearFocus()
    if (options.onAccept)
      options.onAccept(text, input)
    PlaySound(1115)
  }
  inner.EnableMouseWheel(true)
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

