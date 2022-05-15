export const emptyQuality = CreateDictionary<uint32, TSDictionary<uint32, TSDictionary<uint32, TSArray<uint32>>>>({
    2: CreateDictionary<uint32, TSDictionary<uint32, TSArray<uint32>>>({
        13: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        15: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        17: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        26: CreateDictionary<uint32, TSArray<uint32>>({
        }),
    }),
    4: CreateDictionary<uint32, TSDictionary<uint32, TSArray<uint32>>>({
        1: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        2: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        3: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        5: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        6: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        7: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        8: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        9: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        10: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        11: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        12: CreateDictionary<uint32, TSArray<uint32>>({
        }),
        16: CreateDictionary<uint32, TSArray<uint32>>({
        }),
    })
})

export const itemClassInfo: TSArray<TSArray<TSArray<float>>> = [//class,subclass,invType,material,sheath,statMult
    [//ARMOR
        //cloth
        [4, 1, 1, 7, 0, 0.8125],//head
        [4, 1, 3, 7, 0, 0.75],//shoulder
        [4, 1, 5, 7, 0, 1],//chest
        [4, 1, 6, 7, 0, 0.5625],//waist
        [4, 1, 7, 7, 0, 0.875],//legs
        [4, 1, 8, 7, 0, 0.6875],//boots
        [4, 1, 9, 7, 0, 0.4375],//wrist
        [4, 1, 10, 7, 0, 0.625],//hands
        //leather
        [4, 2, 1, 8, 0, 0.8125],//head
        [4, 2, 3, 8, 0, 0.75],//shoulder
        [4, 2, 5, 8, 0, 1],//chest
        [4, 2, 6, 8, 0, 0.5625],//waist
        [4, 2, 7, 8, 0, 0.875],//legs
        [4, 2, 8, 8, 0, 0.6875],//boots
        [4, 2, 9, 8, 0, 0.4375],//wrist
        [4, 2, 10, 8, 0, 0.625],//hands
        //mail
        [4, 3, 1, 1, 0, 0.8125],//head
        [4, 3, 3, 1, 0, 0.75],//shoulder
        [4, 3, 5, 1, 0, 1],//chest
        [4, 3, 6, 1, 0, 0.5625],//waist
        [4, 3, 7, 1, 0, 0.875],//legs
        [4, 3, 8, 1, 0, 0.6875],//boots
        [4, 3, 9, 1, 0, 0.4375],//wrist
        [4, 3, 10, 1, 0, 0.625],//hands
        //extras
        [4, 0, 2, 5, 0, 0.5],//neck
        [4, 0, 11, 4, 0, 0.5],//ring
        [4, 0, 12, 4, 0, 0.5],//trinket
        [4, 1, 16, 7, 0, 0.48],//cloak
    ],
    [//WEAPONS
        [2, 0, 13, 1, 3, 0.6],//1h axe
        [2, 1, 17, 1, 1, 1],//2h axe
        [2, 2, 15, 2, 1, 0.8],//bow
        [2, 3, 26, 2, 1, 0.8],//gun
        [2, 4, 13, 1, 3, 0.6],//1h mace
        [2, 5, 17, 1, 1, 1],//2h mace
        [2, 6, 17, 1, 1, 1],//polearm
        [2, 7, 13, 1, 3, 0.6],//1h sword
        [2, 8, 17, 1, 1, 1],//2h sword
        [2, 10, 17, 2, 2, 1],//staff
        [2, 13, 13, 1, 3, 0.6],//first weapon
        [2, 15, 13, 1, 3, 0.5],//dagger
        [2, 19, 26, 2, 3, 0.6],//wand

        [4, 0, 23, 4, 3, 0.4],//offhand tome
        [4, 6, 14, 1, 6, 0.4],//shield
    ]
];

export const qualityMultiplier = [
    0.5,//no quality 0
    0.6,//common unused
    0.7,//uncommon
    0.8,//rare
    0.9,//epic
    1//legendary
]
const enum itemStats {
    MANA = 0,
    HEALTH = 1,
    AGILITY = 3,
    STRENGTH = 4,
    INTELLECT = 5,
    SPIRIT = 6,
    STAMINA = 7,
    DEFENSE_SKILL_RATING = 12,
    DODGE_RATING = 13,
    PARRY_RATING = 14,
    BLOCK_RATING = 15,
    HIT_MELEE_RATING = 16,
    HIT_RANGED_RATING = 17,
    HIT_SPELL_RATING = 18,
    CRIT_MELEE_RATING = 19,
    CRIT_RANGED_RATING = 20,
    CRIT_SPELL_RATING = 21,
    HIT_TAKEN_MELEE_RATING = 22,
    HIT_TAKEN_RANGED_RATING = 23,
    HIT_TAKEN_SPELL_RATING = 24,
    CRIT_TAKEN_MELEE_RATING = 25,
    CRIT_TAKEN_RANGED_RATING = 26,
    CRIT_TAKEN_SPELL_RATING = 27,
    HASTE_MELEE_RATING = 28,
    HASTE_RANGED_RATING = 29,
    HASTE_SPELL_RATING = 30,
    HIT_RATING = 31,
    CRIT_RATING = 32,
    HIT_TAKEN_RATING = 33,
    CRIT_TAKEN_RATING = 34,
    RESILIENCE_RATING = 35,
    HASTE_RATING = 36,
    EXPERTISE_RATING = 37,
    ATTACK_POWER = 38,
    RANGED_ATTACK_POWER = 39,
    FERAL_ATTACK_POWER = 40,
    SPELL_HEALING_DONE = 41,
    SPELL_DAMAGE_DONE = 42,
    MANA_REGENERATION = 43,
    ARMOR_PENETRATION_RATING = 44,
    SPELL_POWER = 45,
    HEALTH_REGEN = 46,
    SPELL_PENETRATION = 47,
    BLOCK_VALUE = 48,
}


export const statGroups: TSArray<TSArray<TSArray<float>>> = <TSArray<TSArray<TSArray<float>>>>[//statgroups
    //str groups
    [
        [itemStats.STRENGTH, itemStats.STAMINA],//primary statIDs
        [itemStats.HASTE_RATING, itemStats.HIT_RATING]//secondary statIDs
    ],
    [
        [itemStats.STRENGTH, itemStats.STAMINA],
        [itemStats.ATTACK_POWER, itemStats.EXPERTISE_RATING]
    ],
    [
        [itemStats.STRENGTH, itemStats.STAMINA],
        [itemStats.HEALTH, itemStats.CRIT_RATING]
    ],
    [
        [itemStats.STRENGTH, itemStats.STAMINA],
        [itemStats.ARMOR_PENETRATION_RATING, itemStats.HIT_MELEE_RATING]
    ],

    //agi groups
    [
        [itemStats.AGILITY, itemStats.STAMINA],//primary statIDs
        [itemStats.HASTE_RATING, itemStats.HIT_RATING]//secondary statIDs
    ],
    [
        [itemStats.AGILITY, itemStats.STAMINA],
        [itemStats.ATTACK_POWER, itemStats.EXPERTISE_RATING]
    ],
    [
        [itemStats.AGILITY, itemStats.STAMINA],
        [itemStats.HEALTH, itemStats.CRIT_MELEE_RATING]
    ],
    [
        [itemStats.AGILITY, itemStats.STAMINA],
        [itemStats.ARMOR_PENETRATION_RATING, itemStats.HIT_RATING]
    ],

    //int groups
    [
        [itemStats.INTELLECT, itemStats.SPIRIT],//primary statIDs
        [itemStats.HASTE_RATING, itemStats.HIT_RATING]//secondary statIDs
    ],
    [
        [itemStats.INTELLECT],
        [itemStats.SPIRIT, itemStats.SPELL_PENETRATION]
    ],
    [
        [itemStats.INTELLECT, itemStats.STAMINA],
        [itemStats.CRIT_SPELL_RATING, itemStats.SPELL_POWER]
    ],
    [
        [itemStats.INTELLECT, itemStats.MANA],
        [itemStats.SPELL_PENETRATION, itemStats.HIT_RATING]
    ],
]