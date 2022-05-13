import { $ } from './export/lib'

const a = $()
const b = $({
  width: 500,
  height: 500,
  point: 'CENTER',
  backdrop: 'tooltip',
  color: '#1b1d1e',
})

// FIXME
// pctWidth: number
// pctHeight: number
// position: 'ALL', WoWAPI.Point | { self: 'BOTTOMLEFT', parent: 'TOPLEFT', x: 0, y: 0 }
// z: [strata, level] (recursive reflow to all children)
// reflow -> z, sizing, scaling, isDeleted
// delete -> reflow