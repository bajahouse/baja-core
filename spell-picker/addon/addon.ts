import { $, Addon, Movable, SlashCommand, SmartFrame } from './baja/lib'
import { Grid } from './baja/frames/grid'
import { Scroll } from './baja/frames/scroll'
import { Button } from './baja/frames/button'

Addon('spell-picker', () => {
  const frame = $({
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
    color: [1, 0, 0],
    height: 50,
    width: 50,
  })

  grid.Attach(spell)

  SlashCommand(
    'SPELLPICKER',
    ['/sp', '/spellpicker'],
    () => frame.ToggleShown(),
  )
})
