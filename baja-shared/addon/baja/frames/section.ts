// ============================================================================
//
// - Section -
//
//   This file defines a frame for labeling inputs.
//
// ============================================================================

import { Frame, EasyFrame, FrameOptions, Color, DEFAULT_BACKDROP } from '../lib'

export interface SectionOptions extends FrameOptions {
  name: string
  parent: EasyFrame
  height: number
  previous?: EasyFrame
  x?: number
  y?: number
  title?: string
  bg?: boolean
}

export const Section = (options: SectionOptions) => {
  const p = Frame(options)

  // padding
  p.SetHeight(options.bg ? options.height : (options.height - 20))
  p.SetWidth(options.width || (options.parent.Inner().GetWidth() - 6))

  // x, y
  const x = options.x || 0
  const y = options.y || -12

  // position based on y
  p.SetPoint('TOPLEFT', x, y)

  // position based on previous
  if (options.previous)
    p.SetPoint('TOPLEFT', options.previous, 'BOTTOMLEFT', x, -26)

  // inner
  const f = Frame({ parent: p })
  if (options.bg) {
    f.SetHeight(p.GetHeight() - 20)
    f.SetWidth(p.GetWidth() - 20)
  } else {
    f.SetWidth(p.GetWidth() + 4)
    f.SetHeight(p.GetHeight() - 4)
  }
  f.SetPoint('CENTER')
  // Inner
  p.Inner(f)

  // title
  if (options.title) {
    const text = p.CreateFontString(
      `${p.UID}-title`,
      'OVERLAY',
      'GameTooltipText',
    )
    text.SetFont('Fonts/FRIZQT__.TTF', 12)
    text.SetText(options.title)
    text.SetPoint('TOPLEFT', 0, 12)
  }

  return p
}

