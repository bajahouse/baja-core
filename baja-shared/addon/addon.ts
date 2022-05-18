import { Grid } from './export/frames/grid'
import { Scroll } from './export/frames/scroll'
import { Button } from './export/frames/Button'
import { $, Movable } from './export/lib'

const picker = $({
  width: 300,
  height: 300,
  backdrop: 'tooltip',
  point: 'CENTER',
})

Movable(picker, 'RightButton')

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

grid.Attach(
  Button({
    parent: scroll,
    pctWidth: 1,
    point: 'TOPLEFT',
    text: 'test',
    color: [1, 0, 0],
    onClick: e => e.Delete(),
  })
)

// FIXME

// build Global container

// position: 'ALL', WoWAPI.Point | { self: 'BOTTOMLEFT', parent: 'TOPLEFT', x: 0, y: 0 }
// z: [strata, level]
// reflow: z, sizing, scaling, isDeleted (recursively reflow all children)
// grid reflow
// delete -> reflow(isDeleted)