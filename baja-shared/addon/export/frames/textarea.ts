import { Component, ComponentOptions, Frame } from '../app'
import { BASE_BACKDROP } from '../constants'
import { Scroll } from './scroll'

export interface TextareaOptions extends ComponentOptions {
  initial?: string
  onAccept?: (text: string) => void
  onChange?: (text: string) => void
  onCancel?: (text: string) => void
  max?: number
}

export const Textarea: Component<TextareaOptions> = options => {
  let text = options.initial || ''
  const a = Frame({ ...options })
  a.ref.SetPoint('TOPLEFT')
  a.ref.SetWidth(options.parent.inner.GetWidth())
  a.ref.SetHeight(options.parent.inner.GetHeight())
  a.ref.SetBackdrop(BASE_BACKDROP)
  const b = Frame({ name: `${options.name}-inner`, parent: a })
  b.ref.SetPoint('CENTER')
  b.ref.SetWidth(options.parent.inner.GetWidth() - 20)
  b.ref.SetHeight(options.parent.inner.GetHeight() - 20)
  const s = Scroll({ name: `${options.name}-scroll`, scrollHeight: 50, parent: b })
  const e = CreateFrame('EditBox', `${options.name}-inner`, s.inner)
  e.SetPoint('TOPLEFT')
  e.SetWidth(s.inner.GetWidth() - 10)
  e.SetHeight(s.inner.GetHeight())
  e.SetFont('Fonts/FRIZQT__.TTF', 12)
  e.SetAutoFocus(false)
  e.SetMultiLine(true)
  e.ClearFocus()
  e.SetJustifyH('LEFT')
  e.SetText(text)
  s.ref.EnableMouse(true)
  s.ref.SetScript('OnMouseDown', () => {
    e.SetFocus()
  })
  e.SetScript('OnTextChanged', () => {
    s.fns.Height(e.GetHeight())
    if (options.onChange)
      options.onChange(e.GetText())
  })
  // e.SetScript('OnTabPressed', () => {
  //   e.ClearFocus()
  //   text = e.GetText()
  //   if (options.onAccept)
  //     options.onAccept(text)
  // })
  // e.SetScript('OnEnterPressed', () => {
  //   text = e.GetText()
  //   if (options.onAccept)
  //     options.onAccept(text)
  //   e.ClearFocus()
  // })
  e.SetScript('OnEscapePressed', () => {
    // e.SetText(text)
    // if (options.onCancel)
    //   options.onCancel(text)
    text = e.GetText()
    if (options.onAccept)
      options.onAccept(text)
    e.ClearFocus()
    PlaySound(1115)
  })

  if (options.max)
    e.SetMaxLetters(options.max)

  return s as any
}
