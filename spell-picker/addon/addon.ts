import { Addon, Frame, Movable, MakeSlashCommand, SmartFrame, Info, Timer, FrameOptions } from './baja/lib'
import { Grid } from './baja/frames/grid'
import { Scroll } from './baja/frames/scroll'
import { Button } from './baja/frames/button'
import { SpellPickerData, SpellPickerOptionsMsg, SPELL_PICKER_INIT_ID, SPELL_PICKER_OPTIONS_ID } from '../shared/Messages'

interface SpellButtonProps extends FrameOptions {
  id: number
  list: SpellPickerData[]
  // isSelected?: boolean
  // isDisabled?: boolean
}

function SpellButton ({
  id,
  list,
  // isSelected = false,
  // isDisabled = false,
}: SpellButtonProps) {
  let maxForLevel: SpellPickerData = list[0]
  let isDisabled: boolean = true

  function update (level: number) {
    isDisabled = true
    maxForLevel = list[0]
    list.forEach((o, i, a) => {
      if ((o.level === 0) || (level >= o.level)) {
        maxForLevel = o
        isDisabled = false
      }
    })
    if (isDisabled) {
      SetDesaturation(texture, true)
    } else {
      SetDesaturation(texture, false)
    }
    button.SetScript('OnEnter', () => {
      texture.SetVertexColor(0.8, 0.8, 0.8, 1)
      GameTooltip.ClearLines()
      GameTooltip.SetOwner(UIParent, 'ANCHOR_CURSOR')
      GameTooltip.SetHyperlink(`spell:${maxForLevel.spell_id}`)
      GameTooltip.Show()
    })
    button.SetScript('OnLeave', () => {
      texture.SetVertexColor(1, 1, 1, 1)
      GameTooltip.Hide()
      GameTooltip.ClearLines()
    })
  }

  const info = GetSpellInfo(maxForLevel.spell_id)
  const button = Button({
    text: '',
    height: 50,
    width: 50,
  })
  const texture = button.CreateTexture()
  texture.SetParent(button)
  texture.SetAllPoints()
  texture.SetTexture(info[2])

  button.RegisterEvent('CHAT_MSG_ADDON')
  button.SetScript('OnEvent', (_, event, prefix: string, level: string) => {
    if (event === 'CHAT_MSG_ADDON' && (prefix === 'reload'))
      update(Number(level))
  })

  update(Info().player.level)

  return button
}

class SpellOption {
  constructor (
    public readonly id: number,
    public readonly list: SpellPickerData[],
    public readonly isSelected: boolean = false,
  ) {}
}

class SpellPicker {
  public frame: SmartFrame
  public options: SpellOption[] = []

  protected data: SpellPickerData[] = []

  constructor () {
    this.init()
  }

  protected init () {
    // do this when data is received
    OnCustomPacket(SPELL_PICKER_OPTIONS_ID, packet => {
      const msg = new SpellPickerOptionsMsg()
      this.data = msg.Read(packet)

      // put data in temp table
      const temp: { [key: number]: { id: number, list: SpellPickerData[] }} = {}
      this.data.forEach(d => {
        temp[d.first_spell_id] = temp[d.first_spell_id]
          ? temp[d.first_spell_id]
          : {
            list: [],
            id: d.first_spell_id,
          }
        temp[d.first_spell_id].list.push(d)
      })

      // build SpellOption list from temp table
      for (const key of Object.keys(temp))
        this.options.push(new SpellOption(temp[key].id, temp[key].list))

      // build frames
      this.render()
    })

    // reach out to server for data
    CreateCustomPacket(SPELL_PICKER_INIT_ID, 0).WriteInt32(0).Send()
  }

  protected render () {
    this.frame = Frame({
      width: 350,
      height: 350,
      backdrop: 'tooltip',
      point: 'CENTER',
      hidden: false,
    })

    Movable(this.frame, 'RightButton')

    const scroll = Scroll({
      scrollHeight: 1500,
      pctWidth: 0.9,
      pctHeight: 0.9,
      parent: this.frame,
    })

    const grid = Grid({
      itemsPerRow: 4,
      rowHeight: 75,
      parent: scroll,
    })

    this.options.forEach(option => {
      const button = SpellButton({
        id: option.id,
        list: option.list,
        parent: grid,
      })

      grid.Attach(button)
    })

    MakeSlashCommand(['/sp', '/spellpicker'], () => this.frame.ToggleShown())
  }
}

Addon('spell-picker', () => {
  const addon = new SpellPicker()
})
