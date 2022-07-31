// ============================================================================
//
// - Constants -
//
//   This file holds constants used in other files
//
// - External scripts -
//   livescripts: livescripts/item-create/item-create-lib
//   livescripts: livescripts/reforging/reforging
//
// ============================================================================

export function getRandNumber(max: uint32): uint32 {
    return Math.floor((Math.random() * (max - 0.001)))
}


export const itemClassInfo: double[][][] = [//class,subclass,invType,material,sheath,statMult
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
]

export const armorScalar = [
    0,//unused
    1,//cloth
    2,//leather
    4,//mail
    8,//plate unused
]

export const qualityMultiplier = [
    0.5,//no quality 0
    0.4,//common unused
    0.5,//uncommon
    0.6,//rare
    0.75,//epic
    1//legendary
]

export const statCounts = [
    [0, 0],//no quality 0
    [1, 1],//common unused
    [2, 1],//uncommon
    [2, 3],//rare
    [2, 4],//epic
    [3, 5]//legendary
]

export let statToName: TSDictionary<uint32,string> = CreateDictionary<uint32, string>({
    0: 'Mana',
    1: 'Health',
    3: 'Agility',
    4: 'Strength',
    5: 'Intellect',
    6: 'Spirit',
    7: 'Stamina',
    12: 'Defense Skill',
    13: 'Dodge',
    14: 'Parry',
    15: 'Block',
    16: 'Melee Hit',
    17: 'Ranged Hit',
    18: 'Spell Hit',
    19: 'Melee Critical',
    20: 'Ranged Critical',
    21: 'Spell Critical',
    22: 'Melee Hit Taken',
    23: 'Ranged Hit Taken',
    24: 'Spell Hit Taken',
    25: 'Melee Critical Taken',
    26: 'Ranged Critical Taken',
    27: 'Spell Critical Taken',
    28: 'Melee Haste',
    29: 'Ranged Haste',
    30: 'Spell Haste',
    31: 'Hit Rating',
    32: 'Critical Strike Rating',
    33: 'Hit Taken Rating',
    34: 'Critical Taken Rating',
    35: 'Resilience Rating',
    36: 'Haste',
    37: 'Expertise',
    38: 'Attack Power',
    39: 'Ranged Attack Power',
    40: 'Feral Attack Power',
    41: 'Spell Healing Power',
    42: 'Spell Damage Power',
    43: 'Mana Regen',
    44: 'Armor Penetration',
    45: 'Spell Penetration',
    46: 'Health Regen',
    47: 'Spell Penetration',
    48: 'Block Value',
})

export let statToWeight: TSDictionary<uint32,float> = CreateDictionary<uint32, float>({
    // Unused
    0: 1,
    // Health
    1: 12,
    // Agility, Strength, Intellect, Spirit, Stamina
    3: 1.15,
    //str
    4: 1.15,
    //int
    5: 1.15,
    //spi
    6: 1.15,
    //stam
    7: 1.15,
    // Defense 
    12: 1.1,
    // Dodge
    13: 1.1,
    // Parry
    14: 1.1,
    // Shield Block
    15: 1.1,
    // Melee, Ranged, & Spell Hit
    16: 1,
    17: 1,
    18: 1,
    // Melee Ranged & Spell Crit
    19: 1,
    20: 1,
    21: 1,
    // Melee, Ranged, & Spell Hit Avoidance
    22: 1,
    23: 1,
    24: 1,
    // Melee, Ranged & Spell Crit Avoidance
    25: 1,
    26: 1,
    27: 1,
    // Melee, Ranged, Spell Haste
    28: 1,
    29: 1,
    30: 1,
    // Hit Rating (General)
    31: 1,
    // Critical Strike (General)
    32: 1,
    // Hit Avoidance 
    33: 1,
    // Crit Avoidance
    34: 1,
    // Resilience
    35: 1,
    // Haste (General)
    36: 1.2,
    // Expertise
    37: 1.3,
    // Attack Power
    38: 1.3,
    // Ranged Attack Power
    39: 1.3,
    // Feral Attack Power
    40: 1,
    // Dmg Done
    41: 1,
    // Healing Done
    42: 1,
    // MP5
    43: 1,
    // Armor Penentration
    44: 1.1,
    // Spell Power (General)
    45: 3,
    // HP5
    46: 1,
    // Spell Penetration
    47: 1,
    // Block Value
    48: 1,
})

const enum itemStats /**@realType:uint32*/ {
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
    SPELL_HEALING_DONE = 41,
    SPELL_DAMAGE_DONE = 42,
    MANA_REGENERATION = 43,
    ARMOR_PENETRATION_RATING = 44,
    SPELL_POWER = 45,
    HEALTH_REGEN = 46,
    SPELL_PENETRATION = 47,
    BLOCK_VALUE = 48,
}

export const statChoices: uint32[][][] = [
    <uint32[][]>[//primaries
        <uint32[]>[//str group
            itemStats.STRENGTH,
            itemStats.STAMINA,
            itemStats.AGILITY
        ],
        <uint32[]>[//agi group
            itemStats.AGILITY,
            itemStats.STAMINA,
            itemStats.STRENGTH,
        ],
        <uint32[]>[//int group
            itemStats.INTELLECT,
            itemStats.STAMINA,
            itemStats.SPIRIT
        ],
    ],
    <uint32[][]>[//secondaries
        <uint32[]>[//str group
            itemStats.HEALTH,
            itemStats.DEFENSE_SKILL_RATING,
            itemStats.BLOCK_RATING,
            itemStats.HIT_RATING,
            itemStats.CRIT_RATING,
            itemStats.HIT_TAKEN_RATING,
            itemStats.RESILIENCE_RATING,
            itemStats.HASTE_RATING,
            itemStats.EXPERTISE_RATING,
            itemStats.ATTACK_POWER,
            itemStats.ARMOR_PENETRATION_RATING,
            itemStats.STRENGTH,
            itemStats.AGILITY,
        ],
        <uint32[]>[//agi group
            itemStats.HEALTH,
            itemStats.DODGE_RATING,
            itemStats.HIT_RATING,
            itemStats.CRIT_RATING,
            itemStats.CRIT_TAKEN_RATING,
            itemStats.HASTE_RATING,
            itemStats.EXPERTISE_RATING,
            itemStats.ATTACK_POWER,
            itemStats.ARMOR_PENETRATION_RATING,
            itemStats.AGILITY,
            itemStats.STRENGTH,
        ],
        <uint32[]>[//int group
            itemStats.MANA,
            itemStats.SPIRIT,
            itemStats.INTELLECT,
            itemStats.CRIT_RATING,
            itemStats.HIT_RATING,
            itemStats.HASTE_RATING,
            itemStats.MANA_REGENERATION,
            itemStats.SPELL_POWER,
            itemStats.SPELL_PENETRATION,
        ],
    ],
]

const empty: TSDictionary<int32, TSDictionary<uint32, TSDictionary<uint32, uint32[]>>> = CreateDictionary({
    2: CreateDictionary<uint32, TSDictionary<uint32, uint32[]>>({
        13: CreateDictionary<uint32, uint32[]>({
        }),
        15: CreateDictionary<uint32, uint32[]>({
        }),
        17: CreateDictionary<uint32, uint32[]>({
        }),
        26: CreateDictionary<uint32, uint32[]>({
        }),
    }),
    4: CreateDictionary<uint32, TSDictionary<uint32, uint32[]>>({
        1: CreateDictionary<uint32, uint32[]>({
        }),
        2: CreateDictionary<uint32, uint32[]>({
        }),
        3: CreateDictionary<uint32, uint32[]>({
        }),
        5: CreateDictionary<uint32, uint32[]>({
        }),
        6: CreateDictionary<uint32, uint32[]>({
        }),
        7: CreateDictionary<uint32, uint32[]>({
        }),
        8: CreateDictionary<uint32, uint32[]>({
        }),
        9: CreateDictionary<uint32, uint32[]>({
        }),
        10: CreateDictionary<uint32, uint32[]>({
        }),
        11: CreateDictionary<uint32, uint32[]>({
        }),
        12: CreateDictionary<uint32, uint32[]>({
        }),
        16: CreateDictionary<uint32, uint32[]>({
        }),
    })
})

export const displayDict: TSDictionary<int, TSDictionary<int32, TSDictionary<uint32, TSDictionary<uint32, uint32[]>>>> = <TSDictionary<int, TSDictionary<int32, TSDictionary<uint32, TSDictionary<uint32, uint32[]>>>>>CreateDictionary({//quality
    2: empty,
    3: empty,
    4: empty,
    5: empty,
})

export const prefixPostfixArray = [<string[]>[], <string[]>[]]

export const baseNameDict: TSDictionary<int, TSDictionary<uint32, TSDictionary<uint32, string[]>>> = CreateDictionary({
    2: CreateDictionary<uint32, TSDictionary<uint32, string[]>>({
        0: CreateDictionary<uint32, string[]>({
            13: <string[]>[]
        }),
        1: CreateDictionary<uint32, string[]>({
            17: <string[]>[]
        }),
        2: CreateDictionary<uint32, string[]>({
            15: <string[]>[]
        }),
        3: CreateDictionary<uint32, string[]>({
            26: <string[]>[]
        }),
        4: CreateDictionary<uint32, string[]>({
            13: <string[]>[]
        }),
        5: CreateDictionary<uint32, string[]>({
            17: <string[]>[]
        }),
        6: CreateDictionary<uint32, string[]>({
            17: <string[]>[]
        }),
        7: CreateDictionary<uint32, string[]>({
            13: <string[]>[]
        }),
        8: CreateDictionary<uint32, string[]>({
            17: <string[]>[]
        }),
        10: CreateDictionary<uint32, string[]>({
            17: <string[]>[]
        }),
        13: CreateDictionary<uint32, string[]>({
            13: <string[]>[]
        }),
        15: CreateDictionary<uint32, string[]>({
            13: <string[]>[]
        }),
        19: CreateDictionary<uint32, string[]>({
            26: <string[]>[]
        }),
    }),
    4: CreateDictionary<uint32, TSDictionary<uint32, string[]>>({
        0: CreateDictionary<uint32, string[]>({
            2: <string[]>[],
            11: <string[]>[],
            12: <string[]>[],
            23: <string[]>[],
        }),
        1: CreateDictionary<uint32, string[]>({
            1: <string[]>[],
            3: <string[]>[],
            5: <string[]>[],
            6: <string[]>[],
            7: <string[]>[],
            8: <string[]>[],
            9: <string[]>[],
            10: <string[]>[],
            16: <string[]>[],
        }),
        2: CreateDictionary<uint32, string[]>({
            1: <string[]>[],
            3: <string[]>[],
            5: <string[]>[],
            6: <string[]>[],
            7: <string[]>[],
            8: <string[]>[],
            9: <string[]>[],
            10: <string[]>[],
        }),
        3: CreateDictionary<uint32, string[]>({
            1: <string[]>[],
            3: <string[]>[],
            5: <string[]>[],
            6: <string[]>[],
            7: <string[]>[],
            8: <string[]>[],
            9: <string[]>[],
            10: <string[]>[],
        }),
    })
})

export function classIDToStatType(classID: uint32): uint32 {
    switch (classID) {
        case 1:
        case 6:
            return 0
        case 2:
            return getRandNumber(2) == 0 ? 0 : 1
        case 3:
        case 4:
            return 1
        case 5:
        case 8:
        case 9:
            return 2
        case 7:
        case 11:
            return getRandNumber(2) + 1
        default:
            return 0
    }
}