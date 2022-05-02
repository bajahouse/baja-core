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
    const a = Frame({
      mod: 'test',
      uid: 'frame-a',
      type: 'Frame',
      parent: UIParent,
    })
    a.SetWidth(500)
    a.SetHeight(500)
    a.SetPoint('CENTER')
    a.SetBackdrop({
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
    a.EnableMouse(true)
    a.SetScript('OnMouseDown', () => {
      const b = Frame({
        mod: 'test',
        type: 'Frame',
        parent: a,
        strata: 'HIGH',
        level: 999,
      })
      b.SetSize(50, 50)
      b.SetPoint('CENTER')
      b.SetBackdrop({
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

      b.EnableMouse(true)
      b.SetScript('OnMouseDown', () => {
        b.Delete()
      })
    })
  }
}

type BackdropPreset = 'tooltip' | 'tutorial' | 'border' | 'noborder'

interface FrameOptions {
  mod: string
  uid?: string
  type?: WoWAPI.FrameType
  parent?: WoWAPI.UIObject
  level?: number
  strata?: WoWAPI.FrameStrata
  hidden?: true

  // FIXME:
  backdrop?: BackdropPreset | WoWAPI.Backdrop
  alpha?: number
  color?: [number, number, number]
  width?: number
  height?: number
  point?: WoWAPI.Point
  mouse?: boolean
}

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
  ToButton: () => WoWAPI.Button
  ToEditBox: () => WoWAPI.EditBox
  ToAdvancedFrame: <
    O extends object = object,
    F extends WoWAPI.UIObject = ExtendedFrame,
  >() => WoWAPI.AdvancedFrame<F, O>
  ToChatFrame: () => WoWAPI.ChatFrame
  ToMessageFrame: () => WoWAPI.MessageFrame
  ToScrollingMessageFrame: () => WoWAPI.ScrollingMessageFrame
}

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
    _G[FRAME_MAP_SELECTOR] = []
  return _G[FRAME_MAP_SELECTOR] as object
}

let current_frame_index = 0

function Frame (options: FrameOptions) {
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
    frame = CreateFrame(options.type, options.mod) as any
    frame.Index = current_frame_index++
    list.push(frame)
    if (options.uid)
      map[options.mod][options.uid] = frame
  }
  frame.IsDeleted = false
  frame.Delete = () => CleanFrame(frame)
  frame.UID = options.uid || `unnamed-${frame.Index}`
  frame.Mod = options.mod
  if (options.hidden) {
    frame.Hide()
  } else {
    frame.Show()
  }
  frame.ToUIObject = () => frame as any as WoWAPI.UIObject
  frame.ToFrame = () => frame as WoWAPI.Frame
  frame.ToButton = () => frame as any as WoWAPI.Button
  frame.ToEditBox = () => frame as any as WoWAPI.EditBox
  frame.ToScrollFrame = () => frame as any as WoWAPI.ScrollFrame
  frame.ToScrollingMessageFrame = () => frame as any as WoWAPI.ScrollingMessageFrame
  frame.ToMessageFrame = () => frame as any as WoWAPI.MessageFrame
  frame.ToChatFrame = () => frame as any as WoWAPI.ChatFrame
  frame.ToAdvancedFrame = <
    O extends object = object,
    F extends WoWAPI.UIObject = ExtendedFrame,
  >() => frame as any as WoWAPI.AdvancedFrame<F, O>
  if (options.parent)
    frame.SetParent(options.parent)
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

