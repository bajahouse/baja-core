import { $, Addon, Movable, SlashCommand } from './baja/lib'
import { Grid } from './baja/frames/grid'
import { Scroll } from './baja/frames/scroll'

Addon('spell-picker', () => {
  const picker = $({
    uid: 'spell-picker',
    width: 500,
    height: 500,
    backdrop: 'tooltip',
    point: 'CENTER',
    hidden: true,
  })

  Movable(picker, 'RightButton')

  const scroll = Scroll({
    scrollHeight: 1500,
    width: 450,
    height: 450,
    parent: picker,
  })

  const grid = Grid({
    itemsPerRow: 4,
    rowHeight: 100,
    parent: scroll,
  })

  const foo = $({
    backdrop: 'tooltip',
    color: [1, 0, 0],
    width: 50,
    height: 50,
  })

  grid.Attach(foo)

  SlashCommand(
    'SPELLPICKER',
    ['sp', 'spellpicker'],
    () => picker.ToggleShown(),
  )
})
