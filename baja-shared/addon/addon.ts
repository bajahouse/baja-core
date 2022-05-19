import { $, Addon } from './export/lib'

Addon('hello-world', app => {
  const frame = $()
  console.log(app.player.chrRace)
  const x = app.addons['hello-world']
  if (x)
    x.EnableMouse(true)
  return frame
})

// TODO:
// - [ ] position: 'ALL', WoWAPI.Point | { self: 'BOTTOMLEFT', parent: 'TOPLEFT', x: 0, y: 0 }
// - [ ] z: [strata, level]
// - [ ] reflow: z, sizing, scaling, isDeleted (recursively reflow all children)
// - [ ] grid reflow
// - [ ] delete -> reflow(isDeleted)