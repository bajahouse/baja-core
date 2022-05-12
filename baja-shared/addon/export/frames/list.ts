import { Mapping } from '../types'
import { Frame, Component, ComponentOptions, Element } from '../app'

export interface ListItemOptions extends ComponentOptions {
  id: string,
  width: number
  height: number
  y: number
  child: Element<any, any>
}

export interface ListItemState {
  id: string
}

export interface ListItemFns {
  Reflow: (newY?: number) => void
}
export const ListItem: Component<ListItemOptions, ListItemState, ListItemFns> = options => {
  const frame: Element<ListItemState, ListItemFns> = Frame({ name: `${options.id}-list-item`, parent: options.parent }) as any
  let y = options.y || 0
  frame.ref.SetSize(options.width, options.height)
  options.child.ref.SetAllPoints(frame.ref)
  frame.state = {
    id: options.id,
  }
  frame.fns = {
    Reflow: (newY?: number) => {
      y = newY || y
      frame.ref.SetPoint('TOPLEFT', 0, y)
    }
  }
  frame.fns.Reflow()
  options.child.ref.SetParent(frame.ref)
  return frame
}

export interface ListOptions extends ComponentOptions {
  itemHeight: number
}

export interface ListState {
  items: Element<ListItemState, ListItemFns>[]
  map: Mapping<number>
  y: number
}

export interface ListFns {
  Attach: (id: string, element: Element<any, any>) => void
  Detach: (id: string) => void
  Reflow: () => void
}

export const List: Component<ListOptions, ListState, ListFns> = options => {
  const list: Element<ListState, ListFns> = Frame({ ...options }) as any

  list.ref.SetAllPoints(options.parent.inner)

  list.state = {
    items: [],
    map: {},
    y: 0,
  }

  list.fns = {
    Reflow: () => {
      list.state.y = 0
      list.state.map = {}

      list.state.items.forEach((item, index) => {
        list.state.map[item.state.id] = index
        item.fns.Reflow(list.state.y)
        list.state.y = list.state.y - options.itemHeight
      })
    },

    Attach: (id: string, child: Element<any, any>) => {
      const item = ListItem({
        id,
        child,
        width: list.ref.GetWidth(),
        height: options.itemHeight,
        y: list.state.y,
        parent: list,
      })

      list.state.y = list.state.y - options.itemHeight
      list.state.items.push(item)
      list.state.map[id] = list.state.items.length - 1
      item.ref.Show()
    },

    Detach: (id: string) => {
      let item: any

      list.state.items = list.state.items.filter(i => {
        const isMatch = i.state.id === id
        if (isMatch)
          item = i
        return !isMatch
      })

      if (item) {
        item.state.id = null
        item.ref.Hide()
        list.fns.Reflow()
      }
    }
  }

  return list
}

