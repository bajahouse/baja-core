import { $, SmartFrame, FrameOptions } from '../lib'

export interface GridOptions extends FrameOptions {
  itemsPerRow: number
  rowHeight: number
}

export interface GridItemOptions extends FrameOptions {
  item: SmartFrame
  width: number
  height: number
  x: number
  y: number
}

interface GridState {
  itemsPerRow: number
  rowHeight: number
  itemWidth: number
  list: SmartFrame[]
  index: number
  x: number
  y: number
}

export interface GridFrame extends FrameOptions {
  Attach: (frame: SmartFrame) => void
}

export const Grid = (options: GridOptions): GridFrame => {
  const frame = $(options).ToAdvancedFrame<GridFrame>()
  const state: GridState = {
    itemsPerRow: options.itemsPerRow,
    rowHeight: options.rowHeight,
    itemWidth: options.parent.Inner().GetWidth() / options.itemsPerRow,
    list: [],
    index: 0,
    x: 0,
    y: 0,
  }

  frame.Attach = child => {
    const isEndOfRow = state.index === ((state.itemsPerRow || 3) - 1)

    const f = GridItem({
      parent: frame,
      item: child,
      width: state.itemWidth,
      height: state.rowHeight,
      x: state.x,
      y: state.y,
    })

    if (isEndOfRow) {
      state.index = 0
      state.x = 0
      state.y -= state.rowHeight
    } else {
      state.index++
      state.x += state.itemWidth
    }

    state.list.push(f)
  }

  frame.SetAllPoints()

  return frame
}

export const GridItem = (options: GridItemOptions) => {
  const frame = $(options)

  frame.SetPoint('TOPLEFT', options.x, options.y)
  frame.SetSize(options.width, options.height)

  options.item.SetParent(frame)
  options.item.SetPoint('CENTER')

  return frame
}
