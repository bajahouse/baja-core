import { $, SmartFrame, FrameOptions, RGB } from '../lib'

export interface ButtonOptions extends FrameOptions {
  text: string
  width: number
  fontSize?: number
  isBordered?: boolean
  textXOffset?: number
  textYOffset?: number
  color?: RGB
  onClick?: (frame: SmartFrame) => void
}

export const Button = (options: ButtonOptions) => {
  // setup
  const f = $({
    ...options,
    backdrop: options.isBordered ? 'tooltip' : 'noborder',
    color: options.color,
    width: options.width,
    height: 30,
    mouse: true,
  })

  // scripts
  f.SetScript('OnLeave', e => {
    e.SetBackdropColor(
      options.color[0],
      options.color[1],
      options.color[2],
      1,
    )
  })

  f.SetScript('OnEnter', e => {
    e.SetBackdropColor(
      options.color[0] * 0.8,
      options.color[1] * 0.8,
      options.color[2] * 0.8,
      1,
    )
  })

  f.SetScript('OnMouseDown', e => {
    e.SetBackdropColor(
      options.color[0] * 0.6,
      options.color[1] * 0.6,
      options.color[2] * 0.6,
      1,
    )
    if (options.onClick)
      options.onClick(f)
    PlaySound(828)
  })

  f.SetScript('OnMouseUp', e => {
    e.SetBackdropColor(
      options.color[0] * 0.8,
      options.color[1] * 0.8,
      options.color[2] * 0.8,
      1,
    )
  })

  // text
  // FIXME: Delete -> clean/reuse
  const t = f.CreateFontString(
    `${options.uid}-text`,
    'OVERLAY',
    'GameTooltipText',
  )

  t.SetParent(f)
  t.SetPoint('CENTER', options.textXOffset || 0, options.textYOffset || 0)
  t.SetText(options.text)
  t.SetFont('Fonts/FRIZQT__.TTF', options.fontSize || 10)

  return f
}

