
import { $, Addon } from './lib/lib'
import { Grid } from './lib/frames/grid'


Addon('spell-picker', () => {
  const picker = $({
    uid: 'spell-picker',
    width: 500,
    height: 500,
    backdrop: 'tooltip',
  })
})

