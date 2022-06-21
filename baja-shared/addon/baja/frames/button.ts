// ============================================================================
//
// - Button -
//
//   This file defines a custom Button frame.
//
// ============================================================================

import { Frame, EasyFrame, FrameOptions, Color } from '../lib'

export interface ButtonOptions extends FrameOptions {
  text: string
  fontSize?: number
  noBorder?: boolean
  textXOffset?: number
  textYOffset?: number
  color?: Color
  onClick?: (frame: EasyFrame) => void
}

export const Button = (options: ButtonOptions) => {
  // setup
  const f = Frame({
    backdrop: (options.noBorder === true)
      ? 'noborder'
      : 'tooltip',
    color: options.color,
    height: 30,
    mouse: true,
    ...options,
  })

  const color = options.color || [0.5, 0.5, 0.5]
  if (!options.color)
    f.SetBackdropColor(color[0], color[1], color[2], 1)

  // scripts
  f.SetScript('OnLeave', e => {
    e.SetBackdropColor(
      color[0],
      color[1],
      color[2],
      1,
    )
  })

  f.SetScript('OnEnter', e => {
    e.SetBackdropColor(
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
    )
  })

  f.SetScript('OnMouseDown', e => {
    e.SetBackdropColor(
      color[0] * 0.6,
      color[1] * 0.6,
      color[2] * 0.6,
      1,
    )
    if (options.onClick)
      options.onClick(f)
    PlaySound(828)
  })

  f.SetScript('OnMouseUp', e => {
    e.SetBackdropColor(
      color[0] * 0.8,
      color[1] * 0.8,
      color[2] * 0.8,
      1,
    )
  })

  // text
  // FIXME: Delete -> clean/reuse
  const t = f.CreateFontString(
    `${f.UID}-text`,
    'OVERLAY',
    'GameTooltipText',
  )

  t.SetParent(f)
  t.SetPoint('CENTER', options.textXOffset || 0, options.textYOffset || 0)
  t.SetText(options.text)
  t.SetFont('Fonts/FRIZQT__.TTF', options.fontSize || 10)

  return f
}

