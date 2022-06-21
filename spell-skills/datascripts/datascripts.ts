import { std } from 'wow/wotlk'
import { SpellItemEnchantmentRow } from 'wow/wotlk/dbc/SpellItemEnchantment'
import { Spell } from 'wow/wotlk/std/Spell/Spell'

import { SPELL_SKILL_SPELLS } from './data'

let enchant_id = 9000

function NameToID (name: string) {
  return name
    .toUpperCase()
    .replace(/\s+/gi, '_')
    .replace(/-/gi, '_')
    .replace(/\./gi, '')
}

interface Enchant { 
  mod: string
  id: string
  english: string
  spell: Spell
  enchant: SpellItemEnchantmentRow
}

interface Enchants {
  [name: string]: Enchant
}

const CustomEnchants: Enchants = {}

function StackingEnchant (
  mod: string,
  id: string,
  name: string,
  tag: string,
  amount: number,
) {
  const dummy = std.Spells.create(mod, NameToID(id), 7464)
  const ench = std.DBC.SpellItemEnchantment.add(enchant_id++)
  dummy.Stacks.set(0)
  dummy.Power.setMana(0)
  dummy.Range.set(0)
  dummy.Effects.clearAll()
  dummy.Effects.addGet().Type.APPLY_AURA.set().Aura.DUMMY.set()
  dummy.Power.setMana(amount)
  dummy.CastTime.set(0)
  dummy.Name.enGB.set(name)
  dummy.Tags.add('spell-skills', NameToID(tag))
  dummy.Description.enGB.set(name)
  dummy.Name.enGB.set(name)
  ench.Name.enGB.set(name)
  ench.Effect.set([3, 0, 0])
  ench.EffectPointsMin.set([0, 0, 0])
  ench.EffectPointsMax.set([0, 0, 0])
  ench.Flags.set(0)
  ench.EffectArg.set([dummy.ID, 0, 0])
  ench.ItemVisual.set(0)
  // return data
  const data: Enchant = {
    mod,
    id: NameToID(id),
    english: name,
    spell: dummy,
    enchant: ench,
  }
  CustomEnchants[NameToID(id)] = data
  return data
}

SPELL_SKILL_SPELLS.forEach(spell => {
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
