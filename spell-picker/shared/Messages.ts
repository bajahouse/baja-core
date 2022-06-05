export const SPELL_OPTIONS_ID = 26

export class SpellOption {
  classmask: uint32
  faction: uint32
  first_spell_id: uint32
  spell_id: uint32
  rank: uint32
  level: uint32

  constructor (
    classmask: uint32,
    faction: uint32,
    first_spell_id: uint32,
    spell_id: uint32,
    rank: uint32,
    level: uint32,
  ) {
    this.classmask = classmask
    this.faction = faction
    this.first_spell_id = first_spell_id
    this.spell_id = spell_id
    this.rank = rank
    this.level = level
  }
}

export class SpellOptions {
  options: TSArray<SpellOption> = []

  read (read: TSPacketRead): void {
    for (let i = 0; i < read.Size(); i++) {
      const option = new SpellOption(
        read.ReadUInt32(),
        read.ReadUInt32(),
        read.ReadUInt32(),
        read.ReadUInt32(),
        read.ReadUInt32(),
        read.ReadUInt32(),
      )
      this.options.push(option)
    }
  }

  write (spells: TSArray<SpellOption>): TSPacketWrite {
    const packet = CreateCustomPacket(SPELL_OPTIONS_ID, 0)

    for (let i = 0; i < spells.length; i++) {
      const spell = spells[i]
      packet.WriteUInt32(spell.classmask)
      packet.WriteUInt32(spell.faction)
      packet.WriteUInt32(spell.first_spell_id)
      packet.WriteUInt32(spell.spell_id)
      packet.WriteUInt32(spell.rank)
      packet.WriteUInt32(spell.level)
    }

    return packet
  }
}

