
import { Grid } from './lib/frames/grid'
import { Scroll } from './lib/frames/scroll'
import { $, Addon } from './lib/lib'

Addon('spell-picker', () => {
  const picker = $({
    uid: 'spell-picker',
    width: 500,
    height: 500,
    backdrop: 'tooltip',
  })

  const scroll = Scroll({
    scrollHeight: 1500,
    pctWidth: 90,
    pctHeight: 90,
    parent: picker,
  })

  const grid = Grid({
    itemsPerRow: 4,
    rowHeight: 100,
    parent: scroll,
  })
})

