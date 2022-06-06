export const SPELL_PICKER_INIT_ID = 26
export const SPELL_PICKER_OPTIONS_ID = 27
export const SPELL_PICKER_RELOAD_ID = 30

export class SpellPickerData {
  public spell_id: uint32
  public first_spell_id: uint32
  public classmask: uint32
  public level: uint32
  public rank: uint32
  public faction: uint32

  constructor (
    spell_id: uint32,
    first_spell_id: uint32,
    classmask: uint32,
    level: uint32,
    rank: uint32,
    faction: uint32,
  ) {
    this.spell_id = spell_id
    this.first_spell_id = first_spell_id
    this.classmask = classmask
    this.level = level
    this.rank = rank
    this.faction = faction
  }
}

export class SpellPickerOptionsMsg {
  Write (spells: TSArray<SpellPickerData>): TSPacketWrite {
    const packet = CreateCustomPacket(SPELL_PICKER_OPTIONS_ID, 0)
    const size = spells.length
    packet.WriteUInt32(size)
    for (let i = 0; i < size; i++) {
      const spell = spells[i]
      packet.WriteUInt32(spell.spell_id)
      packet.WriteUInt32(spell.first_spell_id)
      packet.WriteUInt32(spell.classmask)
      packet.WriteUInt32(spell.level)
      packet.WriteUInt32(spell.rank)
      packet.WriteUInt32(spell.faction)
    }
    return packet
  }

  Read (packet: TSPacketRead): TSArray<SpellPickerData> {
    const list: TSArray<SpellPickerData> = []
    const size = packet.ReadUInt32()
    for (let i = 0; i < size; i++) {
      const spell_id = packet.ReadUInt32()
      const first_spell_id = packet.ReadUInt32()
      const classmask = packet.ReadUInt32()
      const level = packet.ReadUInt32()
      const rank = packet.ReadUInt32()
      const faction = packet.ReadUInt32()
      const option = new SpellPickerData(
        spell_id,
        first_spell_id,
        classmask,
        level,
        rank,
        faction,
      )
      list.push(option)
    }
    return list
  }
}

