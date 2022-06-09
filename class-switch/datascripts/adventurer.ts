
import { std } from "wow/wotlk";
import { MODNAME } from "./datascripts";

// this requires modifying RuneFrame.lua line: 109 and replacing it with the following:
//if ( class ~= "DEATHKNIGHT" and class ~= "ADVENTURER") then
//this will show the rune frame for adventurers and death knights
//also required a decently extensive core mod so dont merge this to master

const ADVENTURER = std.Classes.create(MODNAME, 'adventurer', 'PALADIN')
std.Tags.addUnique(MODNAME, 'adventurer-class', ADVENTURER.ID)
ADVENTURER.Name.enGB.set('Adventurer');
ADVENTURER.Races.add(['HUMAN', 'DWARF', 'NIGHTELF', 'GNOME', 'DRAENEI', 'ORC', 'UNDEAD', 'TAUREN', 'TROLL', 'BLOODELF'])
ADVENTURER.UI.Color.set(0xFFDAB9);

ADVENTURER.UI.Info.add('- Role: Tank, Healer, Damage')
ADVENTURER.UI.Info.add('- Can utilize any armor')
ADVENTURER.UI.Info.add('- Universal Potential - Can be any class')
ADVENTURER.UI.Info.add('- Uses mana, energy, or rage as a resource')
ADVENTURER.UI.Info.add('- Can use any weapon')
ADVENTURER.UI.Description.set("After the War Against the Nightmare, the inhabitants of Azeroth have devised new strategies to better protect their beloved planet. The Azerothians have given up maintaining the once kept secrecy of class orders, and have shared this information freely amongst each-other. Now, in the new age of Azeorth, Adventurers have arisen. These versatile individuals can adapt the skills and proficiencies of almost ANY previous class; however, the Knight's of the Ebon Blade have since been the only order to withhold their secrets from the public. Regardless, Azeroth will cherish its newfound protectors.")

ADVENTURER.Stats.ParryCap.set(100)
ADVENTURER.Stats.DodgeCap.set(100)

std.SkillLines.forEach((line) => {
    if (line.Category.get() == 6 || line.Category.get() == 7 || line.Category.get() == 8) {
        line.RaceClassInfos.forEach((v, i) => {
            v.ClassMask.add(ADVENTURER.Mask)
            v.RaceMask.clearAll()
            v.RaceMask.flip()
        })
    }
})

std.DBC.SkillLineAbility.queryAll({ RaceMask: 0 }).forEach(v => {
    if (v.ClassMask.get() != 0 && (v.AcquireMethod.get() == 0 || v.AcquireMethod.get() == 1)) {
        v.ClassMask.mark(ADVENTURER.ID - 1)
        v.RaceMask.markAll([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
})