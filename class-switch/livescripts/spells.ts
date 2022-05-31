export const spellsList = CreateDictionary<uint32,TSArray<TSArray<float>>>({
    1:[
        [0 /*Warrior*/],
        [100, 78, 3127, 6673, 750, 674, 9116, 107, 2457], // Charge (1), Heroic Strike (1), Parry, Battle Shout (1), Plate Mail, Dual Wield, Shield, Block, Battle Stance (to ensure its there)
        [772], //  Rend (1)
        [6343, 34428], //Thunderclap (1), Victory Rush
        [284], // Heroic Strike(2)
        [355, 71, 6546], // Taunt, Defensive Stance, Rend(2)
        [5242, 12697], // Battle Shout(2), Improved Charge (talent 2/2)
        [6572], // Revenge(1)
        [285, 2565], // Heroic Strike(3), Shield Block
        [8198], // Thunder Clap(2)
        [6547, 845, 23881, 12678], // Rend(3), Cleave(1), Bloodthirst, Stance Mastery
        [6192], // Battle Shout(3)
        [1608, 5308, 6574], // Heroic Strike(4), Execute(1), Revenge(2)
        [72], // Shield Bash
        [6178, 8204, 871], // Charge (2), Thunderclap(3), Shield Wall
        [6548, 2458, 7369], // Rend(4), Berserker Stance, Cleave(2)
        [11564, 11549, 20658], // Heroic Strike(5), Battle Shout(4), Execute(2)
        [7379], // Revenge(3)
        [1680], // Whirlwind
        [8205], // Thunderclap(4)
        [11565, 11572, 20660, 12294, 23922], // Heroic Strike(6), Rend(5), Execute(3), Cleave(3), Mortal Strike(1), Shield Slam(1)
    ],
    2:[
        [0 /*Paladin*/],
        [3127, 9116, 107, 635, 465, 20271, 21084], // Parry, Block, Shield, Holy Light(1), Devotion Aura(1), Seal of Righteousness, Judgement of Light
        [35395], // Crusader Strike
        [639, 53408], // Holy Light(2), Judgement of Wisdom
        [853], // Hammer of Justice (1)
        [10290, 20166], // Devotion Aura(2), Seal of Wisdom
        [7328], // Redemption(1)
        [647, 31789], // Holy Light(3),  Righteous Defense
        [25780, 7294], // Righteous Fury, Retribution Aura
        [31935, 20186], // Avenger's Shield, Judgement of Wisdom
        [643, 19750, 26573, 879], // Devotion Aura(3), Flash of Light(1), Consecration(1), Exorcism(1)
        [1026], // Holy Light(4)
        [5588, 10322], // Hammer of Justice(2), Redemption(2)
        [10298, 19939], // Retribution Aura(2), Flash of Light(2)
        [5614], // Exorcism(2)
        [1042, 10291, 20165, 20116], // Holy Light(5), Devotion Aura(4), Seal of Light, Consecration(2)
        [53385], // Divine Storm
        [19940], // Flash of Light(3)
        [10299, 5615], // Retribution Aura(3), Exorcism(3)
        [19941], // Flash of Light(4)
        [20922, 1032, 31884], // Consecration(3), Devotion Aura(5), Avenging Wrath
    ],
    3:[
        [0 /*Hunter*/],
        [3127, 8737, 1978, 3044, 982, 1515, 883, 136, 136, 5011, 264, 266], // Parry, Mail, Serpent Sting (1),  Arcane Shot (1),  Revive Pet, Tame Beast, Call Pet, Feed Pet, Mend Pet, crossbows, bows, guns
        [136, 13795, 674], // Immolation Trap (1)
        [34026, 13549, 56641, 14281], // Kill Command,  Serpent Sting (2),  Steady Shot (1),  Arcane Shot (2)
        [3111, 781, 5116], // Mend Pet (2),  Disengage,  Concussive Shot,
        [1499, 14302, 1510, 14282], // Freezing Trap, Immolation Trap (2),  Volley (1), Arcane Shot (3)
        [3661, 13550], // Mend Pet (3),  Serpent Sting (3),
        [14294, 14283], // Volley (2),  Arcane Shot (4)
        [3662, 13551], // Mend Pet (4),  Serpent Sting (4),
        [5384, 14284, 3045], // Feign Death, Arcane Shot (5),  Rapid Fire
        [13542, 674, 13552, 34120], // Mend Pet (5),  Dual Wield, Serpent Sting (5),  Steady Shot (2)
        [14295, 53351, 14285], // Volley (3),  Kill Shot (1),  Arcane Shot (6)
        [13543, 13553], // Mend Pet (6),  Serpent Sting (6),
        [14286, 1543], // Arcane Shot (7), Flare
        [13544, 27022, 19263], // Mend Pet (7),  Volley (4), Deterrence
        [13809, 2643, 13554, 14287], // Frost Trap,  Multi Shot (1), Serpent Sting (7),  Arcane Shot (8)
        [27046, 58431, 61005], // Mend Pet (8),  Volley (5), Kill Shot (2)
        [13555, 49051, 27019], // Serpent Sting (8), Steady Shot (3),  Arcane Shot (9)
        [48989, 49047, 25295], // Mend Pet (9),  Multi Shot (5-7), Serpent Sting (9),
        [58434, 49044], // Volley (6),  Arcane Shot (10)
        [48990, 49048, 49001, 61006, 49052, 49045], // Mend Pet (10), Multi Shot (8), Serpent Sting (10-12),  Kill Shot (3), Steady Shot (4),  Arcane Shot (11)
    ],
    4:[
        [0 /*Rogue*/],
        [1752, 2098, 5171, 703, 1784], // Sinister Strike (1), Eviscerate (1), Slice and Dice (1), Garrote (1),  Stealth
        [8676, 1943, 6760], // Ambush (1),  Rupture (1),  Eviscerate (2)
        [6761, 8631, 8724], // Eviscerate (3),  Garrote (2),  Ambush (2)
        [1833, 8639, 8632], // Cheap Shot,  Rupture (2),  Garrote (3)
        [408, 8623, 1760], // Kidney Shot (1), Eviscerate (4+5), Sinister Strike (5)
        [53, 26889], // Backstab (1),  Vanish (3)
        [3127], // Parry
        [5277, 2983], // Evasion (1), Sprint (1)
        [1860], // Safe Fall
        [27441, 2591, 57993], // Ambush (7),  Backstab (4), Envenom
        [51723, 31224], // Fan of Knives, Cloak of Shadows
        [26862], // Sinister Strike (10)
        [1842], // Disarm Trap
        [48691, 48671], // Ambush (10), Rupture (8)
        [11305], // Sprint (3)
        [1766, 8647], // Kick,  Expose Armor
        [2094, 51724], // Blind, Sap (4)
        [48638, 11281], // Sinister Strike (12),  Backstab (8)
        [48667], // Eviscerate (11)
        [48657], // Backstab (12)
    ],
    5:[
        [0 /*Priest*/],
        [17, 139, 589, 8092, 2944, 1243, 585], // Power Word Shield (1), Renew (1),  Shadow Word Pain (1), Mind Blast (1),  Devouring Plague (1), Power Word Fortitude(1), Smite (1)
        [2061, 14914, 2060, 2050, 591], // Flash Heal (1),  Holy Fire (1), Greater Heal (1), Lesser Heal (1), Smite (2)
        [598, 8122], // Smite (3), Psychic Scream (1)
        [600, 6075, 992, 19236], // Power Word Shield (3), Renew (3),  Shadow Word Pain (4), Desperate Prayer(1)
        [15237, 1004, 8104, 15473], // Holy Nova, Smite (5),  Mind Blast (4), Shadowform
        [3747, 15264, 32379], // Power Word Shield (4), Holy Fire (4),  Shadow Word Death (1)
        [19238, 19279], // Desperate Prayer (2),  Devouring Plague (5)
        [15431, 2006, 34861], // Holy Nova (2), Resurrection (1), Circle of Healing (1)
        [596, 25367], // Prayer of Healing (1), Shadow Word Pain (9)
        [10963, 10947, 48157], // Greater Heal (2),  Mind Blast (9), Shadow Word Death (3)
        [10898, 27800], // Power Word Shield (7), Holy Nova (5)
        [10927, 15261, 10933], // Renew (7), Holy Fire (8),  Smite (7)
        [48161, 48125], // Power Word Fort (8), Shadow Word Pain (12)
        [10960, 34433], // Prayer of Healing (3), Shadowfiend
        [10900, 27801], // Power Word Shield (9), Holy Nova (6)
        [34863, 48045], // Circle of Healing (2), Mind Sear
        [25364, 48158], // Smite (10),  Shadow Word Death (4)
        [25218, 33076], // Power Word Shield (12),  Prayer of Mending (1)
        [34866, 48068], // Circle of Healing (5), Renew (14)
        [48066, 64843], // Power Word Shield (14),  Divine Hymn
    ],
    6:[
        [0 /*Deathknight*/], //starts at level 10
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [0],
        [49576, 45477, 45462, 45902, 47541], // Death Grip, Icy Touch (1), Plague Strike (1),  Blood Strike (1), Death Coil (1)
        [45524, 49998, 49917, 49926, 49892], // Chains of Ice,  Death Strike (1),  Plague Strike (2),  Blood Strike (2), Death Coil (2)
        [48265, 48721, 43265], // Unholy Presence,  Blood Boil (1),  Death and Decay (1),
        [49927], // Blood Strike (3)
        [49936, 49918, 56222, 48263], // Death and Decay (2),  Plague Strike (3), Dark Command, Frost Presence
        [49939, 49893, 49928, 50842, 49020], // Blood Boil (2), Death Coil (3),  Blood Strike (4), Pestilence  Obliterate (1)
        [49940, 49919], // Blood Boil (3), Plague Strike (4)
        [49937, 46584, 48707, 49909], // Death and Decay (3) Raise Dead,  Anti-Magic Shell, Icy Touch (5)
        [49929, 49920, 51423], // Blood Strike (5), Plague Strike (5), Obliterate (2)
        [49938, 49941, 49894, 51424], // Death and Decay (4),  Blood Boil (4),  Death Coil (4), Obliterate (3)
        [49895, 49930, 49921, 51425, 45529, 47568], // Death Coil (5), Blood Strike (6),  Plague Strike (6),  Obliterate (4), Blood Tap,  Empower Rune Weapon
    ],
    7:[
        [0 /*Shaman*/],
        [8042, 8050, 8056, 403, 331, 8737], // Earth Shock (1),  Flame Shock (1),  Frost Shock (1),  Lightning Bolt (1), Healing Wave (1), Mail
        [915, 324, 8024, 8033, 8017], // Lightning Bolt (4), Lightning shield, Flametongue Weapon (1), Frostbrand Weapon (1),  Rockbiter Weapon (1)
        [943, 8058, 52127, 674, 8232], // Lightning Bolt (5), Frost Shock (2),  Water Shield, WIndfury Weapon (1)
        [8046, 8053, 8004, 913], // Earth Shock (4),  Flame Shock (3),  Lesser Healing Wave (1),  Healing Wave (4)
        [66843, 3599, 8075, 8512, 5675], // Call of Ancestors,  Searing Totem (1),  Strength of Earth (1),  Windfury Totem (1), Mana Spring Totem
        [421, 1064, 51730], // Chain Lightning (1),  Chain Heal (1), Earthliving Weapon (1)
        [10431, 16342], // Lightning Shield (6), Flametongue Weapon (6)
        [15208, 10395], // Lightning Bolt (10),  Healing Wave (8)
        [2860, 5394], // Chain Lightning (3),  Healing Stream Totem (1)
        [51505, 16355, 10413], // Lava Burst, Frostbrand Weapon (4),  Earth Shock (6)
        [2645, 20608, 49276, 25422], // Ghost Wolf, Reincarnation,  Lesser Healing Wave (9),  Chain Heal (4)
        [10473, 58704, 58643], // Frost Shock (4),  Searing Totem (10), Strength of Earth (8)
        [2894, 58785], // Fire Elemental Totem, Flametongue Weapon (8)
        [25449, 49233, 25396], // Lightning Bolt (12),  Flame Shock (9),  Healing Wave (12)
        [58796, 2008], // Frostbrand Weapon (9),  Ancestral Spirit (1)
        [49271, 61295, 55459], // Chain Lightning (8),  Riptide (1),  Chain Heal (7)
        [49238, 49236], // Lightning Bolt (14),  Frost Shock (7)
        [60043, 49231], // Lava Burst (2), Earth Shock (10)
        [51490, 974, 49273], // Thunderstorm (1), Earth Shield (1), Healing Wave 14
        [51514, 58804], // Hex,  Windfury Weapon (8)
    ],
    8:[
        [0 /*Mage*/],
        [5504, 587, 2136, 116, 133], // Conjure Water (1), Conjure Food (1), Fire Blast (1), Frostbolt (1), Fireball (1)
        [1463, 122, 5143], // Mana Shield, Frost Nova (1), Arcane Missles (1)
        [1953, 10, 31661], // Blink (1), Blizzard (1), Dragon's Breath (1)
        [2139, 1449], // Counterspell,  Arcane Explosion (1)
        [118, 8401, 8407], // Polymorph (1), Fireball (6), Frostbolt (6)
        [6127, 6129], // Conjure Water (4), Conjure Food (4)
        [1459, 8427], // Arcane Intelligence (1),  Blizzard (3)
        [30451, 27075, 8438], // Arcane Blast (1),  Arcane Missiles (9),  Arcane Explosion (3)
        [12051], // Evocation
        [66, 120], // Invisibility,  Cone of Cold (1)
        [27131, 44425], // Mana Shield (7), Arcane Barrage (1)
        [10201], // Arcane Explosion (5)
        [10150, 8492, 10181], // Fireball (10), Cone of Cold (2), Frostbolt (10)
        [10161, 10187], // Cone of Cold (5) Blizzard (6)
        [12826, 30455], // Polymorph (4), Ice Lance (1)
        [42921], // Arcane Explosion (10)
        [42897, 42931], // Arcane Blast (4),  Cone of Cold (8)
        [44780, 55342], // Arcane Barrage (2),  Mirror Image,
        [42833, 42940, 42842], // Fireball (16), Blizzard (9), Frostbolt (16)
        [43987, 44781, 44614, 42950], // Ritual of Refreshment, Arcane Barrage (3), Frostfire Bolt (1), Dragon's Breath (6)
    ],
    9:[
        [0 /*Warlock*/],
        [172, 688, 348, 980,603, 686], // Corruption (1),  Imp,  Immolate (1), CUrse of Agony (1), Curse of Doom (1), Shadow Bolt (1)
        [5782, 6201, 1120], // Drain Soul(1), Fear (1),  Healthstone
        [1454, 1014, 689], // Life Tap (1),  Curse of Agony, Drain Life (1)
        [5740, 705, 17877,30283],  // Rain of Fire,  Shadowbolt (3), Shadow Burn(1), Shadowfury (1)
        [7648, 1490, 18868], // Corruption (4),  Curse of Elements (1),  Shadowburn
        [11687, 11665], // Life Tap (4),  Immolate (5)
        [6217, 29722], // Curse of Agony (3),  Incinerate (1)
        [11729, 6353, 11660], // Healthstone (4), Soul Fire,  Shadowbolt (8)
        [11699], // Drain Life (5)
        [27217], // Drain Soul (5)
        [27218, 25309], // Curse of Agony (7),  Immolate (8)
        [693], // Soulstone,
        [47820, 47897], // Rain of Fire (7),  Shadowflame
        [27209], // Shadowbolt (11)
        [47809, 47811], // Shadowbolt (13), Immolate (11)
        [48018, 48020], // Demon Summon,  Demon Teleport,
        [47864], // Curse of Agony (9)
        [47847], // Shadowfury
        [47825], //Soul Fire (6)
        [47867], // Curse of Doom
    ],
    11:[
        [0 /*Druid*/],
        [8921, 774, 8936, 5176, 5185], // Moonfire (1),  Rejuvenation (1), Regrowth (1), Wrath (1), Healing Touch (1)
        [339, 5178, 2912, 5229, 768, 1082], // Entangling Roots (1),  Wrath (3),  Starfire (1), Enrage, Cat Form, Claw
        [770, 8925, 674], // Faerie Fire, Moonfire (3)
        [5211, 6808, 5487, 779, 1079, 6795, 33876, 33878], // Bash,  Maul, Bear Form,  Swipe (Bear), Rip (1),  Growl,  Mangle (1)
        [16914, 6780], // Hurricane (1), Wrath (6),
        [8928, 8950, 5188], // Moonfire (6),  Starfire (3), Healing Touch (4)
        [5215, 1822, 5217, 5221, 1850, 48438, 33763], // Prowl, Rake (1), Tigers Fury (1),  Shred (1),  Dash (1), Wild Growth
        [9912, 9835, 2090], // Wrath (8), Moonfire (10),  Rejuvenation (4)
        [5201, 9745, 8992, 9493], // Claw (3),  Maul (5), Shred (3),  Rip (3)
        [27012, 9750, 50769, 33983, 1824], // Hurricane (4), Regrowth (6), Revive (7), Rake (3), Mangle (3)
        [26986, 6787, 62078, 33987], // Starfire (8),  Ravage (2), Swipe Cat Mangle(3)
        [9005, 9634, 22827], // Pounce,  Dire Bear Form, Ferocious Bite (2)
        [20719, 9904, 26997, 9840], // Feline Grace,  Rake (4), Swipe Bear (6), Rejuvenation (9)
        [9827, 27001, 740], // Pounce (3),  Shred (6),  Tranquility
        [22570, 9896, 9888, 48451], // Maim (1),  Rip (6),  Healing Touch (9),  Lifebloom (1)
        [48463, 24248, 25299, 48566, 48564], // Moonfire (14), Ferocious Bite (6), Rejuvenation (11),  Mangle (5)
        [48461, 48574, 48443], // Wrath (12),  Rake (7), Regrowth (12)
        [48465, 50464], // Starfire (10), Nourish (1)
        [53308, 49800], // Entangling Roots (8),  Rip (9)
        [48568, 48572, 48579, 53251, 20484, 48447], // Lacerate (3),  Shred (9),  Ravage (7), Wild Growth (3),  Rebirth (7),  Tranquility (7)
    ],
})
