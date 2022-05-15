export function ConvertHex (hex: string) {
  let c = hex as any
  return [0, 0, 0]
  // if (/^#([a-f0-9]{3}){1,2}$/.test(c)) {
  //  if (c.length === 4){
  //    c = '#' + [c[1], c[1], c[2], c[2], c[3], c[3]].join('')
  //  }
  //  c = '0x' + c.substring(1)
  //  return ConvertRGB([
  //    0,// (Number(c) >> 16) & 255,
  //    0,// (Number(c) >> 8) & 255,
  //    0,// Number(c) & 255,
  //  ])
  // }
  // throw `Cannot convert hex value '${hex}' to RGB`
}

export function ConvertRGB (normal: RGB) {
  return [
    normal[0] / 255,
    normal[1] / 255,
    normal[2] / 255,
  ]
}

export const DEFAULT_BACKDROP = {
  insets: { top: 4, right: 4, bottom: 4, left: 4 },
  tile: true,
  tileSize: 16,
  edgeSize: 16,
  bgFile: 'Interface/Tooltips/UI-Tooltip-Background',
  edgeFile: '',
}

export function Random (min: number = 1000000, max: number = 8999999) {
  return Math.floor(Math.random() * max) + min
}

export abstract class Addon {
  constructor () {
    if (_G[FRAME_LIST_SELECTOR] === null)
      _G[FRAME_LIST_SELECTOR] = []
    if (_G[FRAME_MAP_SELECTOR] === null)
      _G[FRAME_MAP_SELECTOR] = []
    this.init()
  }

  protected abstract init (): void
}

export type RGB = [number, number, number]

export type BackdropPreset = 'tooltip' | 'tutorial' | 'border' | 'noborder' | 'dialogue'

export interface FrameOptions {
  mod?: string
  uid?: string
  type?: WoWAPI.FrameType | 'CheckButton'
  parent?: SmartFrame
  template?: string
  level?: number
  strata?: WoWAPI.FrameStrata
  hidden?: boolean
  scale?: number
  backdrop?: BackdropPreset | WoWAPI.Backdrop
  alpha?: number
  color?: RGB | string
  width?: number
  height?: number
  point?: WoWAPI.Point
  mouse?: boolean
  mousewheel?: boolean
  keyboard?: boolean
  movable?: boolean
}

// FIXME: build other frame options
export interface ScrollFrameOptions extends FrameOptions { type: 'ScrollFrame' }
export interface ButtonOptions extends FrameOptions { type: 'Button' }
export interface ModelOptions extends FrameOptions { type: 'Model' }
export interface SliderOptions extends FrameOptions { type: 'Slider' }
export interface StatusBarOptions extends FrameOptions { type: 'StatusBar' }
export interface SimpleHTMLOptions extends FrameOptions { type: 'SimpleHTML' }
export interface ColorSelectOptions extends FrameOptions { type: 'ColorSelect' }
export interface CheckButtonOptions extends FrameOptions { type: 'CheckButton' }

export interface FrameProps {
  // props
  UID: string
  Mod: string
  Index: number
  Inner: <F extends WoWAPI.UIObject = SmartFrame>(newInner?: F) => SmartFrame
  // delete
  IsDeleted: boolean
  Delete: () => void
  // type cast
  ToUIObject: () => WoWAPI.UIObject
  ToSmartFrame: () => SmartFrame,
  ToFrame: () => WoWAPI.Frame
  ToScrollFrame: () => WoWAPI.ScrollFrame
  ToChatFrame: () => WoWAPI.ChatFrame
  ToMessageFrame: () => WoWAPI.MessageFrame
  ToScrollingMessageFrame: () => WoWAPI.ScrollingMessageFrame
  ToModel: () => WoWAPI.Model
  ToSlider: () => WoWAPI.Slider
  ToStatusBar: () => WoWAPI.StatusBar
  ToSimpleHTML: () => WoWAPI.SimpleHTML
  ToColorSelect: () => WoWAPI.ColorSelect
  ToGameTooltip: () => WoWAPI.GameTooltip
  ToMinimap: () => WoWAPI.Minimap
  ToButton: () => WoWAPI.Button
  ToEditBox: () => WoWAPI.EditBox
  ToCheckButton: () => WoWAPI.CheckButton
  ToAdvancedFrame: <
    O extends object = object,
    F extends WoWAPI.UIObject = SmartFrame,
  >() => WoWAPI.AdvancedFrame<F, O>
}

export type Model = WoWAPI.AdvancedFrame<WoWAPI.Model, FrameProps>
export type Slider = WoWAPI.AdvancedFrame<WoWAPI.Slider, FrameProps>
export type StatusBar = WoWAPI.AdvancedFrame<WoWAPI.StatusBar, FrameProps>
export type SimpleHTML = WoWAPI.AdvancedFrame<WoWAPI.SimpleHTML, FrameProps>
export type ScrollFrame = WoWAPI.AdvancedFrame<WoWAPI.ScrollFrame, FrameProps>
export type Button = WoWAPI.AdvancedFrame<WoWAPI.Button, FrameProps>
export type CheckButton = WoWAPI.AdvancedFrame<WoWAPI.CheckButton, FrameProps>
export type SmartFrame = WoWAPI.AdvancedFrame<WoWAPI.Frame, FrameProps>

export const FRAME_LIST_SELECTOR = 'frame-list'
export const FRAME_MAP_SELECTOR = 'frame-map'

export function CleanFrame (f: WoWAPI.Frame) {
  f.SetAlpha(1)
  f.SetSize(0, 0)
  f.StopAnimating()
  f.StopMovingOrSizing()
  f.SetFrameLevel(0)
  f.SetFrameStrata('MEDIUM')
  f.Hide()
  f.SetParent(null)
  f.UnregisterAllEvents()
  f.SetID(0)
  f.ClearAllPoints()
  ;(f as SmartFrame).IsDeleted = true
}

export function GetFrameList (): SmartFrame[] {
  if (!_G[FRAME_LIST_SELECTOR])
    _G[FRAME_LIST_SELECTOR] = []
  return _G[FRAME_LIST_SELECTOR] as SmartFrame[]
}

export function GetFrameMap (): object {
  if (!_G[FRAME_MAP_SELECTOR])
    _G[FRAME_MAP_SELECTOR] = {}
  return _G[FRAME_MAP_SELECTOR] as object
}

export let current_frame_index = 0

export function $ (options?: CheckButtonOptions): CheckButton
export function $ (options?: ModelOptions): Model
export function $ (options?: SliderOptions): Slider
export function $ (options?: StatusBarOptions): StatusBar
export function $ (options?: SimpleHTMLOptions): SimpleHTML
export function $ (options?: ScrollFrameOptions): ScrollFrame
export function $ (options?: ButtonOptions): Button
export function $ (options?: FrameOptions): SmartFrame
export function $ (options: FrameOptions = {}) {
  let frame: SmartFrame
  let list: SmartFrame[] = _G[FRAME_LIST_SELECTOR]
  let map: object = _G[FRAME_MAP_SELECTOR]
  if (!list)
    _G[FRAME_LIST_SELECTOR] = list = []
  if (!map)
    _G[FRAME_MAP_SELECTOR] = map = []
  const mod = options.mod || 'global'
  const uid = options.uid || `${Random()}`
  if (!map[mod])
    map[mod] = {}
  if (options.uid) {
    const s: SmartFrame = map[mod][uid]
    if (s)
      if (s.IsDeleted) {
        frame = s
      } else {
        throw `Attempting to re-assign undeleted frame ${mod}::${uid}. Frame must be deleted before re-assigning.`
      }
  } else {
    for (let f of list) {
      if (f.IsDeleted)
        frame = f
    }
  }
  if (!frame) {
    frame = CreateFrame((options.type as WoWAPI.FrameType) || 'Frame', `${mod}::${uid}`, UIParent, options.template) as any
    frame.Index = current_frame_index++
    list.push(frame)
    if (options.uid)
      map[mod][options.uid] = frame
  }
  frame.IsDeleted = false
  frame.Delete = () => {
    CleanFrame(frame)
  }
  let inner: SmartFrame = frame
  frame.Inner = <F extends WoWAPI.UIObject = SmartFrame>(newInner?: F) => {
    if (newInner)
      inner = newInner as any
    return inner as SmartFrame
  }
  // FIXME: public  - frame.Reflow (calls frame.Draw on all children that have it)
  // FIXME: private - frame.Draw
  frame.UID = uid
  frame.Mod = mod
  if (options.hidden) {
    frame.Hide()
  } else {
    frame.Show()
  }
  if (options.mouse)
    frame.EnableMouse(true)
  if (options.mousewheel)
    frame.EnableMouseWheel(true)
  if (options.keyboard)
    frame.EnableKeyboard(true)
  if (options.movable)
    frame.SetMovable(true)
  if (options.backdrop)
    if (options.backdrop === 'border') {
      frame.SetBackdrop({
        edgeFile: 'Interface/Tooltips/UI-Tooltip-Border',
        tile: true,
        tileSize: 16,
        edgeSize: 16,
        insets: {
          left: 4,
          right: 4,
          top: 4,
          bottom: 4,
        },
      })
    } else if (options.backdrop === 'dialogue') {
      frame.SetBackdrop({
        edgeFile: 'Interface/DialogFrame/UI-DialogBox-Border',
        bgFile: 'Interface/Tooltips/UI-Tooltip-Background',
        tile: true,
        tileSize: 16,
        edgeSize: 16,
        insets: {
          left: 4,
          right: 4,
          top: 4,
          bottom: 4,
        },
      })
    } else if (options.backdrop === 'tooltip') {
      frame.SetBackdrop({
        edgeFile: 'Interface/Tooltips/UI-Tooltip-Border',
        bgFile: 'Interface/Tooltips/UI-Tooltip-Background',
        tile: true,
        tileSize: 16,
        edgeSize: 16,
        insets: {
          left: 4,
          right: 4,
          top: 4,
          bottom: 4,
        },
      })
    } else if (options.backdrop === 'noborder') {
      frame.SetBackdrop({
        bgFile: 'Interface/Tooltips/UI-Tooltip-Background',
        tile: true,
        tileSize: 16,
        edgeSize: 16,
        insets: {
          left: 4,
          right: 4,
          top: 4,
          bottom: 4,
        },
      })
    } else if (options.backdrop === 'tutorial') {
      frame.SetBackdrop({
        edgeFile: 'Interface/Tooltips/UI-Tooltip-Border',
        bgFile: 'Interface/TutorialFrame/TutorialFrameBackground',
        tile: true,
        tileSize: 16,
        edgeSize: 16,
        insets: {
          left: 4,
          right: 4,
          top: 4,
          bottom: 4,
        },
      })
    } else {
      frame.SetBackdrop(options.backdrop)
    }
  if (options.alpha)
    frame.SetAlpha(1)
  if (typeof options.color === 'object') {
    frame.SetBackdropColor(options.color[0], options.color[1], options.color[2], frame.GetAlpha())
  } else if (typeof options.color === 'string') {
    const [r, g, b] = ConvertHex(options.color)
    frame.SetBackdropColor(r, g, b, frame.GetAlpha())
  } else {
    frame.SetBackdropColor(0, 0, 0, frame.GetAlpha())
  }
  if (options.parent) {
    frame.SetParent(options.parent.Inner())
  } else {
    frame.SetParent(UIParent)
  }
  if (options.width)
    frame.SetWidth(options.width)
  if (options.height)
    frame.SetHeight(options.height)
  if (options.point)
    frame.SetPoint(options.point)
  frame.ToUIObject = () => frame as any as WoWAPI.UIObject
  frame.ToFrame = () => frame as WoWAPI.Frame
  frame.ToButton = () => frame as any as WoWAPI.Button
  frame.ToEditBox = () => frame as any as WoWAPI.EditBox
  frame.ToScrollFrame = () => frame as any as WoWAPI.ScrollFrame
  frame.ToScrollingMessageFrame = () => frame as any as WoWAPI.ScrollingMessageFrame
  frame.ToMessageFrame = () => frame as any as WoWAPI.MessageFrame
  frame.ToChatFrame = () => frame as any as WoWAPI.ChatFrame
  frame.ToModel = () => frame as any as WoWAPI.Model
  frame.ToSlider = () => frame as any as WoWAPI.Slider
  frame.ToSimpleHTML = () => frame as any as WoWAPI.SimpleHTML
  frame.ToColorSelect = () => frame as any as WoWAPI.ColorSelect
  frame.ToGameTooltip = () => frame as any as WoWAPI.GameTooltip
  frame.ToMinimap = () => frame as any as WoWAPI.Minimap
  frame.ToAdvancedFrame = <
    O extends object = object,
    F extends WoWAPI.UIObject = SmartFrame,
  >() => frame as any as WoWAPI.AdvancedFrame<F, O>
  if (options.level) {
    frame.SetFrameLevel(options.level)
  } else {
    frame.SetFrameLevel(0)
  }
  if (options.strata) {
    frame.SetFrameStrata(options.strata)
  } else {
    const parent = frame.GetParent() as any as WoWAPI.Frame
    if (parent && parent.GetFrameStrata) {
      frame.SetFrameStrata(parent.GetFrameStrata())
    } else {
      frame.SetFrameStrata('MEDIUM')
    }
  }
  if (options.scale)
    frame.SetScale(options.scale)
  return frame
}

