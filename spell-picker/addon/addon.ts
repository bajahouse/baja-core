import { $, Addon } from './lib/lib'
import { Grid } from './lib/frames/grid'
import { Scroll } from './lib/frames/scroll'

Addon('spell-picker', () => {
  $({
    width: 500,
    height: 500,
    backdrop: 'tutorial',
  })
})


const frame = CreateFrame('Frame')
frame.SetSize(500, 500)
frame.SetBackdrop({
  insets: { top: 4, right: 4, bottom: 4, left: 4 },
  tile: true,
  tileSize: 16,
  edgeSize: 16,
  bgFile: 'Interface/Tooltips/UI-Tooltip-Background',
  edgeFile: '',
})
frame.SetParent(UIParent)
frame.SetPoint('CENTER')

// Addon('spell-picker', () => {
//   const picker = $({
//     uid: 'spell-picker',
//     width: 500,
//     height: 500,
//     backdrop: 'tooltip',
//   })

//   const scroll = Scroll({
//     scrollHeight: 1500,
//     width: 450,
//     height: 450,
//     parent: picker,
//   })

//   const grid = Grid({
//     itemsPerRow: 4,
//     rowHeight: 100,
//     parent: scroll,
//   })
// })

