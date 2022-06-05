// slash commands
export type SlashCmdHandler = (msg: string, frame: WoWAPI.Frame) => void
export function MakeSlashCommand (mod: string, cmdList: string[], handler: SlashCmdHandler) {
  for (let i = 0; i <= (cmdList.length - 1); i++) {
    const cmd = cmdList[i]
    _G['SlashCmdList'][mod] = handler
    _G[`SLASH_${mod}${i + 1}`] = `${cmd}`
  }
}

// store
const ACCOUNT = 'ACCOUNT'
const CHARACTER = 'CHARACTER'

export type StoreType = typeof ACCOUNT | typeof CHARACTER
export type StoreValue = string | number | boolean | null

export class Store {
  public IsLoaded = false

  protected state: any = {
    [ACCOUNT]: {},
    [CHARACTER]: {},
  }

  constructor (onInit: () => void) {
    onInit()
    // const app = Get()

    // Events.ChatInfo.OnChatMsgAddon(UIParent, (prefix, text) => {
    //   if (prefix !== 'store-get')
    //     return
    //   if (!text)
    //     return

    //   const [primitive, type, storeKey, ...storeValue] = text.split(' ')

    //   const n = Number(primitive)
    //   this.state[(type === '1') ? ACCOUNT : CHARACTER][storeKey] = (n === 0)
    //     ? Number(storeValue[0])
    //     : (n === 2)
    //     ? ((storeValue[0] === '1') ? true : false)
    //     : (n === 3)
    //     ? null
    //     : storeValue.join(' ')
    // })

    // Events.ChatInfo.OnChatMsgAddon(UIParent, prefix => {
    //   if (prefix !== 'store-init-success')
    //     return

    //   this.IsLoaded = true

    //   onInit()
    // })

    // SendAddonMessage('store-init', ' ', 'WHISPER', app.player.name)
  }

  public Set (storeType: StoreType, storeKey: string, storeValue: StoreValue) {
    const app = Info()
    const primitive = typeof storeValue === 'number'
      ? 0 // number
      : typeof storeValue === 'string'
      ? 1 // string
      : typeof storeValue === 'boolean'
      ? 2 // boolean
      : 3 // null
    this.state[storeType][storeKey] = storeValue
    const t = (storeType === 'ACCOUNT') ? 1 : 0
    const v = (primitive === 2)
      ? (storeValue ? '1' : '0')
      : storeValue
    SendAddonMessage('store-set', `${primitive} ${t} ${storeKey} ${v}`, 'WHISPER', app.player.name)
  }

  public Get (type: StoreType, storeKey: string, defaultValue?: StoreValue) {
    let value = this.state[type][storeKey]

    if (!value && defaultValue) {
      this.Set(type, storeKey, defaultValue)
      value = defaultValue
    }

    return value
  }
}

// app
export type CharacterInfoRace =
  | 'HUMAN'
  | 'DWARF'
  | 'NIGHTELF'
  | 'ORC'
  | 'UNDEAD'
  | 'BLOODELF'
  | 'GNOME'
  | 'TAUREN'
  | 'DRAENEI'
  | 'TROLL'

  export type CharacterInfoClass =
  | 'WARRIOR'
  | 'ROGUE'
  | 'MAGE'
  | 'PRIEST'
  | 'SHAMAN'
  | 'PALADIN'
  | 'DRUID'
  | 'WARLOCK'
  | 'HUNTER'

export interface PlayerInfo {
  name: string
  chrRace: CharacterInfoRace
  chrClass: CharacterInfoClass
  level: number
}

export function GetPlayerInfo (): PlayerInfo {
  const info = GetPlayerInfoByGUID(UnitGUID('player'))
  if (info && info[0])
    return {
      name: info[5].toLowerCase(),
      chrRace: info[2].toUpperCase() as CharacterInfoRace,
      chrClass: info[0].toUpperCase() as CharacterInfoClass,
      level: UnitLevel('player'),
    }
}

export type AddonFn = () => SmartFrame | void
export type AddonDefinition = [string, AddonFn]

export function Addon (name: string, fn: AddonFn) {
  if (!_G['__app__'])
    _G['__app__'] = new App()
  const container = _G['__app__'] as App
  container.add([name, fn])
}

export function Info () {
  return _G['__app__'] as App
}

export interface TimerObject {
  expiry: number
  fn: () => void
}

export interface IntervalObject {
  interval: number
  next: number
  fn: () => void
}

export function Timer (seconds: number, fn: () => void) {
  const info = Info()
  info.timers.push({
    expiry: GetTime() + seconds,
    fn,
  })
}

export function Interval (seconds: number, fn: () => void) {
  const info = Info()
  info.intervals.push({
    interval: seconds,
    next: GetTime() + seconds,
    fn,
  })
}

export class App {
  protected isStarted: boolean = false
  protected queue: (AddonDefinition)[] = []

  public player: PlayerInfo
  public store: Store
  public addons: { [key: string]: SmartFrame | void } = {}
  public timers: TimerObject[] = []
  public intervals: IntervalObject[] = []

  constructor () {
    UIParent.SetScript('OnUpdate', () => {
      if (!this.isStarted) {
        this.start()
      } else {
        UIParent.SetScript('OnUpdate', () => {
          this.timers.forEach((t, i) => {
            if (GetTime() >= t.expiry) {
              t.fn()
              this.timers.splice(i, 1)
            }
          })

          this.intervals.forEach((o, i) => {
            const time = GetTime()
            if (time >= o.next) {
              o.fn()
              o.next = time + o.interval
            }
          })
        })
      }
    })

    UIParent.RegisterEvent('PLAYER_LEVEL_UP')
    UIParent.SetScript('OnEvent', (_, event) => {
      if (event === 'PLAYER_LEVEL_UP')
        Timer(0.1, () => this.player = GetPlayerInfo())
    })
  }

  public add (creator: AddonDefinition) {
    if (!this.isStarted) {
      this.queue.push(creator)
    } else {
      this._add(creator)
    }
  }

  protected _add ([name, creator]: AddonDefinition) {
    this.addons[name] = creator()
  }

  protected start () {
    if (this.player)
      return

    if (UnitGUID('player')) {
      const info = GetPlayerInfo()

      if (info) {
        _G['__app__'] = this

        this.player = info
        this.isStarted = true
        this.store = new Store(
          () => this.queue.forEach(creator => this._add(creator))
        )
      }
    }
  }
}

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

export type PersistenceTarget = 'client' | 'server'

export function Movable (frame: SmartFrame, button: WoWAPI.MouseButton, ersist?: PersistenceTarget) {
  frame.EnableMouse(true)
  frame.SetMovable(true)
  frame.RegisterForDrag(button)
  frame.SetScript('OnDragStart', f => f.StartMoving())
  frame.SetScript('OnDragStop', f => f.StopMovingOrSizing())
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

export type RGB = [number, number, number]

export type BackdropPreset = 'tooltip' | 'tutorial' | 'border' | 'noborder' | 'dialogue'

export interface FrameOptions {
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
  pctWidth?: number
  pctHeight?: number
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
  Index: number
  Inner: <F extends WoWAPI.Frame = SmartFrame>(newInner?: F) => F
  Parent: <F extends WoWAPI.Frame = SmartFrame>(newParent?: F) => F
  // delete
  IsDeleted: boolean
  Delete: () => void
  // helpers
  ToggleShown: () => void
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
  ToExtendedFrame: <F extends WoWAPI.UIObject = SmartFrame>() => F
}

export type Model = WoWAPI.AdvancedFrame<WoWAPI.Model, FrameProps>
export type Slider = WoWAPI.AdvancedFrame<WoWAPI.Slider, FrameProps>
export type StatusBar = WoWAPI.AdvancedFrame<WoWAPI.StatusBar, FrameProps>
export type SimpleHTML = WoWAPI.AdvancedFrame<WoWAPI.SimpleHTML, FrameProps>
export type ScrollFrame = WoWAPI.AdvancedFrame<WoWAPI.ScrollFrame, FrameProps>
export type Button = WoWAPI.AdvancedFrame<WoWAPI.Button, FrameProps>
export type CheckButton = WoWAPI.AdvancedFrame<WoWAPI.CheckButton, FrameProps>
export type SmartFrame = WoWAPI.AdvancedFrame<WoWAPI.Frame, FrameProps>

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

const FRAME_LIST_SELECTOR = 'frame-list'
const FRAME_MAP_SELECTOR = 'frame-map'

let current_frame_index = 0

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
    _G[FRAME_MAP_SELECTOR] = map = {}
  const uid = options.uid || `${Random()}`
  if (options.uid) {
    const s: SmartFrame = map[uid]
    if (s)
      if (s.IsDeleted) {
        frame = s
      } else {
        throw `Attempting to re-assign undeleted frame ${uid}. Frame must be deleted before re-assigning.`
      }
  } else {
    for (let f of list) {
      if (f.IsDeleted)
        frame = f
    }
  }
  if (!frame) {
    frame = CreateFrame((options.type as WoWAPI.FrameType) || 'Frame', `${uid}`, UIParent, options.template) as any
    frame.Index = current_frame_index++
    list.push(frame)
    if (options.uid)
      map[options.uid] = frame
  }
  frame.IsDeleted = false
  frame.Delete = () => {
    CleanFrame(frame)
  }
  let inner: any = frame
  frame.Inner = <F extends WoWAPI.UIObject = SmartFrame>(newInner?: F) => {
    if (newInner)
      inner = newInner
    return inner as F
  }
  // FIXME: public  - frame.Reflow (calls frame.Draw on all children that have it)
  // FIXME: private - frame.Draw
  frame.ToggleShown = () => {
    if (frame.IsShown()) {
      frame.Hide()
    } else {
      frame.Show()
    }
  }
  frame.UID = uid
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
    if (options.parent.Inner) {
      frame.SetParent(options.parent.Inner())
    } else {
      frame.SetParent(options.parent)
    }
  } else {
    frame.SetParent(UIParent)
  }
  frame.Parent = <T>(newParent) => {
    if (newParent) {
      frame.SetParent(newParent)
      return newParent
    }
    return frame.GetParent() as any as T
  }
  const parent = frame.Parent()
  if (options.pctWidth && parent.GetWidth)
    frame.SetWidth(parent.GetWidth() * options.pctWidth)
  if (options.pctHeight && parent.GetHeight)
    frame.SetHeight(parent.GetHeight() * options.pctHeight)
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
  frame.ToExtendedFrame = <
    F extends WoWAPI.UIObject = SmartFrame
  >() => frame as any as F
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

if (!_G['__app__'])
  _G['__app__'] = new App()

// TODO:
// - [ ] reimplement store
// - [ ] pass addon name to all child frames (prefix in map)
// - [ ] position: 'ALL', WoWAPI.Point | { self: 'BOTTOMLEFT', parent: 'TOPLEFT', x: 0, y: 0 }
// - [ ] z: [strata, level]
// - [ ] reflow: z, sizing, scaling, isDeleted (recursively reflow all children)
// - [ ] grid reflow
// - [ ] delete -> reflow(isDeleted)
