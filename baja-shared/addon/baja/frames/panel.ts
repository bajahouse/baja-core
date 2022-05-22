import { DropdownItemOptions, Dropdown } from './dropdown'
import { $, SmartFrame, FrameOptions } from '../lib'

let is_first_load = true

export interface PanelOptions extends FrameOptions {
  nav?: DropdownItemOptions[]
  frames?: ((options: FrameOptions) => SmartFrame)[]
  defaultSelectionId?: string
  isHiddenOnEmpty?: boolean
  title?: string
}

export const Panel = (options: PanelOptions) => {
  // const $ = Get()

  // title
  const title = $({
    backdrop: 'tooltip',
    width: 168,
    height: 30,
    point: 'CENTER',
    ...options,
  })

  const titleText = title.CreateFontString(
    'talent-countertext',
    'OVERLAY',
    'GameTooltipText',
  )
  titleText.SetParent(title)
  titleText.SetPoint('CENTER')
  titleText.SetFont('Fonts/FRIZQT__.TTF', 10)
  titleText.SetText(options.title)

  // panel
  const a = $({
    parent: title,
    backdrop: 'tooltip',
    width: 340,
    height: 410,
  })

  a.SetPoint('TOP', title, 'BOTTOMLEFT', -2, -3)

  // panel-inner
  const b = $({
    parent: a,
    width: 300 - 30,
    height: 400 - 30,
    point: 'CENTER',
  })

  title.Inner(b)

  // pages
  const pages: { [key: string]: SmartFrame } = {}
  const frames = options.frames

  //dropdown
  const dropdown = Dropdown({
    width: 168,
    // defaultSelectionId: $.store.Get('CHARACTER', `${options.name}-panel-selection`, ''),
    isTriggerOnInit: true,
    items: options.nav,
    onSelect: ({ id }) => {
      // $.store.Set('CHARACTER', `${options.name}-panel-selection`, id)

      for (let key of Object.keys(pages)) {
        const page = pages[key]
        page.Hide()
      }

      if (!pages[id] && frames[id]) {
        const page = frames[id]({ parent: b })

        pages[id] = page

        page.SetParent(title.Inner())
        page.SetPoint('CENTER')
      }

      if (pages[id])
        pages[id].Show()
    },
  })

  dropdown.SetParent(title)
  dropdown.SetPoint('RIGHT', title, 'LEFT', -4, -1)

  // frame level
  a.SetFrameStrata('LOW')
  dropdown.SetFrameStrata('HIGH')

  // toggle visibility
  const TogglePanel = () => {
    if (is_first_load)
      is_first_load = false

    if (dropdown.IsVisible()) {
      // $.store.Set('CHARACTER', `${options.name}-panel-visibility`, false)
      dropdown.Hide()
      a.Hide()
    } else {
      // $.store.Set('CHARACTER', `${options.name}-panel-visibility`, true)
      dropdown.Show()
      a.Show()
    }

    if (!is_first_load)
      PlaySound(828)
  }

  title.HookScript('OnEnter', () => title.SetBackdropColor(0.21, 0.49, 1, 1))
  title.HookScript('OnLeave', () => title.SetBackdropColor(0, 0, 0, 1))

  title.SetScript('OnMouseDown', (frame, type: WoWAPI.MouseButton) => {
    if (type === 'LeftButton')
      TogglePanel()
  })

  // if (!$.store.Get('CHARACTER', `${options.name}-panel-visibility`)) {
  //   dropdown.ref.Hide()
  //   a.ref.Hide()
  // }

  // make title movable
  // Movable(title)

  return title
}

