import { Scroll } from './export/frames/scroll'
import { Panel } from './export/frames/Panel'
import { $ } from './export/lib'

Scroll({
  point: 'CENTER',
  width: 100,
  height: 100,
  scrollHeight: 500,
  backdrop: 'tooltip',
})


// FIXME
// pctWidth: number
// pctHeight: number
// position: 'ALL', WoWAPI.Point | { self: 'BOTTOMLEFT', parent: 'TOPLEFT', x: 0, y: 0 }
// z: [strata, level] (recursive reflow to all children)
// reflow -> z, sizing, scaling, isDeleted
// delete -> reflow