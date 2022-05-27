
import { std } from "wow/wotlk";
import { MODNAME } from "./datascripts";

// Fiend Class
const ADVENTURER = std.Classes.create(MODNAME, 'adventurer', 'PALADIN')
ADVENTURER.Name.enGB.set('Adventurer');
ADVENTURER.Races.add(['HUMAN', 'DWARF', 'NIGHTELF', 'GNOME', 'DRAENEI', 'ORC', 'UNDEAD', 'TAUREN', 'TROLL', 'BLOODELF'])
ADVENTURER.UI.Color.set(0xFFDAB9);

ADVENTURER.UI.Info.add('- Role: Tank, Healer, Damage')
ADVENTURER.UI.Info.add('- Can utilize any armor')
ADVENTURER.UI.Info.add('- Universal Potential - Can be any class')
ADVENTURER.UI.Info.add('- Uses mana, energy, or rage as a resource')
ADVENTURER.UI.Info.add('- Can use any weapon')
ADVENTURER.UI.Description.set("After the War Against the Nightmare, the inhabitants of Azeroth have devised new strategies to better protect their beloved planet. The Azerothians have given up maintaining the once kept secrecy of class orders, and have shared this information freely amongst each-other. Now, in the new age of Azeorth, Adventurers have arisen. These versatile individuals can adapt the skills and proficiencies of almost ANY previous class; however, the Knight's of the Ebon Blade have since been the only order to withhold their secrets from the public. Regardless, Azeroth will cherish its newfound protectors.")

std.Tags.addUnique(MODNAME, 'adventurer-class', ADVENTURER.ID)

ADVENTURER.Stats.ParryCap.set(100)
ADVENTURER.Stats.DodgeCap.set(100)