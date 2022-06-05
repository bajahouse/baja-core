import { Scroll } from './scroll'
import { Frame, SmartFrame, FrameOptions } from '../lib'

export interface TextareaOptions extends FrameOptions {
  initial?: string
  onAccept?: (text: string) => void
  onChange?: (text: string) => void
  onCancel?: (text: string) => void
  max?: number
}

export const Textarea = (options: TextareaOptions) => {
  let text = options.initial || ''
  const a = Frame({
    ...options,
    backdrop: 'tooltip',
    width: options.parent.Inner().GetWidth(),
    height: options.parent.Inner().GetHeight(),
    point: 'TOPLEFT',
  })
  const b = Frame({
    parent: a,
    point: 'CENTER',
    width: options.parent.Inner().GetWidth() - 20,
    height: options.parent.Inner().GetHeight() - 20,
  })
  const s = Scroll({ scrollHeight: 50, parent: b })
  const e = CreateFrame('EditBox', `${s.UID}-inner`, s.Inner())
  e.SetPoint('TOPLEFT')
  e.SetWidth(s.Inner().GetWidth() - 10)
  e.SetHeight(s.Inner().GetHeight())
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
