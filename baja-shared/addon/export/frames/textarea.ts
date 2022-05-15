import { Scroll } from './scroll'
import { $, SmartFrame, FrameOptions } from '../lib'

export interface TextareaOptions extends FrameOptions {
  initial?: string
  onAccept?: (text: string) => void
  onChange?: (text: string) => void
  onCancel?: (text: string) => void
  max?: number
}

export const Textarea = options => {
  let text = options.initial || ''
  const a = $({
    ...options,
    backdrop: 'tooltip',
    // FIXME: Inner
    width: (options.parent as any).Inner().GetWidth(),
    height: (options.parent as any).Inner().GetHeight(),
    point: 'TOPLEFT',
  })
  const b = $({
    parent: a,
    point: 'CENTER',
    // FIXME: Inner
    width: (options.parent as any).Inner().GetWidth() - 20,
    height: (options.parent as any).Inner().GetHeight() - 20,
  })
  const s = Scroll({ scrollHeight: 50, parent: b })
  // FIXME: Inner
  const e = CreateFrame('EditBox', `${options.name}-inner`, (s as any).Inner())
  e.SetPoint('TOPLEFT')
  e.SetWidth((s as any).Inner().GetWidth() - 10)
  e.SetHeight((s as any).Inner().GetHeight())
  e.SetFont('Fonts/FRIZQT__.TTF', 12)
  e.SetAutoFocus(false)
  e.SetMultiLine(true)
  e.ClearFocus()
  e.SetJustifyH('LEFT')
  e.SetText(text)
  s.EnableMouse(true)
  s.SetScript('OnMouseDown', () => {
    e.SetFocus()
  })
  e.SetScript('OnTextChanged', () => {
    s.Height(e.GetHeight())
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
