function Random (min: number = 1000000, max: number = 8999999): number {
  return Math.floor(Math.random() * max) + min
}

//requires beingfilled out
const skillToSpell = [
  [
    GetIDTag('spell-skills', 'SINISTER_STRIKE_SKILL'),
    GetIDTag('spell-skills', 'SINISTER_STRIKE'),
  ],
  [
    GetIDTag('spell-skills', 'FIREBALL_SKILL'),
    GetIDTag('spell-skills', 'FIREBALL'),
  ],
]

//generated
const miscToSpell = CreateDictionary<uint32, TSArray<uint32>>({})

export function Main (events: TSEvents) {
  setupMiscToSpell()
  skillToSpell.forEach((val, i, arr) => {
    events.SpellID.OnApply(val[0], s => {
      const c = s.GetCaster()
      //bonus: it should apply this per-effect allowing you to mix/match bonus+negative
      //identifier: miscValueA. it should match to all other bonus sinisterstrike and be unique
      //bonus: MiscValueB. anything you want: +3, -6, etc
      const id = c.GetInt(s.GetMiscValue().toString(), 0) + (s.GetMiscValueB() || 0)
      const v: int32 = id
      c.SetInt(s.GetMiscValue().toString(), v)
    })
    events.SpellID.OnRemove(val[0], s => {
      const c = s.GetCaster()
      const v: int32 = c.GetInt(s.GetMiscValue().toString(), 0) - (s.GetMiscValueB() || 0)
      c.SetInt(s.GetMiscValue().toString(), v)            
    })
  })
  miscToSpell.forEach((key, value) => {
    events.SpellID.OnDamageEarly(value, (s, d, i, t, c) => {
      const p = s.GetCaster()
      const points = p.GetInt(key.toString(), 0)
      const damage = d.get() + (d.get() * (points * Random(0.020, 0.033)))
      d.set(damage) 
    })
  })
}

function setupMiscToSpell() {
  skillToSpell.forEach((v, index, arr) => {
    const s = GetSpellInfo(v[0][0])
    for (let i = 0; i < 3; i++) {
      let eff = s.GetEffect(i)
      if (eff.GetMiscValue() != 0)
        miscToSpell[eff.GetMiscValue()] = v[1]
    }
  })
}
