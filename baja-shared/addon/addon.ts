import { Panel } from './export/frames/Panel'
import { $ } from './export/lib'

Panel({
  point: 'CENTER',
  width: 100,
  title: 'Spell Picker',
})


// FIXME
// pctWidth: number
// pctHeight: number
// position: 'ALL', WoWAPI.Point | { self: 'BOTTOMLEFT', parent: 'TOPLEFT', x: 0, y: 0 }
// z: [strata, level] (recursive reflow to all children)
// reflow -> z, sizing, scaling, isDeleted
// delete -> reflow