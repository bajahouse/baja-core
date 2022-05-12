import { Component, ComponentOptions, Frame, Element } from '../app'
import { BASE_BACKDROP } from '../constants'
import { rgb } from '../utils'
import { Rgb } from '../types'

export interface SectionOptions extends ComponentOptions {
  name: string
  parent: Element<any, any>
  height: number
  previous?: Element<any, any>
  x?: number
  y?: number
  title?: string
  bg?: boolean
  color?: Rgb
}

export const Section: Component<SectionOptions> = options => {
  const p = Frame(options)

  // padding
  p.ref.SetHeight(options.bg ? options.height : (options.height - 20))
  p.ref.SetWidth(options.width || (options.parent.inner.GetWidth() - 6))

  // x, y
  const x = options.x || 0
  const y = options.y || -12

  // position based on y
  p.ref.SetPoint('TOPLEFT', x, y)

  // position based on previous
  if (options.previous)
    p.ref.SetPoint('TOPLEFT', options.previous.ref, 'BOTTOMLEFT', x, -26)

  // inner
  const f = Frame({ name: `${options.name}-inner`, parent: p })
  if (options.bg) {
    f.ref.SetHeight(p.ref.GetHeight() - 20)
    f.ref.SetWidth(p.ref.GetWidth() - 20)
  } else {
    f.ref.SetWidth(p.ref.GetWidth() + 4)
    f.ref.SetHeight(p.ref.GetHeight() - 4)
  }
  f.ref.SetPoint('CENTER')
  p.inner = f.ref

  // title
  if (options.title) {
    const text = p.ref.CreateFontString(
      `${p.ref.GetName()}-title`,
      'OVERLAY',
      'GameTooltipText',
    )
    text.SetFont('Fonts/FRIZQT__.TTF', 12)
    text.SetText(options.title)
    text.SetPoint('TOPLEFT', 0, 12)
  }

  // color
  if (options.bg) {
    p.ref.SetBackdrop({
      ...BASE_BACKDROP,
      bgFile: options.color ? 'Interface/Tooltips/UI-Tooltip-Background' : '',
      edgeFile: options.bg ? BASE_BACKDROP.edgeFile : '',
    })

    p.ref.SetBackdropColor(0, 0, 0, 0)

    if (options.color)
      p.ref.SetBackdropColor(...rgb(...options.color), 1)
  }

  return p
}

