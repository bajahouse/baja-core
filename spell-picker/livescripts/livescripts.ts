import { SpellPickerOption, SpellPickerOptionsMsg } from '../shared/Messages'

export function Main (events: TSEvents) {
  events.Player.OnSay(player => {
    const query = QueryWorld(`
      SELECT * FROM spellpicker WHERE classmask = ${player.GetClassMask()};
    `)
    const msg = new SpellPickerOptionsMsg()
    const list: TSArray<SpellPickerOption> = []
    while (query.GetRow()) {
      const spell_id = query.GetInt32(0)
      const first_spell_id = query.GetInt32(1)
      const classmask = query.GetInt32(2)
      const level = query.GetInt32(3)
      const rank = query.GetInt32(4)
      const faction = query.GetInt32(5)
      list.push(
        new SpellPickerOption(
          spell_id,
          first_spell_id,
          classmask,
          level,
          rank,
          faction,
        )
      )
    }
    const packet = msg.write(list)
    packet.SendToPlayer(player)
  })
}
