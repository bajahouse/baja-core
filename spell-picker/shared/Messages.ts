export const SPELL_PICKER_OPTIONS_ID = 26

export class SpellPickerOption {
  public readonly spell_id: uint32
  public readonly first_spell_id: uint32
  public readonly classmask: uint32
  public readonly level: uint32
  public readonly rank: uint32
  public readonly faction: uint32

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
  public readonly list: TSArray<SpellPickerOption> = []

  read (read: TSPacketRead): void {
    for (let i = 0; i < read.Size(); i++) {
      const spell_id = read.ReadUInt32()
      // FIXME: goes in with number...
      console.log(spell_id)
      const first_spell_id = read.ReadUInt32()
      const classmask = read.ReadUInt32()
      const level = read.ReadUInt32()
      const rank = read.ReadUInt32()
      const faction = read.ReadUInt32()
      const option = new SpellPickerOption(
        spell_id,
        first_spell_id,
        classmask,
        level,
        rank,
        faction,
      )
      this.list.push(option)
    }
  }

  write (spells: TSArray<SpellPickerOption>): TSPacketWrite {
    const size = spells.length
    const packet = CreateCustomPacket(SPELL_PICKER_OPTIONS_ID, size)
    for (let i = 0; i < size; i++) {
      const spell = spells[i]
      // FIXME: ...comes out as zero
      console.log(spell.spell_id)
      packet.WriteUInt32(spell.spell_id)
      packet.WriteUInt32(spell.first_spell_id)
      packet.WriteUInt32(spell.classmask)
      packet.WriteUInt32(spell.level)
      packet.WriteUInt32(spell.rank)
      packet.WriteUInt32(spell.faction)
    }
    return packet
  }
}

