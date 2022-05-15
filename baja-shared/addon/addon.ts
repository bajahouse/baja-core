import { Grid } from './export/frames/grid'
import { Scroll } from './export/frames/scroll'
import { Button } from './export/frames/Button'
import { $ } from './export/lib'

const picker = $({
  width: 300,
  height: 300,
  backdrop: 'tooltip',
  point: 'CENTER',
})

const scroll = Scroll({
  parent: picker,
  point: 'CENTER',
  width: 260,
  height: 260,
  scrollHeight: 500,
})

const grid = Grid({
  parent: scroll,
  itemsPerRow: 3,
  rowHeight: 50,
})

const test = Button({
  parent: scroll,
  width: 50,
  height: 50,
  text: '',
  color: [1, 0, 0],
  onClick: e => e.Delete(),
})

grid.Attach(test)

// FIXME
// pctWidth: number
// pctHeight: number
// widthFn: parent => number
// heightFn: parent => number
// position: 'ALL', WoWAPI.Point | { self: 'BOTTOMLEFT', parent: 'TOPLEFT', x: 0, y: 0 }
// z: [strata, level]
// reflow: z, sizing, scaling, isDeleted (recursively reflow all children)
// delete -> reflow(isDeleted)