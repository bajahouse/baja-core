import { std } from 'wow/wotlk'
import { SpellItemEnchantmentRow } from 'wow/wotlk/dbc/SpellItemEnchantment'
import { Spell } from 'wow/wotlk/std/Spell/Spell'

import { SPELLS } from './data'

SPELLS.filter(s => s.cls === 'ROGUE').forEach(s => {

})

let enchant_id = 9000

function StackingEnchant (
  mod: string,
  id: string,
  name: string,
  tag: string,
  amount: number,
): [Spell, SpellItemEnchantmentRow] {
  const dummy = std.Spells.create(mod, id, 7464)
  const ench = std.DBC.SpellItemEnchantment.add(enchant_id++)
  dummy.Stacks.set(0)
  dummy.Power.setMana(0)
  dummy.Range.set(0)
  // dummy.Effects.addGet().Type.APPLY_AURA.set()
  dummy.Effects.clearAll()
  dummy.Effects.addGet().Type.APPLY_AURA.set().Aura.DUMMY.set()
  dummy.Power.setMana(amount)
  // dummy.Duration.set(0)
  dummy.CastTime.set(0)
  dummy.Name.enGB.set(name)
  dummy.Tags.add('spell-skills', tag)
  dummy.Description.enGB.set(name)
  dummy.Name.enGB.set(name)
  ench.Name.enGB.set(name)
  ench.Effect.set([3, 0, 0])
  ench.EffectPointsMin.set([0, 0, 0])
  ench.EffectPointsMax.set([0, 0, 0])
  ench.Flags.set(0)
  ench.EffectArg.set([dummy.ID, 0, 0])
  ench.ItemVisual.set(0)
  // test
  const item = std.Items.create('spell-skills', `DAGGER_${id}`, 2092)
  item.Spells.addGet().Spell.set(dummy.ID).Trigger.set(1)
  item.Name.enGB.set(`[TEST DAGGER] ${name}`)
  return [dummy, ench]
}

const CLASSES = [
  'Warrior',
  'Rogue',
  'Hunter',
  'Mage',
  'Priest',
  'Warlock',
  'Druid',
  'Shaman',
  'Paladin',
  'Death Knight',
]

const SCHOOLS = [
  'Fire',
  'Frost',
  'Nature',
  'Shadow',
  'Holy',
  'Arcane',
  'Physical',
]

const SPECIALIZATIONS = [
  'Arms',
  'Fury',
  'Protection',
  'Combat',
  'Subtlety',
  'Assassination',
  'Marksmanship',
  'Beast Mastery',
  'Survival',
  'Discipline',
  'Restoration',
  'Balance',
  'Feral',
  'Enhancement',
  'Elemental',
  'Affliction',
  'Demonology',
  'Destruction',
  'Retribution',
]

const MISC = [
  'All',
  'Magic',
  'Melee',
  'Ranged',
]

SPELLS.forEach(spell => {
  spell.list.forEach(id => {
    const template = std.Spells.load(id)  
    template.Tags.add('spell-skills', spell.id)
  })
  for (let i = 1; i <= 10; i++) {
    const tag = spell.id + '_SKILL'
    const id = tag + '_' + i
    const name = `+${i} ${spell.english} Skill`
    StackingEnchant('spell-skills', id, name, tag, i)
  }
  std.Spells.load(spell.first).Tags.addUnique('spell-skills', spell.id + '_FIRST')
  std.Spells.load(spell.last).Tags.addUnique('spell-skills', spell.id + '_LAST')
})

CLASSES.forEach(cls => {
  for (let i = 1; i <= 10; i++)
    StackingEnchant('spell-skills', cls + '_' + i, `+${i} ${cls} Skills`, `${cls}_SKILL`, i)
})

SCHOOLS.forEach(school => {
  for (let i = 1; i <= 10; i++)
    StackingEnchant('spell-skills', school + '_' + i, `+${i} ${school} Skills`, `${school}_SKILL`, i)
})

SPECIALIZATIONS.forEach(spec => {
  for (let i = 1; i <= 10; i++)
    StackingEnchant('spell-skills', spec + '_' + i, `+${i} ${spec} Skills`, `${spec}_SKILL`, i)
})

MISC.forEach(tag => {
  for (let i = 1; i <= 10; i++)
    StackingEnchant('spell-skills', tag + '_' + i, `+${i} ${tag} Skills`, `${tag}_SKILL`, i)
})
