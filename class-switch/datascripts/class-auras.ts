import { std } from "wow/wotlk"
import { MODNAME } from "./datascripts"

let names = [//update with new class
    "Warrior",
    "Paladin",
    "Hunter",
    "Rogue",
    "Priest",
    "DK",
    "Shaman",
    "Mage",
    "Warlock",
    "Druid",
]

let textures = [
    "inv_sword_27",
    "inv_hammer_01",
    "inv_weapon_bow_07",
    "inv_throwingknife_04",
    "inv_staff_30",
    "Spell_Deathknight_ClassIcon",
    "inv_jewelry_talisman_04",
    "inv_staff_13",
    "spell_nature_drowsy",
    "inv_misc_monsterclaw_04",
]

for (let i = 0; i < names.length; i++) {
    std.Spells.create(MODNAME, names[i] + '-aura', 42053)
        .Name.enGB.set(names[i] + ' Specialization')
        .Description.enGB.set('This adventurer is currently specializing in ' + names[i] + ' abilities.')
        .Icon.setPath(textures[i])
        .Duration.setSimple(-1)
        .Tags.add(MODNAME, 'class-auras')
}