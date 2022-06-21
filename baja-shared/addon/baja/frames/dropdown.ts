// ============================================================================
//
// - Dropdown -
//
//   This file defines a custom dropdown component.
//
// ============================================================================

import { DEFAULT_BACKDROP } from '../lib'
import { Frame, EasyFrame, FrameOptions } from '../lib'
import { List } from './list'

const AUTOHIDE_TIMER = 1

const DEFAULT_SELECTION = {
  id: '',
  text: '',
  value: null,
}

export interface DropdownItem extends FrameOptions {
  id: string
  text: string
  disabled?: boolean
  value?: string | number | boolean | null
  tooltip?: string
  item?: EasyFrame
}

export type DropdownItemOptions = Omit<DropdownItem , 'item'>

export interface DropdownState {
  length: number
  items: { [key: string]: DropdownItem }
  selection: DropdownItem
}

export interface DropdownOptions extends FrameOptions {
  items?: DropdownItemOptions[]
  isSelectableEmpty?: boolean
  isTriggerOnInit?: boolean,
  isTriggerOnReselect?: boolean,
  emptyText?: string
  defaultSelectionId?: string
  onSelect?: (item: DropdownItem) => void
}

export const Dropdown = (options: DropdownOptions) => {
  const items = {
    empty: {
      id: 'empty',
      text: options.emptyText || 'select',
      value: null,
    }
  }
  const autohide = {}
  let timer = 0

  const a = Frame({
    backdrop: 'tooltip',
    ...options,
  })

  const state = {
    length: 0,
    items: items,
    selection: { ...DEFAULT_SELECTION },
  }

  a.SetWidth(options.width || 200)
  a.SetHeight(30)
  a.SetBackdropColor(0, 0, 0, 1)

  autohide['a'] = false

  a.HookScript('OnEnter', () => {
    autohide['a'] = true
    timer = 0
    a.SetBackdropColor(0.21, 0.49, 1, 1)
  })

  a.HookScript('OnLeave', () => {
    autohide['a'] = false
    timer = GetTime() + AUTOHIDE_TIMER
    a.SetBackdropColor(0, 0, 0, 1)
  })

  // menu
  const p = Frame({ parent: a, backdrop: 'tooltip' })
  p.SetPoint('TOP', a, 'BOTTOM', 0, 0)
  p.SetSize(options.width || 200, 3)
  p.SetBackdropColor(0, 0, 0, 1)

  const menu = Frame({ parent: p, backdrop: 'tooltip' })
  menu.SetSize(options.width || 200, 0)
  menu.SetPoint('TOP', p, 'BOTTOM', 0, 0)
  menu.SetBackdropColor(0, 0, 0, 1)

  p.Hide()

  autohide['p'] = false
  autohide['menu'] = false

  p.HookScript('OnEnter', () => {
    autohide['p'] = true
  })

  p.HookScript('OnLeave', () => {
    autohide['p'] = false
    timer = GetTime() + AUTOHIDE_TIMER
  })

  menu.HookScript('OnEnter', () => {
    autohide['menu'] = true
  })

  menu.HookScript('OnLeave', () => {
    autohide['menu'] = false
    timer = GetTime() + AUTOHIDE_TIMER
  })

  // button
  const button = CreateFrame('Button', `${a}-button`, a)

  button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Up')
  button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
  button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Down')
  button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Disabled')
  button.SetSize(20, 20)
  button.SetPoint('RIGHT', -5, 0)

  autohide['button'] = false

  button.HookScript('OnEnter', () => {
    autohide['button'] = true
    timer = 0
  })

  button.HookScript('OnLeave', () => {
    autohide['button'] = false
    timer = GetTime() + AUTOHIDE_TIMER
  })

  // toggle
  a.EnableMouse(true)
  a.HookScript('OnMouseDown', () => {
    PlaySound(1115)
    if (p.IsVisible()) {
      p.Hide()
      button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Up')
      button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
      button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Down')
      button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Disabled')
    } else {
      p.Show()
      button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Up')
      button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
      button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Down')
      button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Disabled')
    }
  })

  button.HookScript('OnClick', () => {
    PlaySound(1115)
    if (p.IsVisible()) {
      p.Hide()
      button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Up')
      button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
      button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Down')
      button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Disabled')
    } else {
      p.Show()
      button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Up')
      button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
      button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Down')
      button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Disabled')
    }
  })

  // text
  const text = a.CreateFontString(
    `${a.UID}-label`,
    'OVERLAY',
    'GameTooltipText',
  )

  text.SetParent(a)
  text.SetPoint('LEFT', 10, 0)
  text.SetFont('Fonts/FRIZQT__.TTF', 10)
  text.SetText(options.emptyText || 'select')

  // list
  const listwrap = Frame({ parent: menu })
  const list = List({ itemHeight: 30, parent: listwrap })

  listwrap.SetSize(options.width || 200, 0)
  list.SetSize(options.width || 200, 0)

  autohide['list'] = false

  list.HookScript('OnEnter', () => {
    autohide['list'] = true
    timer = 0
  })

  list.HookScript('OnLeave', () => {
    autohide['list'] = false
    timer = GetTime() + AUTOHIDE_TIMER
  })

  // item
  const Item = (options: DropdownItemOptions) => {
    const w = Frame()
    // FIXME: build ExtendedText frame
    const t = w.CreateFontString(`${options.id}-wrapper-text`)

    t.SetParent(w)
    t.SetPoint('LEFT', 30, 0)
    t.SetFont('Fonts/FRIZQT__.TTF', 10)
    t.SetText(options.text)

    if (options.disabled)
      t.SetTextColor(0.4, 0.4, 0.4, 1)

    const e: any = w
    e.text = t

    w.SetBackdropColor(0, 0, 0, 1)

    w.EnableMouse(true)

    w.HookScript('OnEnter', () => {
      autohide['item-' + options.id] = true
      if (!options.disabled) {
        timer = 0
        w.SetBackdrop(DEFAULT_BACKDROP)
        w.SetBackdropColor(0.21, 0.49, 1, 1)
        if (options.tooltip) {
          GameTooltip.ClearLines()
          GameTooltip.SetOwner(UIParent, 'ANCHOR_CURSOR')
          GameTooltip.SetText(options.tooltip)
          GameTooltip.Show()
        }
      }
    })

    w.HookScript('OnLeave', () => {
      timer = GetTime() + AUTOHIDE_TIMER
      autohide['item-' + options.id] = false
      if (!options.disabled) {
        w.SetBackdrop({ bgFile: '', insets: { left:0, right:0, top:0, bottom:0 } })
        w.SetBackdropColor(0, 0, 0, 1)
        if (options.tooltip) {
          GameTooltip.ClearLines()
          GameTooltip.Hide()
        }
      }
    })

    w.HookScript('OnMouseUp', () => {
      if (!options.disabled) {
        p.Hide()
        button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Up')
        button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
        button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Down')
        button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Disabled')
        Select(options.id)
      }
    })
    w.HookScript('OnMouseDown', () => {
      if (!options.disabled) {
        p.Hide()
        button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Up')
        button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
        button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Down')
        button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Disabled')
        Select(options.id)
      }
    })

    list.Attach(options.id, w)

    state.length = (list as any).state.items.length

    menu.SetHeight((state.length * 30) + 14)
    listwrap.SetHeight(state.length * 30)

    listwrap.SetPoint('CENTER')

    autohide[`item-${options.id}`] = false
    items[options.id] = {
      ...options,
      item: w,
    }
  }

  // autohide
  const IsMouseEnter = () => {
    let bool = false

    for (const key of Object.keys(autohide)) {
      const isMouseEnter: boolean = autohide[key]
      if (isMouseEnter) {
        bool = true
      }
    }

    return bool
  }

  a.SetScript('OnUpdate', () => {
    if ((timer > 0) && (GetTime() >= timer)) {
      if (!IsMouseEnter())
        p.Hide()
        button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Up')
        button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
        button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Down')
        button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Disabled')
    }
  })

  // select
  const Select = (id: string, isTrigger: boolean = true) => {
    let item = items[id]

    if (!item)
      item = items[options.defaultSelectionId] || items['empty']

    if (state.selection.id === item.id) {
      if (options.isTriggerOnReselect && options.onSelect && isTrigger)
        options.onSelect(state.selection)
    } else {
      state.selection = { ...item }

      text.SetText(item.text)

      if (options.onSelect && isTrigger)
        options.onSelect(state.selection)
    }

    if (item.id !== 'empty') {
      checkmark.Show()
      checkmark.SetParent(item.item)
      checkmark.SetPoint('LEFT', 12, 0)
      for (const key of Object.keys(items))
        if (items[key].item)
          items[key].item.text.SetPoint('LEFT', 30, 0)
    } else {
      for (const key of Object.keys(items))
        if (items[key].item)
          items[key].item.text.SetPoint('LEFT', 12, 0)
      checkmark.Hide()
    }

    texture.SetAllPoints()

    PlaySound(1115)
  }

  // checkmark
  const checkmark = Frame({ parent: menu })
  checkmark.SetSize(12, 12)
  checkmark.Hide()

  const texture = checkmark.CreateTexture()
  texture.SetTexture('Interface/BUTTONS/UI-CheckBox-Check.blp')

  // empty
  if (options.isSelectableEmpty)
    Item({ ...items['empty'] })

  // create items
  if (options.items)
    options.items.forEach(options => Item(options))

  // default selection
  Select(options.defaultSelectionId || 'empty', options.isTriggerOnInit || false)

  return a
}

