import { Component, ComponentOptions, Frame, Element } from '../app'

export interface CheckButton extends ExtendedFrame {
  GetChecked: () => number | null
  SetChecked: (isChecked: number | boolean | null) => void
  SetText: (text: string) => void
}

export interface CheckboxOptions extends ComponentOptions {
  text: string
  initial?: number
  onChange?: (isChecked: number, element: Element<any, any>) => void
  onCheck?: (element: Element<any, any>) => void
  onUncheck?: (element: Element<any, any>) => void
  // FIXME: min/max
}

export const Checkbox: Component<CheckboxOptions> = options => {
  const f = Frame({ ...options }) as Element<any, any>
  f.ref.SetSize(options.parent.inner.GetWidth(), 24)

  const check = CreateFrame('CheckButton' as any, `${options.name}-checkbutton`, f.ref, 'ChatConfigCheckButtonTemplate') as CheckButton
  check.SetPoint('TOPLEFT')
  check.SetText('hello world')
  let isChecked = options.initial
  if (options.initial)
    check.SetChecked(true)

  const t = check.CreateFontString(`${options.name}-checkbutton-text`, 'OVERLAY', 'GameTooltipText')
  t.SetFont('Fonts/FRIZQT__.TTF', 12)
  t.SetText(options.text)
  t.SetParent(check)
  t.SetPoint('LEFT', check, 'RIGHT', 1, 0)

  check.SetScript('OnClick', () => {
    const value = check.GetChecked()
    if ((value !== isChecked) && options.onChange)
      options.onChange(value, f)
    if ((value === 1) && options.onCheck) {
      options.onCheck(f)
      PlaySound(856)
    }
    if ((value === null) && options.onUncheck) {
      options.onUncheck(f)
      PlaySound(857)
    }
    isChecked = value
  })

  return f
}

