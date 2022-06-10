import { DBC, std } from 'wow/wotlk'

import { SPELLS } from './data'

SPELLS.filter(s => s.cls === 'ROGUE').forEach(s => {

})

let spell_skill_id = 9000

SPELLS.forEach(spell => {
  spell.list.forEach(id => {
    const template = std.Spells.load(id)  
    template.Tags.add('spell-skills', spell.id)
  })
  for (let i = 1; i <= 10; i++) {
    const tag = spell.id + '_SKILL'
    const id = spell.id + '_SKILL' + '_' + i
    const dummy = std.Spells.create('spell-skills', id, 7529)
    dummy.Stacks.set(255)
    dummy.Effects.clearAll()
    dummy.Effects.addGet().Type.APPLY_AURA.set().Aura.DUMMY.set()
    const name = `+${i} ${spell.english} Skill`
    dummy.Tags.add('spell-skills', tag)
    dummy.Name.enGB.set(name)
    dummy.Description.enGB.set('')
    const ench = std.DBC.SpellItemEnchantment.add(spell_skill_id++)
    ench.Name.enGB.set(name)
    ench.Effect.set([3, 0, 0])
    ench.EffectPointsMin.set([0, 0, 0])
    ench.EffectPointsMax.set([0, 0, 0])
    ench.Flags.set(0)
    ench.EffectArg.set([dummy.ID, 0, 0])
    ench.ItemVisual.set(0)
    if (spell.id === 'SINISTER_STRIKE')
      console.log(dummy.objectify())
  }
  std.Spells.load(spell.first).Tags.addUnique('spell-skills', spell.id + '_FIRST')
  std.Spells.load(spell.last).Tags.addUnique('spell-skills', spell.id + '_LAST')
})