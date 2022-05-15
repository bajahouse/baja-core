import { $, SmartFrame, FrameOptions } from '../lib'

export const SCROLL_WIDTH = 20

export interface ScrollOptions extends FrameOptions {
  scrollHeight?: number
}

export interface ScrollFrame extends SmartFrame {
  Height: (amount: number) => void,
  Bottom: () => void,
}

export const Scroll = (options: ScrollOptions): ScrollFrame => {
  const a = $(options).ToAdvancedFrame<ScrollFrame>()
  // FIXME
  const frame = (a as any).Inner()

  frame.SetAllPoints(frame.GetParent() as WoWAPI.Frame)

  const scrollframe = $({
    template: 'UIPanelScrollFrameTemplate',
    type: 'ScrollFrame',
    parent: a,
  })


  const ref = scrollframe as WoWAPI.ScrollFrame

  const scrollchild = $({
    parent: scrollframe,
  })

  const scrollbarName = ref.GetName()

  const scrollbar = _G[scrollbarName + 'ScrollBar']
  const scrollupbutton = _G[scrollbarName + 'ScrollBarScrollUpButton']
  const scrolldownbutton = _G[scrollbarName + 'ScrollBarScrollDownButton']

  scrollupbutton.ClearAllPoints()
  scrollupbutton.SetPoint('TOPRIGHT', scrollframe, 'TOPRIGHT', -2, -2)

  scrolldownbutton.ClearAllPoints()
  scrolldownbutton.SetPoint('BOTTOMRIGHT', scrollframe, 'BOTTOMRIGHT', -2, 2)

  scrollbar.ClearAllPoints()
  scrollbar.SetPoint('TOP', scrollupbutton, 'BOTTOM', 0, -2)
  scrollbar.SetPoint('BOTTOM', scrolldownbutton, 'TOP', 0, 2)

  frame.SetPoint('CENTER')

  ref.SetScrollChild(scrollchild)
  ref.SetAllPoints(frame)

  scrollchild.SetSize(ref.GetWidth(), options.scrollHeight || ref.GetHeight() * 2)

  const moduleoptions = CreateFrame('Frame', 'moduleoptions', scrollchild)

  moduleoptions.SetPoint('TOPLEFT')
  moduleoptions.SetWidth(scrollchild.GetWidth() - SCROLL_WIDTH)
  moduleoptions.SetHeight(scrollchild.GetHeight())

  a.Height = (amount: number) => {
    scrollchild.SetHeight(amount)
    moduleoptions.SetHeight(amount)
  }

  a.Bottom = () => {
    ref.SetVerticalScroll(ref.GetVerticalScrollRange())
  }

  // FIXME: inner
  (a as any).Inner(moduleoptions)

  return a
}

