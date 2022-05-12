import { Component, ComponentOptions, Frame, Element } from '../app'
import { List } from '../components/list'
import { BASE_BACKDROP } from '../constants'
import { Mapping } from '../types'

const AUTOHIDE_TIMER = 1

const DEFAULT_SELECTION = {
  id: '',
  text: '',
  value: null,
}

export interface DropdownItem {
  id: string
  text: string
  disabled?: boolean
  value?: string | number | boolean | null
  tooltip?: string
  item?: Element<DropdownOptions>
}

export type DropdownItemOptions = Omit<DropdownItem , 'item'>

export interface DropdownState {
  length: number
  items: Mapping<DropdownItem>
  selection: DropdownItem
}

export interface DropdownOptions extends ComponentOptions {
  width?: number
  items?: DropdownItemOptions[]
  isSelectableEmpty?: boolean
  isTriggerOnInit?: boolean,
  isTriggerOnReselect?: boolean,
  emptyText?: string
  defaultSelectionId?: string
  onSelect?: (item: DropdownItem) => void
}

export const Dropdown: Component<DropdownOptions, DropdownState> = options => {
  const { name } = options
  const items = {
    empty: {
      id: 'empty',
      text: options.emptyText || 'select',
      value: null,
    }
  }
  const autohide = {}
  let timer = 0

  const a: Element<DropdownState> = Frame(options) as any

  a.state = {
    length: 0,
    items: items,
    selection: { ...DEFAULT_SELECTION },
  }

  a.ref.SetWidth(options.width || 200)
  a.ref.SetHeight(30)
  a.ref.SetBackdrop({ ...BASE_BACKDROP, bgFile: 'Interface/Tooltips/UI-Tooltip-Background' })
  a.ref.SetBackdropColor(0, 0, 0, 1)

  autohide['a'] = false

  a.ref.HookScript('OnEnter', () => {
    autohide['a'] = true
    timer = 0
    a.ref.SetBackdropColor(0.21, 0.49, 1, 1)
  })

  a.ref.HookScript('OnLeave', () => {
    autohide['a'] = false
    timer = GetTime() + AUTOHIDE_TIMER
    a.ref.SetBackdropColor(0, 0, 0, 1)
  })

  // menu
  const p = Frame({ name: `${name}-menu-padding`, parent: a })
  p.ref.SetPoint('TOP', a.ref, 'BOTTOM', 0, 0)
  p.ref.SetSize(options.width || 200, 3)
  p.ref.SetBackdrop({ ...BASE_BACKDROP, bgFile: 'Interface/Tooltips/UI-Tooltip-Background', edgeFile: ''  })
  p.ref.SetBackdropColor(0, 0, 0, 1)

  const menu = Frame({ name: `${name}-menu`, parent: p })
  menu.ref.SetSize(options.width || 200, 0)
  menu.ref.SetPoint('TOP', p.ref, 'BOTTOM', 0, 0)
  menu.ref.SetBackdrop({ ...BASE_BACKDROP, bgFile: 'Interface/Tooltips/UI-Tooltip-Background' })
  menu.ref.SetBackdropColor(0, 0, 0, 1)

  p.ref.Hide()

  autohide['p'] = false
  autohide['menu'] = false

  p.ref.HookScript('OnEnter', () => {
    autohide['p'] = true
  })

  p.ref.HookScript('OnLeave', () => {
    autohide['p'] = false
    timer = GetTime() + AUTOHIDE_TIMER
  })

  menu.ref.HookScript('OnEnter', () => {
    autohide['menu'] = true
  })

  menu.ref.HookScript('OnLeave', () => {
    autohide['menu'] = false
    timer = GetTime() + AUTOHIDE_TIMER
  })

  // button
  const button = CreateFrame('Button', `${name}-button`, a.ref)

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
  a.ref.EnableMouse(true)
  a.ref.HookScript('OnMouseDown', () => {
    PlaySound(1115)
    if (p.ref.IsVisible()) {
      p.ref.Hide()
      button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Up')
      button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
      button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Down')
      button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Disabled')
    } else {
      p.ref.Show()
      button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Up')
      button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
      button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Down')
      button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Disabled')
    }
  })

  button.HookScript('OnClick', () => {
    PlaySound(1115)
    if (p.ref.IsVisible()) {
      p.ref.Hide()
      button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Up')
      button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
      button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Down')
      button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Disabled')
    } else {
      p.ref.Show()
      button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Up')
      button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
      button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Down')
      button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollUp-Disabled')
    }
  })

  // text
  const textName = `${a.ref.GetName()}-label`
  const text = a.ref.CreateFontString(
    textName,
    'OVERLAY',
    'GameTooltipText',
  )

  text.SetParent(a.ref)
  text.SetPoint('LEFT', 10, 0)
  text.SetFont('Fonts/FRIZQT__.TTF', 10)
  text.SetText(options.emptyText || 'select')

  // list
  const listwrap = Frame({ name: `${name}-menu-list-wrapper`, parent: menu })
  const list = List({ name: `${name}-menu-list`, itemHeight: 30, parent: listwrap })

  listwrap.ref.SetSize(options.width || 200, 0)
  list.ref.SetSize(options.width || 200, 0)

  autohide['list'] = false

  list.ref.HookScript('OnEnter', () => {
    autohide['list'] = true
    timer = 0
  })

  list.ref.HookScript('OnLeave', () => {
    autohide['list'] = false
    timer = GetTime() + AUTOHIDE_TIMER
  })

  // item
  const Item = (options: DropdownItemOptions) => {
    const w = Frame({ name: `${name}-${options.id}-wrapper` })
    const t = w.ref.CreateFontString(`${name}-${options.id}-wrapper-text`)

    t.SetParent(w.ref)
    t.SetPoint('LEFT', 30, 0)
    t.SetFont('Fonts/FRIZQT__.TTF', 10)
    t.SetText(options.text)

    if (options.disabled)
      t.SetTextColor(0.4, 0.4, 0.4, 1)

    const e: any = w.ref
    e.text = t

    w.ref.SetBackdropColor(0, 0, 0, 1)

    w.ref.EnableMouse(true)

    w.ref.HookScript('OnEnter', () => {
      autohide['item-' + options.id] = true
      if (!options.disabled) {
        timer = 0
        w.ref.SetBackdrop({ ...BASE_BACKDROP, bgFile: 'Interface/Tooltips/UI-Tooltip-Background', edgeFile: '' })
        w.ref.SetBackdropColor(0.21, 0.49, 1, 1)
        if (options.tooltip) {
          GameTooltip.ClearLines()
          GameTooltip.SetOwner(UIParent, 'ANCHOR_CURSOR')
          GameTooltip.SetText(options.tooltip)
          GameTooltip.Show()
        }
      }
    })

    w.ref.HookScript('OnLeave', () => {
      timer = GetTime() + AUTOHIDE_TIMER
      autohide['item-' + options.id] = false
      if (!options.disabled) {
        w.ref.SetBackdrop({ bgFile: '', insets: { left:0, right:0, top:0, bottom:0 } })
        w.ref.SetBackdropColor(0, 0, 0, 1)
        if (options.tooltip) {
          GameTooltip.ClearLines()
          GameTooltip.Hide()
        }
      }
    })

    w.ref.HookScript('OnMouseUp', () => {
      if (!options.disabled) {
        p.ref.Hide()
        button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Up')
        button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
        button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Down')
        button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Disabled')
        Select(options.id)
      }
    })
    w.ref.HookScript('OnMouseDown', () => {
      if (!options.disabled) {
        p.ref.Hide()
        button.SetNormalTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Up')
        button.SetHighlightTexture('Interface\\Buttons\\UI-Common-MouseHilight')
        button.SetPushedTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Down')
        button.SetDisabledTexture('Interface\\ChatFrame\\UI-ChatIcon-ScrollDown-Disabled')
        Select(options.id)
      }
    })

    list.fns.Attach(options.id, w)

    a.state.length = list.state.items.length

    menu.ref.SetHeight((a.state.length * 30) + 14)
    listwrap.ref.SetHeight(a.state.length * 30)

    listwrap.ref.SetPoint('CENTER')

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

  a.ref.SetScript('OnUpdate', () => {
    if ((timer > 0) && (GetTime() >= timer)) {
      if (!IsMouseEnter())
        p.ref.Hide()
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

    if (a.state.selection.id === item.id) {
      if (options.isTriggerOnReselect && options.onSelect && isTrigger)
        options.onSelect(a.state.selection)
    } else {
      a.state.selection = { ...item }

      text.SetText(item.text)

      if (options.onSelect && isTrigger)
        options.onSelect(a.state.selection)
    }

    if (item.id !== 'empty') {
      checkmark.ref.Show()
      checkmark.ref.SetParent(item.item.ref)
      checkmark.ref.SetPoint('LEFT', 12, 0)
      for (const key of Object.keys(items))
        if (items[key].item)
          items[key].item.ref.text.SetPoint('LEFT', 30, 0)
    } else {
      for (const key of Object.keys(items))
        if (items[key].item)
          items[key].item.ref.text.SetPoint('LEFT', 12, 0)
      checkmark.ref.Hide()
    }

    texture.SetAllPoints()

    PlaySound(1115)
  }

  // checkmark
  const checkmark = Frame({ name: `${a.ref.GetName()}-checkmark`, parent: menu })
  checkmark.ref.SetSize(12, 12)
  checkmark.ref.Hide()

  const texture = checkmark.ref.CreateTexture()
  texture.SetTexture('Interface/BUTTONS/UI-CheckBox-Check.blp')

  // empty
  if (options.isSelectableEmpty)
    Item(items['empty'])

  // create items
  if (options.items)
    options.items.forEach(options => Item(options))

  // default selection
  Select(options.defaultSelectionId || 'empty', options.isTriggerOnInit || false)

  return a
}

