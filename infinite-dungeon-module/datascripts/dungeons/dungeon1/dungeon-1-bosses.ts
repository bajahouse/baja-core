import { std } from "wow/wotlk";
import { MODNAME } from "../../modname";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Boss 1 : Agnar Steelwinter
Type : Orc Shaman
Health : 29000
Abilities : 
    1. Flame Shock - No cast time, Instant 175 + 145 per 3 seconds for 20 seconds.
    2. Lightning Bolt - 2 second cast time, 385 damage
    3. Chain Lighting - 3 second cast time, 715 damage chain, only target players
    4. Healing Wave - Interruptable, 5 second cast time, heals for 7500.
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let Boss1FlameShock1 = std.Spells.create(MODNAME,"boss1flameshock1-spell2",8050);
Boss1FlameShock1.Name.enGB.set("Crackling Flames");
Boss1FlameShock1.AuraDescription.enGB.set("$s2 Fire damage every $t2 seconds.");
Boss1FlameShock1.Description.enGB.set("Instantly sears the target with fire, causing $s1 Fire damage immediately and $o2 Fire damage over $d.");
Boss1FlameShock1.Effects.get(0).PointsBase.set(174);
Boss1FlameShock1.Effects.get(0).PointsDieSides.set(1);
Boss1FlameShock1.Effects.get(0).PointsPerLevel.set(0);
Boss1FlameShock1.Effects.get(1).PointsBase.set(144);
Boss1FlameShock1.Effects.get(1).PointsDieSides.set(1);
Boss1FlameShock1.Effects.get(1).ChainAmplitude.set(3000);
Boss1FlameShock1.Duration.setSimple(7000);
Boss1FlameShock1.Cooldown.set(7000, 0, 0, 0);

export let Boss1LightningBolt1 = std.Spells.create(MODNAME,"boss1lightningbolt1-spell",8246);
Boss1LightningBolt1.Name.enGB.set("Lightning Strike");
Boss1LightningBolt1.Description.enGB.set("Blasts an enemy with lightning for $s1 Nature damage.");
Boss1LightningBolt1.Effects.get(0).PointsBase.set(384);
Boss1LightningBolt1.Effects.get(0).PointsDieSides.set(1);
Boss1LightningBolt1.Effects.get(0).PointsPerLevel.set(0);
Boss1LightningBolt1.CastTime.setSimple(2000);

export let Boss1ChainLightning1 = std.Spells.create(MODNAME,"boss1chainlightning1-spell",16033);
Boss1ChainLightning1.Name.enGB.set("Lightning Rip");
Boss1ChainLightning1.Description.enGB.set("Chain lightning rips through 10 targets dealing $s1 Nature damage.");
Boss1ChainLightning1.Effects.get(0).PointsBase.set(714);
Boss1ChainLightning1.Effects.get(0).PointsDieSides.set(1);
Boss1ChainLightning1.Effects.get(0).PointsPerLevel.set(0);
Boss1ChainLightning1.Attributes.IMPOSSIBLE_TO_DODGE_PARRY_BLOCK.set(1);
Boss1ChainLightning1.Attributes.CANT_BE_REFLECTED.set(1);
Boss1ChainLightning1.Attributes.UNAFFECTED_BY_INVULNERABILITY.set(1);
Boss1ChainLightning1.Attributes.UNAFFECTED_BY_SCHOOL_IMMUNE.set(1);
Boss1ChainLightning1.Attributes.UNAFFECTED_BY_SCHOOL_IMMUNITY.set(1);
Boss1ChainLightning1.Attributes.CANT_TARGET_SELF.set(1);
Boss1ChainLightning1.Attributes.ONLY_TARGET_PLAYERS.set(1);
Boss1ChainLightning1.InterruptFlags.clearAll();
Boss1ChainLightning1.AuraInterruptFlags.clearAll();

export let Boss1HealingWave1 = std.Spells.create(MODNAME,"boss1healingwave1-spell",16033);
Boss1HealingWave1.Name.enGB.set("Restore Life");
Boss1HealingWave1.Description.enGB.set("Heals a friendly target, restoring $s1 health.");
Boss1HealingWave1.Effects.get(0).PointsBase.set(7499);
Boss1HealingWave1.Effects.get(0).PointsDieSides.set(1);
Boss1HealingWave1.Effects.get(0).PointsPerLevel.set(0);
Boss1HealingWave1.Effects.get(0).ImplicitTargetA.UNIT_CASTER.set();
Boss1HealingWave1.CastTime.setSimple(5000);

export let dungeonBoss1 = std.CreatureTemplates.create(MODNAME,"dungeonboss1",3276);
dungeonBoss1.Models.clearAll();
dungeonBoss1.Models.addIds(19521);
dungeonBoss1.Name.enGB.set("Agnar Steelwinter");
dungeonBoss1.Scale.set(2);
dungeonBoss1.FactionTemplate.set(48);
dungeonBoss1.Level.set(23, 23);
dungeonBoss1.Rank.BOSS.set();
dungeonBoss1.UnitClass.PALADIN.set();
dungeonBoss1.DamageSchool.Normal.set();
dungeonBoss1.Stats.ArmorMod.set(100);
dungeonBoss1.Stats.DamageMod.set(6);
dungeonBoss1.Stats.HealthMod.set(35);
dungeonBoss1.Stats.ManaMod.set(100);
dungeonBoss1.Stats.ExperienceMod.set(10);

export let dungeonBoss1Loot = dungeonBoss1.NormalLoot;
dungeonBoss1.InlineScripts.OnJustEnteredCombat((creature, target) => {
    function attemptCast(spellID: number,self: TSCreature,target: TSUnit,force: boolean) {
        if (!self.IsCasting() || force) {
            if (target.IsPlayer()) {
                self.CastSpell(target, spellID, false);
            } else {
                self.CastSpell(self.GetNearestPlayer(50, 1, 0), spellID, false);
            }
        }
    }
    //start of combat
    creature.CastSpell(target,GetID("Spell", "minecraft-mod", "boss1flameshock1-spell2"),true);
    //start of timers
    creature.AddNamedTimer("event1", 3000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "boss1lightningbolt1-spell"),self,target,false);
    });
    creature.AddNamedTimer("event2", 5500, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "boss1flameshock1-spell2"),self,target,false);
    });
    creature.AddNamedTimer("event3", 14000, 1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "boss1chainlightning1-spell"),self,target,false);
    });
    creature.AddNamedTimer("event4", 20000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "boss1healingwave1-spell"),self,target,false);
    });
});

dungeonBoss1.InlineScripts.OnDeath((creature, killer) => {
    creature.RemoveTimer("event1");
    creature.RemoveTimer("event2");
    creature.RemoveTimer("event3");
    creature.RemoveTimer("event4");
});

dungeonBoss1.InlineScripts.OnReachedHome((creature) => {
    creature.RemoveTimer("event1");
    creature.RemoveTimer("event2");
    creature.RemoveTimer("event3");
    creature.RemoveTimer("event4");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Boss 2 : Warglow Firehammer             23963 Orc in Warrior t3
Type : Tauren Warrior
Health : 32000
Abilities : 
    0. Start combat with a charge to nearest player.
    1. Mortal Strike - 450 damage + 25% reduced healing
    2. Destructive Slam - 2625 damage
    3. Bladestorm - Interruptable, 5 second cast time, 750 damage per second.
    4. Call Guards - 2 second cast time, summons 2 additional guards to join the fight
        a. Call Guards Spell 1 : Summons 2 Shaman Healers
        b. Call Guards Spell 2 : Summons 4 Damage Dealers
        c. Call Guards Spell 3 : Summons 2 Channelers - Both buff the boss by 10% increased damage every 5 seconds until killed
            1. Buff lasts for 20 seconds after channeler death, spell can be interrupted
    5. Last Stand : At 25% health, casts last stand to increase health by 200%, lasts indefinitely, basically makes health increase.
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export let GuardChainHeal = std.Spells.create(MODNAME,"guardchainheal1-spell",1064);
GuardChainHeal.Name.enGB.set("Rejuvenating Waters");
GuardChainHeal.Description.enGB.set("Heals the friendly target for $s1, then jumps to heal additional nearby targets.");
GuardChainHeal.Effects.get(0).PointsBase.set(2195);
GuardChainHeal.Effects.get(0).PointsDieSides.set(716);
GuardChainHeal.Effects.get(0).ChainTarget.set(10);
GuardChainHeal.CastTime.setSimple(5000);
GuardChainHeal.Range.setSimple(0, 100);

export let ShamanGuard1 = std.CreatureTemplates.create(MODNAME,"shamanguard1",25428);
ShamanGuard1.Name.enGB.set("Windspeaker Shaman");
ShamanGuard1.FactionTemplate.set(48);
ShamanGuard1.Level.set(20, 20);
ShamanGuard1.Rank.ELITE.set();
ShamanGuard1.DamageSchool.Normal.set();
ShamanGuard1.Stats.ArmorMod.set(15);
ShamanGuard1.Stats.DamageMod.set(3);
ShamanGuard1.Stats.HealthMod.set(4);
ShamanGuard1.Stats.ManaMod.set(15);
ShamanGuard1.Stats.ExperienceMod.set(10);
ShamanGuard1.UnitClass.PALADIN.set();
ShamanGuard1.InlineScripts.OnCreate((creature, cancel) => {
creature.Attack(creature.GetNearestPlayer(50, 1, 0), false);
});
ShamanGuard1.InlineScripts.OnJustEnteredCombat((creature, target) => {
    function attemptCast(spellID: number,self: TSCreature,target: TSUnit,force: boolean) {
        if (!self.IsCasting() || force) {
            if (target.IsPlayer()) {
                self.CastSpell(target, spellID, false);
            } else {
                self.CastSpell(self.GetNearestPlayer(50, 1, 0), spellID, false);
            }
        }
    }
    creature.AddNamedTimer("event1", 5000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "guardchainheal1-spell"),self,self,false);
    });
});
ShamanGuard1.InlineScripts.OnDeath((creature, killer) => {
    creature.RemoveTimer("event1");
});
ShamanGuard1.InlineScripts.OnReachedHome((creature) => {
    creature.RemoveTimer("event1");
});

export let Boss2Charge1 = std.Spells.create(MODNAME,"boss2charge1-spell",31994);
Boss2Charge1.Name.enGB.set("Lumbering Charge");
Boss2Charge1.Description.enGB.set("Charges an enemy, inflicting normal damage plus $s3.");
Boss2Charge1.Range.setSimple(0, 100);

export let Boss2Mortal1 = std.Spells.create( MODNAME,"boss2mortal1-spell",48137);
Boss2Mortal1.Name.enGB.set("Vicious Wound");
Boss2Mortal1.Description.enGB.set("Inflicts $s1% weapon damage to an enemy and leaves it wounded");
Boss2Mortal1.AuraDescription.enGB.set("Healing effects reduced by $s2%.");
Boss2Mortal1.Range.setSimple(0, 8);

export let Boss2DestructiveSlam1 = std.Spells.create(MODNAME,"boss2destructiveslam1-spell",25322);
Boss2DestructiveSlam1.Name.enGB.set("Destructive Slam");
Boss2DestructiveSlam1.Description.enGB.set("Inflicts normal damage plus $s1 to enemies in a cone in front of the caster, knocking them back.");
Boss2DestructiveSlam1.CastTime.setSimple(4000);
Boss2DestructiveSlam1.Attributes.IMPOSSIBLE_TO_DODGE_PARRY_BLOCK.set(1);
Boss2DestructiveSlam1.Attributes.CANT_BE_REFLECTED.set(1);
Boss2DestructiveSlam1.Attributes.UNAFFECTED_BY_INVULNERABILITY.set(1);
Boss2DestructiveSlam1.Attributes.UNAFFECTED_BY_SCHOOL_IMMUNE.set(1);
Boss2DestructiveSlam1.Attributes.UNAFFECTED_BY_SCHOOL_IMMUNITY.set(1);
Boss2DestructiveSlam1.Attributes.CANT_TARGET_SELF.set(1);
Boss2DestructiveSlam1.Attributes.ONLY_TARGET_PLAYERS.set(1);
Boss2DestructiveSlam1.InterruptFlags.clearAll();
Boss2DestructiveSlam1.AuraInterruptFlags.clearAll();

export let Boss2Bladestorm1 = std.Spells.create(MODNAME,"boss2bladestorm1-spell",46924);
Boss2Bladestorm1.Name.enGB.set("Blade Dancing");
Boss2Bladestorm1.AuraDescription.enGB.set("You cannot be stopped and perform a Whirlwind every $t1 sec.  No other abilities can be used.");
Boss2Bladestorm1.CastTime.setSimple(4000);
Boss2Bladestorm1.Power.PowerCostBase.set(0);
Boss2Bladestorm1.Power.PowerCostPerLevel.set(0);
Boss2Bladestorm1.Power.PowerCostPercent.set(0);

export let Boss2Summon1 = std.Spells.create(MODNAME,"boss2summon1-spell",66543);
Boss2Summon1.Name.enGB.set("Call for Aid!");
Boss2Summon1.Description.enGB.set("Calls 2 Windspeaker Shamans to join the fight.");
Boss2Summon1.Effects.get(0).MiscValueA.set(ShamanGuard1.ID);
Boss2Summon1.Effects.get(0).PointsBase.set(1);
Boss2Summon1.Effects.get(0).PointsDieSides.set(1);
Boss2Summon1.Duration.setSimple(60000);

export let Boss2LastStand1 = std.Spells.create(MODNAME,"boss2laststand1-spell",12976);
Boss2LastStand1.Name.enGB.set("Enraged Triumph");
Boss2LastStand1.AuraDescription.enGB.set("Health increased by 30% of maximum.");
Boss2LastStand1.Effects.get(0).PointsBase.set(29);
Boss2LastStand1.Effects.get(0).PointsDieSides.set(1);
Boss2LastStand1.Effects.get(0).Aura.MOD_INCREASE_HEALTH_PERCENT.set();
Boss2LastStand1.Duration.setSimple(-1, 0, -1);

export let dungeonBoss2 = std.CreatureTemplates.create(MODNAME,"dungeonboss2",3276);
dungeonBoss2.Models.clearAll();
dungeonBoss2.Models.addIds(19521);
dungeonBoss2.Name.enGB.set("Warglow Firehammer");
dungeonBoss2.Scale.set(2);
dungeonBoss2.FactionTemplate.set(48);
dungeonBoss2.Level.set(23, 23);
dungeonBoss2.Rank.BOSS.set();
dungeonBoss2.UnitClass.WARRIOR.set();
dungeonBoss2.DamageSchool.Normal.set();
dungeonBoss2.Stats.ArmorMod.set(100);
dungeonBoss2.Stats.DamageMod.set(6);
dungeonBoss2.Stats.HealthMod.set(11);
dungeonBoss2.Stats.ManaMod.set(100);
dungeonBoss2.Stats.ExperienceMod.set(10);
export let dungeonBoss2Loot = dungeonBoss2.NormalLoot;

dungeonBoss2.InlineScripts.OnJustEnteredCombat((creature, target) => {
    function attemptCast(spellID: number,self: TSCreature,target: TSUnit,force: boolean) {
        if (!self.IsCasting() || force) {
            if (target.IsPlayer()) {
                self.CastSpell(target, spellID, false);
            } else {
                self.CastSpell(self.GetNearestPlayer(50, 1, 0), spellID, false);
            }
        }
    }
    //start of combat
    creature.CastSpell(target,GetID("Spell", "minecraft-mod", "boss2charge1-spell"),true);
    //start of timers
    creature.AddNamedTimer("event1", 5000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "boss2mortal1-spell"),self,target,false);
    });
    creature.AddNamedTimer("event2", 14000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(
            GetID("Spell", "minecraft-mod", "boss2destructiveslam1-spell"),self,target,false);
    });
    creature.AddNamedTimer("event3", 15000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "boss2charge1-spell"),self,target,false);
    });
    creature.AddNamedTimer("event3.1", 16000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "boss2bladestorm1-spell"),self,target,true);
    });

    creature.AddNamedTimer("event4", 20000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "boss2summon1-spell"),self,target,false);
    });
    creature.AddNamedTimer("event5", 60000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "boss2laststand1-spell"),self,target,false);
    });
});

dungeonBoss2.InlineScripts.OnDeath((creature, killer) => {
    creature.RemoveTimer("event1");
    creature.RemoveTimer("event2");
    creature.RemoveTimer("event3");
    creature.RemoveTimer("event3.1");
    creature.RemoveTimer("event4");
    creature.RemoveTimer("event5");
});

dungeonBoss2.InlineScripts.OnReachedHome((creature) => {
    creature.RemoveTimer("event1");
    creature.RemoveTimer("event2");
    creature.RemoveTimer("event3");
    creature.RemoveTimer("event3.1");
    creature.RemoveTimer("event4");
    creature.RemoveTimer("event5");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Boss 3 : Beloved Grong
Type : Earthborer
Health : 26750
Abilities : 
    1. Acid Wretch - interruptable, 2 second cast time, 300 damage + 100 per second for 10 seconds
    2. Venom Pool - interruptable, 3 second cast time, 250 damage + 300 per second when standing in pool, lasts until boss dies
    3. Rumble - interruptable, channeled for 8 seconds, 750 damage to all players every second for 8 seconds
    4. Melt Armor - 75 damage + reduced armor by 10%, stacks to 5
    5. Disorienting Shriek - Disorient all enemies for 6 seconds, 5 second cast time, can only be LoSed
    6. Acridity - Every 15 seconds during the fight, Grong spawns egg sacs that increase his damage and haste by 5% stacking.
    7. Potent Odor - Attacking Grong starts a potent odor that damages all enemies in 100 yard range for 500 damage every 10 seconds.
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export let HasteAuraEgg = std.Spells.create(MODNAME,"hasteauraegg-spell",19506);
HasteAuraEgg.Name.enGB.set("Acrid Haste");
HasteAuraEgg.AuraDescription.enGB.set("Increases haste by $s1%.");
HasteAuraEgg.Effects.get(0).PointsBase.set(4);
HasteAuraEgg.Effects.get(0).PointsDieSides.set(1);
HasteAuraEgg.Effects.get(0).Aura.MOD_MELEE_HASTE.set();
HasteAuraEgg.Effects.get(0).Radius.setSimple(100);
HasteAuraEgg.Effects.get(1).PointsBase.set(4);
HasteAuraEgg.Effects.get(1).PointsDieSides.set(1);
HasteAuraEgg.Effects.get(1).Aura.MOD_MELEE_HASTE.set();
HasteAuraEgg.Effects.get(1).Radius.setSimple(100);
HasteAuraEgg.Stacks.set(99);

export let GronglingEgg = std.CreatureTemplates.create(MODNAME,"gronglingegg",30268);
GronglingEgg.Name.enGB.set("Grongling Egg");
GronglingEgg.FactionTemplate.set(48);
GronglingEgg.Level.set(20, 20);
GronglingEgg.Rank.ELITE.set();
GronglingEgg.DamageSchool.Normal.set();
GronglingEgg.Stats.ArmorMod.set(0);
GronglingEgg.Stats.DamageMod.set(0);
GronglingEgg.Stats.HealthMod.set(4);
GronglingEgg.Stats.ManaMod.set(0);
GronglingEgg.Stats.ExperienceMod.set(0);
GronglingEgg.UnitClass.PALADIN.set();

GronglingEgg.InlineScripts.OnCreate((creature, cancel) => {
    creature.Attack(creature.GetNearestPlayer(50, 1, 0), false);
});
GronglingEgg.InlineScripts.OnJustEnteredCombat((creature, target) => {
    function attemptCast(
        spellID: number,
        self: TSCreature,
        target: TSUnit,
        force: boolean
    ) {
        if (!self.IsCasting() || force) {
            if (target.IsPlayer()) {
                self.CastSpell(target, spellID, false);
            } else {
                self.CastSpell(self.GetNearestPlayer(50, 1, 0), spellID, false);
            }
        }
    }
    attemptCast(42716, creature, creature, false);
    creature.AddNamedTimer("event1", 1000, 1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        attemptCast(GetID("Spell", "minecraft-mod", "hasteauraegg-spell"),self,target,false);
    });
});
GronglingEgg.InlineScripts.OnDeath((creature, killer) => {
    creature.RemoveTimer("event1");
});
GronglingEgg.InlineScripts.OnReachedHome((creature) => {
    creature.RemoveTimer("event1");
});

export let Boss3AcidWretch1 = std.Spells.create(MODNAME,"boss3acidwretch1-spell",12533);
Boss3AcidWretch1.Name.enGB.set("Acid Wretch");
Boss3AcidWretch1.Description.enGB.set("Inflicts $s2 Nature damage and an additional $s1 damage every $t1 sec. to enemies in a cone in front of the caster. Lasts $d.");
Boss3AcidWretch1.AuraDescription.enGB.set("$s1 Nature damage inflicted every $t1 sec.");
Boss3AcidWretch1.Effects.get(0).PointsBase.set(99);
Boss3AcidWretch1.Effects.get(0).PointsDieSides.set(1);
Boss3AcidWretch1.Effects.get(0).ChainAmplitude.set(1000);
Boss3AcidWretch1.Effects.get(1).PointsBase.set(299);
Boss3AcidWretch1.Effects.get(1).PointsDieSides.set(1);
Boss3AcidWretch1.Duration.setSimple(10000, 0, 10000);
Boss3AcidWretch1.CastTime.setSimple(2000);

export let Boss3VenomPool1 = std.Spells.create(MODNAME,"boss3venompool1-spell",53400);
Boss3VenomPool1.Name.enGB.set("Venom Cloud");
Boss3VenomPool1.Description.enGB.set("Sprays acid at the location of the target, creating a cloud that deals $s1 Nature damage per second to enemies inside of it. Lasts $d.");
Boss3VenomPool1.AuraDescription.enGB.set("Deals $s1 Nature damage per second.");
Boss3VenomPool1.Duration.setSimple(-1, 0, -1);
Boss3VenomPool1.CastTime.setSimple(3000);

export let Boss3Rumble1 = std.Spells.create(MODNAME,"boss3rumble1-spell",62776);
Boss3Rumble1.Name.enGB.set("Rumble");
Boss3Rumble1.Description.enGB.set("Deals $s1% damage every $t1 sec for $d. Nearby enemies are also dazed for the duration.");
Boss3Rumble1.AuraDescription.enGB.set("Dealing damage to nearby enemies.");

export let Boss3MeltArmor1 = std.Spells.create(MODNAME,"boss3meltarmor1-spell",13013);
Boss3MeltArmor1.Name.enGB.set("Melt Armor");
Boss3MeltArmor1.Description.enGB.set("Reduces an enemy's armor by $s1% for $d.");
Boss3MeltArmor1.AuraDescription.enGB.set("Armor reduced by $s1%.");
Boss3MeltArmor1.Effects.get(0).PointsBase.set(-11);
Boss3MeltArmor1.Effects.get(0).PointsDieSides.set(1);
Boss3MeltArmor1.Duration.setSimple(15000);
Boss3MeltArmor1.Stacks.set(5);
Boss3MeltArmor1.Icon.setPath("INV_Chest_Plate04");

export let Boss3PotentOdor1 = std.Spells.create(MODNAME,"boss3potentodor1-spell",17467);
Boss3PotentOdor1.Name.enGB.set("Potent Odor");
Boss3PotentOdor1.Description.enGB.set("Causes the caster to automatically inflict $17466s1 Shadow damage every $t1 sec. to nearby enemies.");
Boss3PotentOdor1.AuraDescription.enGB.set("Automatically inflicting $17466s1 Shadow damage every $t1 sec. to nearby enemies.");

export let Boss3Acridity1 = std.Spells.create(MODNAME,"boss3acridity1-spell",66543);
Boss3Acridity1.Name.enGB.set("Acridity");
Boss3Acridity1.Description.enGB.set("Summons Egg Sacs to Increase Boss Haste by 5%.");
Boss3Acridity1.Effects.get(0).MiscValueA.set(GronglingEgg.ID);
Boss3Acridity1.Effects.get(0).PointsBase.set(1);
Boss3Acridity1.Effects.get(0).PointsDieSides.set(1);

export let dungeonBoss3 = std.CreatureTemplates.create(MODNAME,"dungeonboss3",3276);
dungeonBoss3.Models.clearAll();
dungeonBoss3.Models.addIds(19521);
dungeonBoss3.Name.enGB.set("Beloved Grong");
dungeonBoss3.Scale.set(2);
dungeonBoss3.FactionTemplate.set(48);
dungeonBoss3.Level.set(23, 23);
dungeonBoss3.Rank.BOSS.set();
dungeonBoss3.UnitClass.WARRIOR.set();
dungeonBoss3.DamageSchool.Normal.set();
dungeonBoss3.Stats.ArmorMod.set(100);
dungeonBoss3.Stats.DamageMod.set(6);
dungeonBoss3.Stats.HealthMod.set(18);
dungeonBoss3.Stats.ManaMod.set(100);
dungeonBoss3.Stats.ExperienceMod.set(10);

export let dungeonBoss3Loot = dungeonBoss3.NormalLoot;

dungeonBoss3.InlineScripts.OnJustEnteredCombat((creature, target) => {
    function attemptCast(spellID: number,self: TSCreature,target: TSUnit,force: boolean) {
        if (!self.IsCasting() || force) {
            if (target.IsPlayer()) {
                self.CastSpell(target, spellID, false);
            } else {
                self.CastSpell(self.GetNearestPlayer(50, 1, 0), spellID, false);
            }
        }
    }

    function getrandomInt(max: uint32): uint32 {
        return Math.floor(Math.random() * max);
    }
    attemptCast(GetID("Spell", "minecraft-mod", "boss3potentodor1-spell"),creature,creature,false);
    creature.AddNamedTimer("combatLoop", 5000, -1, (owner, timer) => {
        let self = owner.ToCreature();
        let target = self.GetVictim();
        let spells: TSArray<uint32> = <TSArray<uint32>>[
            GetID("Spell", "minecraft-mod", "boss3acidwretch1-spell"),
            GetID("Spell", "minecraft-mod", "boss3venompool1-spell"),
            GetID("Spell", "minecraft-mod", "boss3meltarmor1-spell"),
            GetID("Spell", "minecraft-mod", "boss3rumble1-spell"),
            GetID("Spell", "minecraft-mod", "boss3acridity1-spell"),
        ];
        let spellMax = 0;
        if (self.HealthAbovePct(90)) {
            spellMax = 1;
        } else if (self.HealthAbovePct(70)) {
            spellMax = 2;
        } else if (self.HealthAbovePct(40)) {
            spellMax = 3;
        } else if (self.HealthAbovePct(25)) {
            spellMax = 4;
        } else {
            spellMax = 5;
        }
        let spellChoice = getrandomInt(spellMax);
        attemptCast(spells[spellChoice], self, target, false);
    });
});

dungeonBoss3.InlineScripts.OnDeath((creature, killer) => {
    creature.RemoveTimer("combatLoop");
});

dungeonBoss3.InlineScripts.OnReachedHome((creature) => {
    creature.RemoveTimer("combatLoop");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Boss 4 : Fenra Dragonborne
Type : Duo Warrior + Dragon
Health : 42570
Abilities : 
    1. Massive Cleave : Cone in front of boss, 15 yards out, deals 2500 damage, must be avoided, 4 second cast time.
    2. Bonecrack : AoE all targets, no initial damage, but increases damage taken by 5% for 20 seconds (reapply every 15)
    3. Shockwave : Stun cone, 15 yards out, 250 damage, 2 second cast time
    4. Charge : target furthest enemy away and charge them, afterwards, cast bladestorm
Flamewing
Health : 18320
Abilities : 
    1. Flame Wave : Hits all targets with 500 fire damage
    2. Flame Breath : Hits all targets in cone, 15 yards out, 1500 damage, 5 second cast time, must avoid
    3. Burning Rage : Upon death, enrages Fenra Dragonborne increasing her damage dealt by 35%
    4. Summon Hatchlings : summons 6 hatchling eggs around flamewing
        a. Emerge - eggs cast emerge over 10 seconds, if the hatchling emerges, casts Awoken Roar + Spawn Whelp
        b. Awoken Roar - applies aura to spawned whelp that periodically pulses 250 damage to all enemies every second
        c. Sacrifice - 10 second cast time, upon spawn, whelp will cast sacrifice and if successful, buffs Flamewing + 10% damage.
(Players have 2 chances to kill hatchlings, one as eggs, and one as whelps, otherwise boss = buffed)
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Boss 5 : Magnar Crucio
Type : Undead Mage
Health : 74560
Abilities : 
    1. Magnetize - 5 second cast time, uninterruptable, pulls all players to magnar and deals 1250 damage.
        - Will cast Danger Zone 2 seconds after Magnetize
    2. Energize - 3 second cast time, deals 275 damage + increases nature damage taken by 1% (lasts 15 seconds)
    3. Danger Zone - 10 second cast time, only target players, uninterruptable, deals 5000 damage to all in 20 yards.
        - Guarantee cast after Magnetize
    4. Fulmination - target random player, increase their damage dealt by 25% and increase the damage Magnar deals by 25%
    5. Overload - 5 second cast time, uninterruptable, hit all players for 1500 damage
    6. Execution - 10 second cast time, interruptable, deals 10,000 damage to all players
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let Boss5Magnetize1 = std.Spells.create(MODNAME,"boss5magnetize1-spell",31705);
Boss5Magnetize1.Name.enGB.set("Magnetize");
Boss5Magnetize1.AuraDescription.enGB.set("Teleports all nearby enemy targets to the caster.");
Boss5Magnetize1.CastTime.setSimple(1000);
Boss5Magnetize1.Range.setSimple(0, 100);
Boss5Magnetize1.Effects.get(0).ChainTarget.set(10);
Boss5Magnetize1.Attributes.IMPOSSIBLE_TO_DODGE_PARRY_BLOCK.set(1);
Boss5Magnetize1.Attributes.CANT_BE_REFLECTED.set(1);
Boss5Magnetize1.Attributes.UNAFFECTED_BY_INVULNERABILITY.set(1);
Boss5Magnetize1.Attributes.UNAFFECTED_BY_SCHOOL_IMMUNE.set(1);
Boss5Magnetize1.Attributes.UNAFFECTED_BY_SCHOOL_IMMUNITY.set(1);
Boss5Magnetize1.Attributes.CANT_TARGET_SELF.set(1);
Boss5Magnetize1.Attributes.ONLY_TARGET_PLAYERS.set(1);
Boss5Magnetize1.InterruptFlags.clearAll();
Boss5Magnetize1.AuraInterruptFlags.clearAll();

export let Boss5Energize1 = std.Spells.create(MODNAME,"boss5energize1-spell",8050);
Boss5Energize1.Name.enGB.set("Energized");
Boss5Energize1.Visual.set(11416);
Boss5Energize1.Description.enGB.set("Electrocute your target dealing 375 damage immediately and increasing the damage they take by 1%. Lasts $d.");
Boss5Energize1.AuraDescription.enGB.set("Increased damage taken by $s2%.");
Boss5Energize1.Effects.get(0).PointsBase.set(274);
Boss5Energize1.Effects.get(0).PointsDieSides.set(1);
Boss5Energize1.Effects.get(0).PointsPerLevel.set(0);
Boss5Energize1.Effects.get(1).Type.APPLY_AURA.set();
Boss5Energize1.Effects.get(1).PointsBase.set(4);
Boss5Energize1.Effects.get(1).PointsDieSides.set(1);
Boss5Energize1.Effects.get(1).Aura.MOD_DAMAGE_PERCENT_TAKEN.set();
Boss5Energize1.Effects.get(1).ChainAmplitude.set(0);
Boss5Energize1.CastTime.setSimple(3000);
Boss5Energize1.Duration.setSimple(15000);
Boss5Energize1.Stacks.set(99);

export let Boss5Nuke1 = std.Spells.create(MODNAME, "boss5nuke1-spell", 64487);
Boss5Nuke1.Name.enGB.set("Danger Zone!!!");
Boss5Nuke1.Description.enGB.set("Inflicts $s1 Arcane damage to enemies.");
Boss5Nuke1.Effects.get(0).Radius.setSimple(15)
Boss5Nuke1.Effects.get(0).PointsBase.set(3999);
Boss5Nuke1.Effects.get(0).PointsDieSides.set(1);
Boss5Nuke1.Effects.get(0).PointsPerLevel.set(0);
Boss5Nuke1.CastTime.setSimple(6000);
Boss5Nuke1.Attributes.IMPOSSIBLE_TO_DODGE_PARRY_BLOCK.set(1);
Boss5Nuke1.Attributes.CANT_BE_REFLECTED.set(1);
Boss5Nuke1.Attributes.UNAFFECTED_BY_INVULNERABILITY.set(1);
Boss5Nuke1.Attributes.UNAFFECTED_BY_SCHOOL_IMMUNE.set(1);
Boss5Nuke1.Attributes.UNAFFECTED_BY_SCHOOL_IMMUNITY.set(1);
Boss5Nuke1.Attributes.CANT_TARGET_SELF.set(1);
Boss5Nuke1.Attributes.ONLY_TARGET_PLAYERS.set(1);
Boss5Nuke1.InterruptFlags.clearAll();
Boss5Nuke1.AuraInterruptFlags.clearAll();

// export let Boss5Fulmination1PlayerSpell = std.Spells.create(MODNAME, 'boss5fulmination1playerspell-spell', 71188)
// Boss5Fulmination1PlayerSpell.Name.enGB.set('Fulmination')
// Boss5Fulmination1PlayerSpell.Description.enGB.set('Damage done increased by $s1%.')
// Boss5Fulmination1PlayerSpell.AuraDescription.enGB.set('Damage done increased by $s1%. Taking $s2 Arcane Damage every 2 seconds.')
// Boss5Fulmination1PlayerSpell.Effects.get(0).PointsBase.set(24)
// Boss5Fulmination1PlayerSpell.Effects.get(0).PointsDieSides.set(1)
// Boss5Fulmination1PlayerSpell.Effects.get(1).Type.APPLY_AURA.set()
// Boss5Fulmination1PlayerSpell.Effects.get(1).PointsBase.set(124)
// Boss5Fulmination1PlayerSpell.Effects.get(1).PointsDieSides.set(1)
// Boss5Fulmination1PlayerSpell.Effects.get(1).Aura.PERIODIC_DAMAGE.set()
// Boss5Fulmination1PlayerSpell.Effects.get(1).ImplicitTargetA.UNIT_CASTER.set()
// Boss5Fulmination1PlayerSpell.Effects.get(1).ChainAmplitude.set(2000)
// Boss5Fulmination1PlayerSpell.Attributes.IS_NEGATIVE.set(1)
// Boss5Fulmination1PlayerSpell.Duration.setSimple(15000)

export let Boss5Fulmination1 = std.Spells.create(MODNAME,"boss5fulmination1-spell",71188);
Boss5Fulmination1.Name.enGB.set("Fulmination");
Boss5Fulmination1.Description.enGB.set("Damage done increased by $s1%.");
Boss5Fulmination1.AuraDescription.enGB.set("Damage done increased by $s1%.");
Boss5Fulmination1.Effects.get(0).PointsBase.set(24);
Boss5Fulmination1.Effects.get(0).PointsDieSides.set(1);
// Boss5Fulmination1.Effects.get(1).Type.APPLY_AURA.set()
// Boss5Fulmination1.Effects.get(1).PointsBase.set(24)
// Boss5Fulmination1.Effects.get(1).PointsDieSides.set(1)
// Boss5Fulmination1.Effects.get(1).Aura.MOD_DAMAGE_PERCENT_DONE.set()
// Boss5Fulmination1.Effects.get(1).ImplicitTargetA.UNIT_NEARBY_ENEMY.set()
// Boss5Fulmination1.Effects.get(1).Radius.set(100)
// Boss5Fulmination1.Effects.get(2).Type.NULL.set()
Boss5Fulmination1.Duration.setSimple(15000);

export let Boss5Overload1 = std.Spells.create(MODNAME,"boss5overload1-spell",64487);
Boss5Overload1.Name.enGB.set("Overload");
Boss5Overload1.Visual.set(14798);
Boss5Overload1.Description.enGB.set("Inflicts $s1 Arcane damage to all enemies.");
Boss5Overload1.Effects.get(0).PointsBase.set(1499);
Boss5Overload1.Effects.get(0).PointsDieSides.set(1);
Boss5Overload1.Effects.get(0).PointsPerLevel.set(0);
Boss5Overload1.Effects.get(0).Radius.setSimple(100);
Boss5Overload1.Effects.get(1).Type.NULL.set();
Boss5Overload1.Effects.get(2).Type.NULL.set();
Boss5Overload1.CastTime.setSimple(5000);
Boss5Overload1.Attributes.IMPOSSIBLE_TO_DODGE_PARRY_BLOCK.set(1);
Boss5Overload1.Attributes.CANT_BE_REFLECTED.set(1);
Boss5Overload1.Attributes.UNAFFECTED_BY_INVULNERABILITY.set(1);
Boss5Overload1.Attributes.UNAFFECTED_BY_SCHOOL_IMMUNE.set(1);
Boss5Overload1.Attributes.UNAFFECTED_BY_SCHOOL_IMMUNITY.set(1);
Boss5Overload1.Attributes.CANT_TARGET_SELF.set(1);
Boss5Overload1.Attributes.ONLY_TARGET_PLAYERS.set(1);
Boss5Overload1.InterruptFlags.clearAll();
Boss5Overload1.AuraInterruptFlags.clearAll();

export let Boss5Execution1 = std.Spells.create(MODNAME,"boss5execution1-spell",64487);
Boss5Execution1.Name.enGB.set("Execution");
Boss5Overload1.Visual.set(14798);
Boss5Execution1.Description.enGB.set("Inflicts $s1 Arcane damage to all enemies.");
Boss5Execution1.Effects.get(0).PointsBase.set(9999);
Boss5Execution1.Effects.get(0).PointsDieSides.set(1);
Boss5Execution1.Effects.get(0).PointsPerLevel.set(0);
Boss5Execution1.Effects.get(0).Radius.setSimple(100);
Boss5Execution1.CastTime.setSimple(10000);

export let dungeonBoss5 = std.CreatureTemplates.create(MODNAME,"dungeonboss5",3276);
dungeonBoss5.Models.clearAll();
dungeonBoss5.Models.addIds(22208);
dungeonBoss5.Name.enGB.set("Magnar Crucio");
dungeonBoss5.Scale.set(2);
dungeonBoss5.FactionTemplate.set(48);
dungeonBoss5.Level.set(26, 26);
dungeonBoss5.Rank.BOSS.set();
dungeonBoss5.UnitClass.MAGE.set();
dungeonBoss5.DamageSchool.Normal.set();
dungeonBoss5.Stats.ArmorMod.set(100);
dungeonBoss5.Stats.DamageMod.set(6);
dungeonBoss5.Stats.HealthMod.set(20);
dungeonBoss5.Stats.ManaMod.set(100);
dungeonBoss5.Stats.ExperienceMod.set(10);
export let dungeonBoss5Loot = dungeonBoss5.NormalLoot;

// dungeonBoss5.InlineScripts.OnHitBySpell((creature,caster,spellInfo)=>{
//     if(spellInfo.ID == braiserBurn){//remember GetID for braiserBurn
//         creature.SetHealth(creature.GetMaxHealth()*.9)
//     }
// })

dungeonBoss5.InlineScripts.OnJustEnteredCombat((creature, target) => {
    function attemptCast(spellID: number,self: TSUnit,target: TSUnit,force: boolean
    ): boolean {
        if (!self.IsCasting() || force) {
            if (target.IsPlayer()) {
                self.CastSpell(target, spellID, false);
            } else {
                self.CastSpell(self.GetNearestPlayer(50, 1, 0), spellID, false);
            }
            return true;
        } else {
            return false;
        }
    }
    //start of combat
    creature.CastSpell(target,GetID("Spell", "minecraft-mod", "boss5energize1-spell"),true);
    //start of timers
    creature.AddNamedTimer("event1", 7000, -1, (owner, timer) => {
        let self = owner.ToUnit();
        attemptCast(GetID("Spell", "minecraft-mod", "boss5energize1-spell"),owner.ToCreature(),self.GetVictim(),false);
    });
    creature.AddNamedTimer("event2", 12000, -1, (owner, timer) => {
        let self = owner.ToUnit();
        attemptCast(GetID("Spell", "minecraft-mod", "boss5fulmination1-spell"),self,self.GetVictim(),false);
    });
    creature.AddNamedTimer("event3", 15000, -1, (owner, timer) => {
        let self = owner.ToUnit();
        if (
            attemptCast(GetID("Spell", "minecraft-mod", "boss5magnetize1-spell"),self,self.GetVictim(),false)
        ) {
            self.SetBool("didCastMagnetize", true);
        }
    });
    creature.AddNamedTimer("event3.1", 16000, -1, (owner, timer) => {
        let self = owner.ToUnit();
        if (self.GetBool("didCastMagnetize", false)) {
            attemptCast(GetID("Spell", "minecraft-mod", "boss5nuke1-spell"),self,self.GetVictim(),true);
        }
        self.SetBool("didCastMagnetize", false);
    });
    creature.AddNamedTimer("event4", 38000, -1, (owner, timer) => {
        let self = owner.ToUnit();
        attemptCast(GetID("Spell", "minecraft-mod", "boss5execution1-spell"),self,self.GetVictim(),true);
    });
});

dungeonBoss5.InlineScripts.OnDeath((creature, killer) => {
    creature.RemoveTimer("event1");
    creature.RemoveTimer("event2");
    creature.RemoveTimer("event3");
    creature.RemoveTimer("event3.1");
    creature.RemoveTimer("event4");
});

dungeonBoss5.InlineScripts.OnReachedHome((creature) => {
    creature.RemoveTimer("event1");
    creature.RemoveTimer("event2");
    creature.RemoveTimer("event3");
    creature.RemoveTimer("event3.1");
    creature.RemoveTimer("event4");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Boss 6 : Drega
Type : Paladin
Health : 65923
Abilities :
    1. Divine Storm : hits all targets within 10 yards, 3 second cast time, 2000 damage
    2. Blade of Light : Hits nearest target 2500 damage
    3. Lay on Hands : 6 second cast time, interruptable, full heal
    4. Wake of Ashes : Hits all players cone in front, 50 yards, 1500 damage instant
    5. Mass Repentence : repent all players in a 30 yard radius, lasts 6 seconds, uninterruptable, 8 second cast time
    6. Release Burdens : Summon 4 pools, 7 second cast time
        a. 2 Light Pool : periodically heals players for 500 damage every second for 15 seconds, damage dealt reduced by 25%
        b. 2 Dark Pool : increases damage dealt by 25% ; periodically takes 500 damage per second for 15 seconds
            1. Light and Dark buffs can not co-exist, if you get both light and dark, you get "Insanity" dealing 2500 damage per second
                (Spawn 2 creatures with different light beams, do collision detections)
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Formation 1 : Warlock + Warrior + Warrior + Rogue
    Warlock : Pet + Shadowbolt Volley + Chaos Bolt
    Warrior : Charge + Rend
    Rogue   : Stealthed, Ambush + Sinister Strike
Formation 2 : Shaman + Warrior + Rogue + Rogue
    Shaman  : Lightning Bolt + Chain Lightning + Chain Heal
    Warrior : Charge + Whirlwind + Cleave
    Rogue   : Stealthed, Garrote + Sinister Strike
Formation 3 : Mage + Mage + Shaman
    Mage    : Frostbolt + Frost Nova + Living Bomb
    Shaman  : Chain Heal, Healing Wave + Riptide
Formation 4 : Paladin + Shaman
    Paladin : Avenger's Shield, Consecration
    Shaman  : Healing Wave + Frost Shock
*/
