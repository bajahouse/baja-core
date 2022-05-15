import { $, SmartFrame, FrameOptions, RGB, DEFAULT_BACKDROP } from '../lib'

export interface SectionOptions extends FrameOptions {
  name: string
  parent: SmartFrame
  height: number
  previous?: SmartFrame
  x?: number
  y?: number
  title?: string
  bg?: boolean
}

export const Section = (options: SectionOptions) => {
  const p = $(options)

  // padding
  p.SetHeight(options.bg ? options.height : (options.height - 20))
  // FIXME: Inner
  p.SetWidth(options.width || ((options.parent as any).Inner().GetWidth() - 6))

  // x, y
  const x = options.x || 0
  const y = options.y || -12

  // position based on y
  p.SetPoint('TOPLEFT', x, y)

  // position based on previous
  if (options.previous)
    p.SetPoint('TOPLEFT', options.previous, 'BOTTOMLEFT', x, -26)

  // inner
  const f = $({ parent: p })
  if (options.bg) {
    f.SetHeight(p.GetHeight() - 20)
    f.SetWidth(p.GetWidth() - 20)
  } else {
    f.SetWidth(p.GetWidth() + 4)
    f.SetHeight(p.GetHeight() - 4)
  }
  f.SetPoint('CENTER')
  // Inner
  ;(p as any).Inner(f)

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

