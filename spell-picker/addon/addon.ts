import { $, Addon, Movable, SlashCommand } from './baja/lib'
import { Grid } from './baja/frames/grid'
import { Scroll } from './baja/frames/scroll'
import { Button } from './baja/frames/button'

Addon('spell-picker', () => {
  const picker = $({
    uid: 'spell-picker',
    width: 350,
    height: 350,
    backdrop: 'tooltip',
    point: 'CENTER',
    hidden: true,
  })

  Movable(picker, 'RightButton')

  const scroll = Scroll({
    scrollHeight: 1500,
    pctWidth: 0.9,
    pctHeight: 0.9,
    parent: picker,
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
    () => picker.ToggleShown(),
  )
})
