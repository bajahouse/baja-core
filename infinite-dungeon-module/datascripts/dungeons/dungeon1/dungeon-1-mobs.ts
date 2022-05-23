import { std } from "wow/wotlk";
import { MODNAME } from "../../modname";
import { minimobTwo } from "./dungeon-1-mini-mobs";

export let LightningTotemBolt = std.Spells.load(43301);
LightningTotemBolt.Effects.get(0).PointsBase.set(325);
LightningTotemBolt.Effects.get(0).PointsDieSides.set(121);
export let DungeonMob01Spell01 = std.Spells.create(MODNAME,"dungeonmob01spell01-spell",43302);
DungeonMob01Spell01.Name.enGB.set("Summon Lightning Totem");
DungeonMob01Spell01.Description.enGB.set("Summons an Lightning Totem that lasts $d. and periodically damages nearby enemies.");
DungeonMob01Spell01.Duration.setSimple(60000);
DungeonMob01Spell01.CastTime.setSimple(2000);

export let LightningNetDamage = std.Spells.load(43363);
LightningNetDamage.Effects.get(0).PointsBase.set(216);
LightningNetDamage.Effects.get(0).PointsDieSides.set(75);
export let DungeonMob01Spell02 = std.Spells.create(MODNAME,"dungeonmob01spell02-spell",43362);
DungeonMob01Spell02.Name.enGB.set("Lightning Net");
DungeonMob01Spell02.AuraDescription.enGB.set("Immobilized.")
DungeonMob01Spell02.Description.enGB.set("Immobilizes an enemy for $d. and shocks it with electricity, inflicting Nature damage.");
DungeonMob01Spell02.Duration.setSimple(6000);
DungeonMob01Spell02.CastTime.setSimple(1000);

export let DungeonMob01Spell03 = std.Spells.create(MODNAME,"dungeonmob01spell03-spell",66705);
DungeonMob01Spell03.Name.enGB.set("Call Ally");
DungeonMob01Spell03.Description.enGB.set("Summons miniature mobs to assist the caster.");
DungeonMob01Spell03.Effects.get(0).PointsBase.set(2)
DungeonMob01Spell03.Effects.get(0).PointsDieSides.set(1)
DungeonMob01Spell03.Effects.get(0).MiscValueA.set(minimobTwo.ID)
DungeonMob01Spell03.Duration.setSimple(35000);
DungeonMob01Spell03.CastTime.setSimple(2000);

export let DungeonMob01Spell04 = std.Spells.create(MODNAME,"dungeonmob01spell04-spell",379);
DungeonMob01Spell04.Name.enGB.set("Earthen Shield");
DungeonMob01Spell04.Description.enGB.set("Protects the target with an earthen shield, giving a chance of ignoring spell interruption when damaged and causing attacks to heal the shielded target.");
DungeonMob01Spell04.Duration.setSimple(120000);

export let WardCreature = std.CreatureTemplates.load(20208);
WardCreature.Name.enGB.set('Healing Ward')
WardCreature.Level.set(20,20)
export let HealingWardHeal = std.Spells.load(34977);
HealingWardHeal.Effects.get(0).PointsBase.set(765)
HealingWardHeal.Effects.get(0).PointsDieSides.set(210)
export let DungeonMob01Spell05 = std.Spells.create(MODNAME,"dungeonmob01spell05-spell",34980);
DungeonMob01Spell05.Name.enGB.set("Healing Ward");
DungeonMob01Spell05.Description.enGB.set("Summons a ward that lasts $d. and periodically heals allies in an area around it.");

export let mobOne = std.CreatureTemplates.create(MODNAME,'dungeonmob1',8912) //Normal Caster Mob
mobOne.Name.enGB.set('Shamanistic Twilight Heratic')
mobOne.Subname.enGB.set('Acolyte of the Damned')
mobOne.AIName.set('')
mobOne.Level.set(20,20)
mobOne.FactionTemplate.set(18)
mobOne.Stats.HealthMod.set(5)
mobOne.Stats.DamageMod.set(2)

mobOne.InlineScripts.OnJustEnteredCombat(creature=>{
    function getrandomInt(max: uint32): uint32 {
        return Math.floor(Math.random() * max);
    }
    creature.AddNamedTimer("combatloop", 5000, -1, (owner,timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        let spells: TSArray<uint32> = <TSArray<uint32>>[
            GetID("Spell", MODNAME, "dungeonmob01spell01-spell"),
            GetID("Spell", MODNAME, "dungeonmob01spell02-spell"),
            GetID("Spell", MODNAME, "dungeonmob01spell03-spell"),
            GetID("Spell", MODNAME, "dungeonmob01spell04-spell"),
            GetID("Spell", MODNAME, "dungeonmob01spell05-spell"),
        ];
        let spellChoice = getrandomInt(3);
        self.CastSpell(target,spells[spellChoice],false)
    });
})
mobOne.InlineScripts.OnDeath((creature,killer)=>{
    creature.RemoveTimer('combatloop')
})
mobOne.InlineScripts.OnReachedHome((creature)=>{
    creature.RemoveTimer('combatloop')
})

export let DungeonMob02Spell01 = std.Spells.create(MODNAME,"dungeonmob02spell01-spell",43273);
DungeonMob02Spell01.Name.enGB.set("Cleave");
DungeonMob02Spell01.Description.enGB.set("Inflicts $s1% of normal melee damage to an enemy and its nearest allies, affecting up to $x1 targets.");
DungeonMob02Spell01.Effects.get(0).PointsBase.set(299)
DungeonMob02Spell01.Effects.get(0).PointsDieSides.set(1)
DungeonMob02Spell01.Effects.get(0).ChainTarget.set(10)

export let DungeonMob02Spell02 = std.Spells.create(MODNAME,"dungeonmob02spell02-spell",43348);
DungeonMob02Spell02.Name.enGB.set("Crack Skull");
DungeonMob02Spell02.Description.enGB.set("Deals a powerful blow to the target, inflicting $s1 damage and stunning it for $d.");
DungeonMob02Spell02.Effects.get(0).PointsBase.set(540)
DungeonMob02Spell02.Effects.get(0).PointsDieSides.set(519)

export let DungeonMob02Spell03 = std.Spells.create(MODNAME,"dungeonmob02spell03-spell",43547);
DungeonMob02Spell03.Name.enGB.set("Master of the Blade");
DungeonMob02Spell03.Description.enGB.set("Increases the caster's attack speed by $s1% for $d.");
DungeonMob02Spell03.Effects.get(0).PointsBase.set(49)
DungeonMob02Spell03.Effects.get(0).PointsDieSides.set(1)

export let DungeonMob02Spell04 = std.Spells.create(MODNAME,"dungeonmob02spell04-spell",43583);
DungeonMob02Spell04.Name.enGB.set("Thunder Stomp");
DungeonMob02Spell04.Description.enGB.set("Damages all nearby enemies for $s1 Nature damage and slows attack speed by $s2%.");
DungeonMob02Spell04.Effects.get(0).PointsBase.set(219)
DungeonMob02Spell04.Effects.get(0).PointsDieSides.set(122)
DungeonMob02Spell04.Effects.get(1).PointsBase.set(-21)
DungeonMob02Spell04.Effects.get(1).PointsDieSides.set(1)

export let mobTwo = std.CreatureTemplates.create(MODNAME,'dungeonmob2',34980) //Normal Melee Mob
mobTwo.Name.enGB.set('Blade-master Twilight Heratic')
mobTwo.Subname.enGB.set('Acolyte of the Damned')
mobTwo.AIName.set('')
mobTwo.Level.set(20,20)
mobTwo.FactionTemplate.set(18)
mobTwo.Stats.HealthMod.set(5)
mobTwo.Stats.DamageMod.set(3)

mobTwo.InlineScripts.OnJustEnteredCombat(creature=>{
    function getrandomInt(max: uint32): uint32 {
        return Math.floor(Math.random() * max);
    }
    creature.AddNamedTimer("combatloop", 5000, -1, (owner,timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        let spells: TSArray<uint32> = <TSArray<uint32>>[
            GetID("Spell", MODNAME, "dungeonmob02spell01-spell"),
            GetID("Spell", MODNAME, "dungeonmob02spell02-spell"),
            GetID("Spell", MODNAME, "dungeonmob02spell03-spell"),
            GetID("Spell", MODNAME, "dungeonmob02spell04-spell"),
        ];
        let spellChoice = getrandomInt(3);
        self.CastSpell(target,spells[spellChoice],false)
    });
})
mobTwo.InlineScripts.OnDeath((creature,killer)=>{
    creature.RemoveTimer('combatloop')
})
mobTwo.InlineScripts.OnReachedHome((creature)=>{
    creature.RemoveTimer('combatloop')
})

export let DungeonMob03Spell01 = std.Spells.create(MODNAME,"dungeonmob03spell01-spell",42478);
DungeonMob03Spell01.Name.enGB.set("Ward of Protection");
DungeonMob03Spell01.Description.enGB.set("Summons a ward that lasts $d. While the ward persists, nearby friendly units are protected from all damage.");

export let DungeonMob03Spell02 = std.Spells.create(MODNAME,"dungeonmob03spell02-spell",32828);
DungeonMob03Spell02.Name.enGB.set("Aura of Protection");
DungeonMob03Spell02.Description.enGB.set("Gives $s1 additional armor and $s2 additional magic resistance to friendly creatures within $a1 yards.");

export let DungeonMob03Spell03 = std.Spells.create(MODNAME,"dungeonmob03spell03-spell",35158);
DungeonMob03Spell02.Name.enGB.set("Magic Reflection");
DungeonMob03Spell02.Description.enGB.set("Surrounds the caster with a protective shield that reflects $s1% of harmful spells for $d.");

export let DungeonMob03Spell04 = std.Spells.create(MODNAME,"dungeonmob03spell04-spell",35159);
DungeonMob03Spell02.Name.enGB.set("Reflective Damage Shield");
DungeonMob03Spell02.Description.enGB.set("Surrounds the caster with a protective shield that inflicts $s1 Arcane damage to melee attackers when hit.");
DungeonMob03Spell02.Effects.get(0).PointsBase.set(259)
DungeonMob03Spell02.Effects.get(0).PointsDieSides.set(1)

export let mobThree = std.CreatureTemplates.create(MODNAME,'dungeonmob3',34980) //Normal Tank Mob
mobThree.Name.enGB.set('Battle-hardened Twilight Heratic')
mobThree.Subname.enGB.set('Acolyte of the Damned')
mobThree.AIName.set('')
mobThree.Level.set(20,20)
mobThree.FactionTemplate.set(18)
mobThree.Stats.HealthMod.set(8)
mobThree.Stats.DamageMod.set(3)

mobThree.InlineScripts.OnJustEnteredCombat(creature=>{
    function getrandomInt(max: uint32): uint32 {
        return Math.floor(Math.random() * max);
    }
    creature.AddNamedTimer("combatloop", 5000, -1, (owner,timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        let spells: TSArray<uint32> = <TSArray<uint32>>[
            GetID("Spell", MODNAME, "dungeonmob03spell01-spell"),
            GetID("Spell", MODNAME, "dungeonmob03spell02-spell"),
            GetID("Spell", MODNAME, "dungeonmob03spell03-spell"),
            GetID("Spell", MODNAME, "dungeonmob03spell04-spell"),
        ];
        let spellChoice = getrandomInt(3);
        self.CastSpell(target,spells[spellChoice],false)
    });
})
mobThree.InlineScripts.OnDeath((creature,killer)=>{
    creature.RemoveTimer('combatloop')
})
mobThree.InlineScripts.OnReachedHome((creature)=>{
    creature.RemoveTimer('combatloop')
})