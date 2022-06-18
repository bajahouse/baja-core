// //requires beingfilled out
// const skillToSpell = [
//   [
//     GetIDTag('spell-skills', 'SINISTER_STRIKE_SKILL'),
//     GetIDTag('spell-skills', 'SINISTER_STRIKE'),
//   ],
//   [
//     GetIDTag('spell-skills', 'FIREBALL_SKILL'),
//     GetIDTag('spell-skills', 'FIREBALL'),
//   ],
// ]

// //generated
// const miscToSpell = CreateDictionary<uint32, TSArray<uint32>>({})

// export function M (events: TSEvents) {
//   setupMiscToSpell()
//   skillToSpell.forEach((val, i, arr) => {
//     events.SpellID.OnApply(val[0], s => {
//       const c = s.GetCaster()
//       //bonus: it should apply this per-effect allowing you to mix/match bonus+negative
//       //identifier: miscValueA. it should match to all other bonus sinisterstrike and be unique
//       //bonus: MiscValueB. anything you want: +3, -6, etc
//       const id = c.GetInt(s.GetMiscValue().toString(), 0) + (s.GetMiscValueB() || 0)
//       const v: int32 = id
//       c.SetInt(s.GetMiscValue().toString(), v)
//     })
//     events.SpellID.OnRemove(val[0], s => {
//       const c = s.GetCaster()
//       const v: int32 = c.GetInt(s.GetMiscValue().toString(), 0) - (s.GetMiscValueB() || 0)
//       c.SetInt(s.GetMiscValue().toString(), v)            
//     })
//   })
//   miscToSpell.forEach((key, value) => {
//     events.SpellID.OnDamageEarly(value, (s, d, i, t, c) => {
//       const p = s.GetCaster()
//       const points = p.GetInt(key.toString(), 0)
//       const damage = d.get() + (d.get() * (points * Random(0.020, 0.033)))
//       d.set(damage) 
//     })
//   })
// }

// function setupMiscToSpell() {
//   skillToSpell.forEach((v, index, arr) => {
//     const s = GetSpellInfo(v[0][0])
//     for (let i = 0; i < 3; i++) {
//       let eff = s.GetEffect(i)
//       if (eff.GetMiscValue() != 0)
//         miscToSpell[eff.GetMiscValue()] = v[1]
//     }
//   })
// }

// const SpellTags = CreateDictionary<float, TSArray<TSString>>({})

function Random (min: number = 1000000, max: number = 8999999): number {
  return Math.floor(Math.random() * max) + min
}

function AtLeastZero (num: number): number {
  return (num >= 0) ? num : 0
}

function RemoveSpellSkillTag (player: TSPlayer, id: string) {
  const arr = player.GetJsonArray('spell-skills', new TSJsonArray())
  for (let i = 0; i < arr.length; i++) {
    const x = arr.GetString(i)
    if (x === id)
      arr.Remove(i)
  }
  player.SetJsonArray('spell-skills', arr)
}

function AddSpellSkillTag (player: TSPlayer, id: string) {
  let alreadyExists = false
  const arr = player.GetJsonArray('spell-skills', new TSJsonArray())
  for (let i = 0; i < arr.length; i++) {
    const x = arr.GetString(i)
    if (x === id)
      alreadyExists = true
  }
  if (!alreadyExists)
    arr.PushString(id)
  player.SetJsonArray('spell-skills', arr)
}

export function Main (events: TSEvents) {
  events.Player.OnSay((p, m) => {
    if (m.get() === 'skills') {
      p.AddTimer(1, 1, 0, o => {
        const p = o.ToPlayer()
        const arr = p.GetJsonArray('spell-skills', new TSJsonArray())
        for (let i = 0; i < arr.length; i++)
          p.SendBroadcastMessage(
            `${arr.GetString(i)}: ${p.GetNumber(arr.GetString(i) + '_SKILL')}`
          )
      })
    }
  })

  events.Player.OnLogin(p => {
    p.SendBroadcastMessage(`${p.GetNumber('SINISTER_STRIKE_SKILL')}`)
  })

  // MISC
  // ALL
  events.SpellID.OnApply(GetIDTag('spell-skills', 'All_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('ALL_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous + points)
    p.SetNumber('ALL_SKILL', next)
  })
  events.SpellID.OnRemove(GetIDTag('spell-skills', 'All_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('ALL_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous - points)
    p.SetNumber('ALL_SKILL', next)
  })  

  // CLASS
  // MAGE
  events.SpellID.OnApply(GetIDTag('spell-skills', 'Mage_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('MAGE_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous + points)
    p.SetNumber('MAGE_SKILL', next)
  })
  events.SpellID.OnRemove(GetIDTag('spell-skills', 'Mage_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('MAGE_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous - points)
    p.SetNumber('MAGE_SKILL', next)
  })
  
  // ROGUE
  events.SpellID.OnApply(GetIDTag('spell-skills', 'Rogue_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('ROGUE_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous + points)
    p.SetNumber('ROGUE_SKILL', next)
  })
  events.SpellID.OnRemove(GetIDTag('spell-skills', 'Rogue_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('ROGUE_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous - points)
    p.SetNumber('ROGUE_SKILL', next)
  })

  // SPEC
  // FIRE
  events.SpellID.OnApply(GetIDTag('spell-skills', 'Fire_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('FIRE_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous + points)
    p.SetNumber('FIRE_SKILL', next)
  })
  events.SpellID.OnRemove(GetIDTag('spell-skills', 'Fire_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('FIRE_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous - points)
    p.SetNumber('FIRE_SKILL', next)
  })

  // COMBAT
  events.SpellID.OnApply(GetIDTag('spell-skills', 'Combat_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('COMBAT_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous + points)
    p.SetNumber('COMBAT_SKILL', next)
  })
  events.SpellID.OnRemove(GetIDTag('spell-skills', 'Combat_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('COMBAT_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous - points)
    p.SetNumber('COMBAT_SKILL', next)
  })

  // SPELL
  // SINISTER_STRIKE
  events.SpellID.OnApply(GetIDTag('spell-skills', 'SINISTER_STRIKE_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('SINISTER_STRIKE_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous + points)
    p.SetNumber('SINISTER_STRIKE_SKILL', next)
    AddSpellSkillTag(p, 'SINISTER_STRIKE')
  })
  events.SpellID.OnRemove(GetIDTag('spell-skills', 'SINISTER_STRIKE_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('SINISTER_STRIKE_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous - points)
    p.SetNumber('SINISTER_STRIKE_SKILL', next)
    RemoveSpellSkillTag(p, 'SINISTER_STRIKE')
  })
  events.SpellID.OnDamageEarly(GetIDTag('spell-skills', 'SINISTER_STRIKE'), (spell, dmg) => {
    const p = spell.GetCaster().ToPlayer()
    const a: uint32 = AtLeastZero(p.GetNumber('SINISTER_STRIKE_SKILL'))
    const b: uint32 = AtLeastZero(p.GetNumber('ALL_SKILL'))
    const c: uint32 = AtLeastZero(p.GetNumber('ROGUE_SKILL'))
    const d: uint32 = AtLeastZero(p.GetNumber('COMBAT_SKILL'))
    const points = a + b + c + d
    const damage = dmg.get() + (dmg.get() * (points * Random(0.1, 0.2)))
    dmg.set(damage)
  })

  // FIREBALL
  events.SpellID.OnApply(GetIDTag('spell-skills', 'FIREBALL_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('FIREBALL_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous + points)
    p.SetNumber('FIREBALL_SKILL', next)
    AddSpellSkillTag(p, 'FIREBALL')
  })
  events.SpellID.OnRemove(GetIDTag('spell-skills', 'FIREBALL_SKILL'), s => {
    const p = s.GetCaster().ToPlayer()
    const previous: uint32 = p.GetNumber('FIREBALL_SKILL')
    const points: uint32 = s.GetSpellInfo().GetManaCost()
    const next: uint32 = AtLeastZero(previous - points)
    p.SetNumber('FIREBALL_SKILL', next)
    RemoveSpellSkillTag(p, 'FIREBALL')
  })
  events.SpellID.OnDamageEarly(GetIDTag('spell-skills', 'FIREBALL'), (s, dmg) => {
    const p = s.GetCaster().ToPlayer()
    const a: uint32 = AtLeastZero(p.GetNumber('FIREBALL_SKILL'))
    const b: uint32 = AtLeastZero(p.GetNumber('ALL_SKILL'))
    const c: uint32 = AtLeastZero(p.GetNumber('FIRE_SKILL'))
    const d: uint32 = AtLeastZero(p.GetNumber('MAGE_SKILL'))
    const points = a + b + c + d
    const damage = dmg.get() + (dmg.get() * (points * Random(0.05, 0.1)))
    dmg.set(damage)
  })
}
