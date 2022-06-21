import { std } from 'wow/wotlk'
import { SpellItemEnchantmentRow } from 'wow/wotlk/dbc/SpellItemEnchantment'
import { Spell } from 'wow/wotlk/std/Spell/Spell'

import { SPELL_SKILL_SPELLS } from './data'

let enchant_id = 9000

function Colorize (phrase: string, color: string, alpha = 'ff') {
  return `|c${alpha}${color}${phrase}|r`
}

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
  // dummy.Effects.addGet().Type.APPLY_AURA.set()
  dummy.Effects.clearAll()
  dummy.Effects.addGet().Type.APPLY_AURA.set().Aura.DUMMY.set()
  dummy.Power.setMana(amount)
  // dummy.Duration.set(0)
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
  // test
  const item = std.Items.create('spell-skills', `DAGGER_${NameToID(id)}`, 2092)
  item.Spells.addGet().Spell.set(dummy.ID).Trigger.set(1)
  item.Name.enGB.set(`[TEST DAGGER] ${name}`)
  return data
}

const WEAPON_TYPES = [
  '1-Handed Axe',
  '2-Handed Axe',
  'Bow',
  'Crossbow',
  'Dagger',
  'Fishing Pole',
  'Fist Weapon',
  'Gun',
  '1-Handed Mace',
  '2-Handed Mace',
  'Polearm',
  'Staff',
  '1-Handed Sword',
  '2-Handed Sword',
  'Thrown Weapon',
  'Wand',
]

const SPELL_SKILL_CLASSES = [
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

const SPELL_SKILL_SCHOOLS = [
  'Fire',
  'Frost',
  'Nature',
  'Shadow',
  'Holy',
  'Arcane',
  'Physical',
]

const SPELL_SKILL_SPECIALIZATIONS = [
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

const SPELL_SKILL_TYPES = [
  'All',
  'Magic',
  'Melee',
  'Ranged',
]

const SPELL_SKILL_MISC = [
  'Opener',
  'Bleed',
  'Poison',
  'Disease',
  'Unholy',
  'Enchantment',
  'Conjuration',
  'Summon',
]

const PERCENTAGE_STATS = [
  'Spell Absorb',
  'Fire Absorb',
  'Frost Absorb',
  'Nature Absorb',
  'Shadow Absorb',
  'Holy Absorb',
  'Arcane Absorb',
  'Armor Penetration',
  'Spell Penetration',
  'Fire Penetration',
  'Frost Penetration',
  'Nature Penetration',
  'Shadow Penetration',
  'Holy Penetration',
  'Arcane Penetration',
  'Stun Reduction',
  'Slow Reduction',
  'Hit Chance',
  'Critical Strike Chance',
  'Block Chance',
  'Dodge Chance',
  'Parry Chance',
  'Crushing Blow Chance',
  'Glancing Blow Chance when struck',
  'Resist Chance',
  'Fire Resist Chance',
  'Frost Resist Chance',
  'Nature Resist Chance',
  'Shadow Resist Chance',
  'Holy Resist Chance',
  'Arcane Resist Chance',
  'Faster Casting Rate',
  'Movement Speed',
]

// 1-10
const FLAT_STATS_LOW = [
  'Stealth Detection',
  'Stealth Level',
  'Dispel Protection',
]


// 1-100
const FLAT_STATS = [
  'Attack Power',
  'Spell Power',
  'Fire Spell Power',
  'Frost Spell Power',
  'Nature Spell Power',
  'Shadow Spell Power',
  'Holy Spell Power',
  'Arcane Spell Power',
  'Mana Regeneration',
  'Health Regeneration',
  'Combat Mana Regeneration',
  'Combat Health Regeneration',
  'Haste',
  'Block',
  'Defense',
  'Resilience',
  'Thorns',
  'Lifesteal',
  'Manasteal',
  'Magic Find',
  'Gold Find',
]

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

SPELL_SKILL_CLASSES.forEach(cls => {
  for (let i = 1; i <= 10; i++)
    StackingEnchant('spell-skills', cls + '_SKILLS_' + i, `+${i} ${cls} Skills`, `${cls}_SKILL`, i)
})

SPELL_SKILL_SCHOOLS.forEach(school => {
  for (let i = 1; i <= 10; i++)
    StackingEnchant('spell-skills', school + '_SKILLS_' + i, `+${i} ${school} Skills`, `${school}_SKILL`, i)
})

SPELL_SKILL_SPECIALIZATIONS.forEach(spec => {
  for (let i = 1; i <= 10; i++)
    StackingEnchant('spell-skills', spec + '_SKILLS_' + i, `+${i} ${spec} Skills`, `${spec}_SKILL`, i)
})

SPELL_SKILL_TYPES.forEach(tag => {
  for (let i = 1; i <= 10; i++)
    StackingEnchant('spell-skills', tag + '_SKILLS_' + i, `+${i} ${tag} Skills`, `${tag}_SKILL`, i)
})

SPELL_SKILL_MISC.forEach(tag => {
  for (let i = 1; i <= 10; i++)
    StackingEnchant('spell-skills', tag + '_SKILLS_' + i, `+${i} ${tag} Skills`, `${tag}_SKILL`, i)
})

FLAT_STATS_LOW.forEach(tag => {
  for (let i = 1; i <= 10; i++)
    StackingEnchant('spell-skills', tag + '_' + i, `+${i} ${tag}`, tag, i)
})

FLAT_STATS.forEach(tag => {
  for (let i = 1; i <= 100; i++)
    StackingEnchant('spell-skills', tag + '_' + i, `+${i} ${tag}`, tag, i)
})

PERCENTAGE_STATS.forEach(tag => {
  for (let i = 1; i <= 100; i++)
    StackingEnchant('spell-skills', tag + '_' + i, `+${i}% ${tag}`, tag, i)
})

WEAPON_TYPES.forEach(tag => {
  for (let i = 1; i <= 100; i++)
    StackingEnchant('spell-skills', tag + '_EXPERTISE_' + i, `+${i} ${tag} Expertise`, tag + '_EXPERTISE', i)
})

const TestDagger = std.Items.create('spell-skills', 'test-dagger', 2092)
TestDagger.Name.enGB.set('Serpent Spine')
TestDagger.Quality.PURPLE.set()
TestDagger.Damage.get(0).min.set(16)
TestDagger.Damage.get(0).max.set(23)
TestDagger.Stats.addAgility(4)
TestDagger.Stats.addStrength(2)
TestDagger.Stats.addSpirit(2)
TestDagger.Resistances.Nature.set(5)
TestDagger.Spells.addGet().Spell.set(
  CustomEnchants['BACKSTAB_SKILL_3'].spell.ID
).Trigger.set(1)
TestDagger.Spells.addGet().Spell.set(
  CustomEnchants['ASSASSINATION_SKILLS_2'].spell.ID
).Trigger.set(1)
TestDagger.Spells.addGet().Spell.set(
  CustomEnchants['CRITICAL_STRIKE_CHANCE_1'].spell.ID
).Trigger.set(1)
TestDagger.DisplayInfo.set(std.Items.load(20657).DisplayInfo.get())