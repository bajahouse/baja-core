import { Frame, SmartFrame, FrameOptions } from '../lib'

export interface CheckButton extends SmartFrame {
  GetChecked: () => number | null
  SetChecked: (isChecked: number | boolean | null) => void
  SetText: (text: string) => void
}

export interface CheckboxOptions extends FrameOptions {
  text: string
  initial?: number
  onChange?: (isChecked: number, element: SmartFrame) => void
  onCheck?: (element: SmartFrame) => void
  onUncheck?: (element: SmartFrame) => void
  // FIXME: min/max
}

export const Checkbox = (options: CheckboxOptions) => {
  const f = Frame({ ...options })
  f.SetSize(options.parent.GetWidth(), 24)

  const check = Frame({
    ...options,
    type: 'CheckButton',
    template: 'ChatConfigCheckButtonTemplate',
  })
  check.SetPoint('TOPLEFT')
  check.SetText('hello world')
  let isChecked = options.initial
  if (options.initial)
    check.SetChecked(true)

  // FIXME: build ExtendedText frame
  const t = check.CreateFontString('', 'OVERLAY', 'GameTooltipText')
  t.SetFont('Fonts/FRIZQT__.TTF', 12)
  t.SetText(options.text)
  t.SetParent(check)
  t.SetPoint('LEFT', check, 'RIGHT', 1, 0)

  check.SetScript('OnClick', () => {
    const value = check.GetChecked()
    if (((value ? 1 : 0) !== isChecked) && options.onChange)
      options.onChange(value ? 1 : 0, f)
    if (((value ? 1 : 0) === 1) && options.onCheck) {
      options.onCheck(f)
      PlaySound(856)
    }
    if ((value === null) && options.onUncheck) {
      options.onUncheck(f)
      PlaySound(857)
    }
    isChecked = value ? 1 : 0
  })

  // FIXME: implement api

  return f
}

