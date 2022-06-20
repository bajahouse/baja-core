import { SpellPickerData, SpellPickerOptionsMsg, SPELL_PICKER_INIT_ID, SPELL_PICKER_RELOAD_ID } from '../shared/Messages'
'
export function Main (events: TSEvents) {
  events.Player.OnLevelChanged(player => {
    player.SendAddonMessage('reload', `${player.GetLevel()}`, 0, player)
  })
  events.CustomPacketID.OnReceive(SPELL_PICKER_INIT_ID, (o, p, player) => {
    const query = QueryWorld(`
      SELECT * FROM spellpicker WHERE classmask = ${player.GetClassMask()};
    `)
    const msg = new SpellPickerOptionsMsg()
    const list: TSArray<SpellPickerData> = []
    while (query.GetRow()) {
      const spell_id = query.GetInt32(0)
      const first_spell_id = query.GetInt32(1)
      const classmask = query.GetInt32(2)
      const level = query.GetInt32(3)
      const rank = query.GetInt32(4)
      const faction = query.GetInt32(5)
      list.push(
        new SpellPickerData(
          spell_id,
          first_spell_id,
          classmask,
          level,
          rank,
          faction,
        )
      )
    }
    const packet = msg.Write(list)
    packet.SendToPlayer(player)
  })
}
