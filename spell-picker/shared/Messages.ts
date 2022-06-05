export const SPELL_OPTION_ID = 26

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

  read (read: TSPacketRead): void {
    this.classmask = read.ReadUInt32()
    this.faction = read.ReadUInt32()
    this.first_spell_id = read.ReadUInt32()
    this.spell_id = read.ReadUInt32()
    this.rank = read.ReadUInt32()
    this.level = read.ReadUInt32()
  }

  write (): TSPacketWrite {
    let packet = CreateCustomPacket(SPELL_OPTION_ID, 0)

    packet.WriteUInt32(this.classmask)
    packet.WriteUInt32(this.faction)
    packet.WriteUInt32(this.first_spell_id)
    packet.WriteUInt32(this.spell_id)
    packet.WriteUInt32(this.rank)
    packet.WriteUInt32(this.level)

    return packet
  }
}
