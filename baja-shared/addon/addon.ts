abstract class Addon {
  constructor () {
    if (_G[FRAME_LIST_SELECTOR] === null)
      _G[FRAME_LIST_SELECTOR] = []
    if (_G[FRAME_MAP_SELECTOR] === null)
      _G[FRAME_MAP_SELECTOR] = []
    this.init()
  }

  protected abstract init (): void
}

class Foo extends Addon {
  init () {
    const a = $({
      color: [255, 0, 0],
      mod: 'test',
      uid: 'frame-a',
      type: 'Frame',
      parent: UIParent,
      backdrop: 'tooltip',
      point: 'CENTER',
      width: 500,
      height: 500,
      mouse: true,
    })
    a.SetScript('OnMouseDown', () => $({
        mod: 'test',
        type: 'Frame',
        parent: a,
        strata: 'HIGH',
        level: 999,
        width: 50,
        height: 50,
        point: 'CENTER',
        backdrop: 'tutorial',
        mouse: true,
      }).SetScript('OnMouseDown', (b: ExtendedFrame) => b.Delete())
    )
    const button = $({
      type: 'Button',
      mod: 'test',
      width: 80,
      height: 30,
      backdrop: 'dialogue',
      parent: a,
      point: 'TOPLEFT',
    })
    const text = button.CreateFontString('hello', 'OVERLAY', 'GameTooltipText')
    text.SetParent(button)
    text.SetPoint('TOPRIGHT', -10, -8)
    text.SetFont('Fonts/FRIZQT__.TTF', 10)
    button.SetFontString(text)
    button.SetText('hello world')
  }
}

type BackdropPreset = 'tooltip' | 'tutorial' | 'border' | 'noborder' | 'dialogue'

interface FrameOptions {
  mod: string
  uid?: string
  type?: WoWAPI.FrameType
  parent?: WoWAPI.UIObject
  level?: number
  strata?: WoWAPI.FrameStrata
  hidden?: boolean
  backdrop?: BackdropPreset | WoWAPI.Backdrop
  alpha?: number
  color?: [number, number, number]
  width?: number
  height?: number
  point?: WoWAPI.Point
  mouse?: boolean
  mousewheel?: boolean
  keyboard?: boolean
  movable?: boolean
}

// FIXME: build other api
interface ScrollFrameOptions extends FrameOptions { type: 'ScrollFrame' }
interface ButtonOptions extends FrameOptions { type: 'Button' }
interface ModelOptions extends FrameOptions { type: 'Model' }
interface SliderOptions extends FrameOptions { type: 'Slider' }
interface StatusBarOptions extends FrameOptions { type: 'StatusBar' }
interface SimpleHTMLOptions extends FrameOptions { type: 'SimpleHTML' }
interface ColorSelectOptions extends FrameOptions { type: 'ColorSelect' }

interface ExtendedFrameProps {
  // props
  UID: string
  Mod: string
  Index: number
  // delete
  IsDeleted: boolean
  Delete: () => void
  // type cast
  ToUIObject: () => WoWAPI.UIObject
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
  ToAdvancedFrame: <
    O extends object = object,
    F extends WoWAPI.UIObject = ExtendedFrame,
  >() => WoWAPI.AdvancedFrame<F, O>
}

type ExtendedModel = WoWAPI.AdvancedFrame<WoWAPI.Model, ExtendedFrameProps>
type ExtendedSlider = WoWAPI.AdvancedFrame<WoWAPI.Slider, ExtendedFrameProps>
type ExtendedStatusBar = WoWAPI.AdvancedFrame<WoWAPI.StatusBar, ExtendedFrameProps>
type ExtendedSimpleHTML = WoWAPI.AdvancedFrame<WoWAPI.SimpleHTML, ExtendedFrameProps>
type ExtendedScrollFrame = WoWAPI.AdvancedFrame<WoWAPI.ScrollFrame, ExtendedFrameProps>
type ExtendedButton = WoWAPI.AdvancedFrame<WoWAPI.Button, ExtendedFrameProps>
type ExtendedFrame = WoWAPI.AdvancedFrame<WoWAPI.Frame, ExtendedFrameProps>

const FRAME_LIST_SELECTOR = 'frame-list'
const FRAME_MAP_SELECTOR = 'frame-map'

function CleanFrame (f: WoWAPI.Frame) {
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
  ;(f as ExtendedFrame).IsDeleted = true
}

function GetFrameList (): ExtendedFrame[] {
  if (!_G[FRAME_LIST_SELECTOR])
    _G[FRAME_LIST_SELECTOR] = []
  return _G[FRAME_LIST_SELECTOR] as ExtendedFrame[]
}

function GetFrameMap (): object {
  if (!_G[FRAME_MAP_SELECTOR])
    _G[FRAME_MAP_SELECTOR] = {}
  return _G[FRAME_MAP_SELECTOR] as object
}

let current_frame_index = 0

function $ (options: ModelOptions): ExtendedModel
function $ (options: SliderOptions): ExtendedSlider
function $ (options: StatusBarOptions): ExtendedStatusBar
function $ (options: SimpleHTMLOptions): ExtendedSimpleHTML
function $ (options: ScrollFrameOptions): ExtendedScrollFrame
function $ (options: ButtonOptions): ExtendedButton
function $ (options: FrameOptions): ExtendedFrame
function $ (options: FrameOptions) {
  let frame: ExtendedFrame
  let list: ExtendedFrame[] = _G[FRAME_LIST_SELECTOR]
  let map: object = _G[FRAME_MAP_SELECTOR]
  if (!list)
    _G[FRAME_LIST_SELECTOR] = list = []
  if (!map)
    _G[FRAME_MAP_SELECTOR] = map = []
  if (!map[options.mod])
    map[options.mod] = {}
  if (options.uid) {
    const s: ExtendedFrame = map[options.mod][options.uid]
    if (s)
      if (s.IsDeleted) {
        frame = s
      } else {
        throw `Attempting to re-assign undeleted frame ${options.mod}::${options.uid}. Frame must be deleted before re-assigning.`
      }
  } else {
    for (let f of list) {
      if (f.IsDeleted)
        frame = f
    }
  }
  if (!frame) {
    frame = CreateFrame(options.type || 'Frame', options.mod) as any
    frame.Index = current_frame_index++
    list.push(frame)
    if (options.uid)
      map[options.mod][options.uid] = frame
  }
  frame.IsDeleted = false
  frame.Delete = () => {
    CleanFrame(frame)
  }
  frame.UID = options.uid || `unnamed-${frame.Index}`
  frame.Mod = options.mod
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
  if (options.color)
    frame.SetBackdropColor(options.color[0], options.color[1], options.color[2], frame.GetAlpha())
  if (options.parent)
    frame.SetParent(options.parent)
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
    F extends WoWAPI.UIObject = ExtendedFrame,
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
  return frame
}

const foo = new Foo()

