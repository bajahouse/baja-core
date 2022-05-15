import { $, SmartFrame, FrameOptions } from '../lib'

export interface ListItemOptions extends FrameOptions {
  id: string,
  width: number
  height: number
  y: number
  child: SmartFrame
}

export interface ListItemFrame extends SmartFrame {
  Reflow: (newY?: number) => void
  Id: string | null
}

export const ListItem = (options: ListItemOptions): ListItemFrame => {
  const frame = $({ parent: options.parent }).ToAdvancedFrame<ListItemFrame>()
  let y = options.y || 0
  frame.SetSize(options.width, options.height)
  options.child.SetAllPoints(frame)
  frame.Id = options.id
  frame.Reflow = (newY?: number) => {
    y = newY || y
    frame.SetPoint('TOPLEFT', 0, y)
  }

  frame.Reflow()
  options.child.SetParent(frame)
  return frame
}

export interface ListOptions extends FrameOptions {
  itemHeight: number
}

export interface ListState {
  items: ListItemFrame[]
  map: { [key: string]: number }
  y: number
}

export interface ListFrame extends SmartFrame {
  Attach: (id: string, element: SmartFrame) => void
  Detach: (id: string) => void
  Reflow: () => void
}

export const List = (options: ListOptions): ListFrame => {
  const list = $(options).ToAdvancedFrame<ListFrame>()

  // FIXME: Inner
  list.SetAllPoints((options.parent as any).Inner())

  const state: ListState = {
    items: [],
    map: {},
    y: 0,
  }

  list.Reflow = () => {
    state.y = 0
    state.map = {}

    state.items.forEach((item, index) => {
      state.map[item.UID] = index
      item.Reflow(state.y)
      state.y = state.y - options.itemHeight
    })
  }

  list.Attach = (id: string, child: SmartFrame) => {
    const item = ListItem({
      id,
      child,
      width: list.GetWidth(),
      height: options.itemHeight,
      y: state.y,
      parent: list,
    })

    state.y = state.y - options.itemHeight
    state.items.push(item)
    state.map[id] = state.items.length - 1
    item.Show()
  }

  list.Detach = (id: string) => {
    let item: any

    state.items = state.items.filter(i => {
      const isMatch = i.Id === id
      if (isMatch)
        item = i
      return !isMatch
    })

    if (item) {
      item.Id = null
      item.Hide()
      list.Reflow()
    }
  }

  return list
}

