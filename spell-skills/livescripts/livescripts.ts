
// on apply aura:
// - set [tag_dict_key]=true on player: sinister_strike=true, rogue=true

// on remove aura:
// - if stacks=0 then set [tag_dict_key]=false on player

// on event (damage, after-cast, etc):
// - lookup tags for spell
// - accumulate effectiveness for tags based on aura stacks (prefer dictionaries)

const SpellTags = CreateDictionary<float, TSArray<TSString>>({})

const EXAMPLE_TAGS: TSArray<TSString> = <TSArray<TSString>>([
  'sinister-strike',
  'offensive',
  'rogue',
]) 

SpellTags.set(
  GetIDTagUnique('spell-skills', 'SINISTER_STRIKE_FIRST'),
  EXAMPLE_TAGS,
)

export function Main (events: TSEvents) {
  // events.SpellID.OnApply
  events.SpellID.OnDamageEarly(
    GetIDTag('spell-skills', 'SINISTER_STRIKE'),
    (spell, damage, info, type, isCrit, effectMask) => {
      const caster = spell.GetCaster()
      if (!caster.IsPlayer())
        return
      const player = caster.ToPlayer()
    },
  )
}
