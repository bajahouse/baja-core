import { Addon, Frame, Movable, MakeSlashCommand } from './baja/lib'
import { Grid } from './baja/frames/grid'
import { Scroll } from './baja/frames/scroll'
import { Button } from './baja/frames/button'
import { SpellPickerOptionsMsg, SPELL_PICKER_OPTIONS_ID } from '../shared/Messages'

Addon('spell-picker', () => {
  OnCustomPacket(SPELL_PICKER_OPTIONS_ID, packet => {
    const msg = new SpellPickerOptionsMsg()
    msg.read(packet)
    msg.list.forEach(o => {
      console.log(`spell_id:${o.spell_id}`)
      console.log(`first_spell_id:${o.first_spell_id}`)
      console.log(`classmask:${o.classmask}`)
      console.log(`level:${o.level}`)
      console.log(`rank:${o.rank}`)
      console.log(`faction:${o.faction}`)
    })
  })

  const frame = Frame({
    width: 350,
    height: 350,
    backdrop: 'tooltip',
    point: 'CENTER',
    hidden: true,
  })

  Movable(frame, 'RightButton')

  const scroll = Scroll({
    scrollHeight: 1500,
    pctWidth: 0.9,
    pctHeight: 0.9,
    parent: frame,
  })

  const grid = Grid({
    itemsPerRow: 4,
    rowHeight: 100,
    parent: scroll,
  })

  const spell = Button({
    text: '',
    color: [0, 0, 1],
    height: 50,
    width: 50,
  })

  grid.Attach(spell)

  MakeSlashCommand(['/sp', '/spellpicker'], () => frame.ToggleShown())
})
