import { $, Addon } from './export/lib'

Addon('hello-world', app => {
  const example = $({
    height: 300,
    width: 400,
    point: 'CENTER',
    backdrop: 'tooltip',
  })

  console.log(example.GetName())
})

// TODO:
// - [ ] pass addon name to all child frames
// - [ ] position: 'ALL', WoWAPI.Point | { self: 'BOTTOMLEFT', parent: 'TOPLEFT', x: 0, y: 0 }
// - [ ] z: [strata, level]
// - [ ] reflow: z, sizing, scaling, isDeleted (recursively reflow all children)
// - [ ] grid reflow
// - [ ] delete -> reflow(isDeleted)