export function getRandNumberWithSeed(seed: number, max: number): number {
    return Math.floor((Math.abs((Math.sin(seed)) * 10000) % max));
}

export function generateSeed(): uint32 {
    return <uint32>Math.round(Math.random() * 100000000);
};

export function setupConstCreations() {
    setupStatToWeightsDict()
    setupBaseNameDict()
    setupPrefixPostfixDict()
    setupDisplayIDDict()
    setupStatChoicesDict()
}

export const itemClassInfo: number[][][] = [//class,subclass,invType,material,sheath,slotStatMult
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
    0.1,//no quality 0
    0.3,//common unused
    0.5,//uncommon
    0.6,//rare
    0.75,//epic
    1//legendary
]

export const statCounts = [//primary,secondary
    [0, 0],//no quality 0
    [1, 0],//common unused
    [2, 1],//uncommon
    [2, 3],//rare
    [2, 4],//epic
    [3, 5]//legendary
]

function setupDisplayIDDict() {
    //quality->class->invType->subclass->[displayIDs]
    let q = QueryWorld('SELECT * FROM custom_item_template_displays')
    while (q.GetRow()) {
        displayID[q.GetUInt32(0)][q.GetUInt32(1)][q.GetUInt32(3)][q.GetUInt32(2)].push(q.GetUInt32(4))
    }
}

function setupBaseNameDict() {
    let q = QueryWorld('SELECT * FROM custom_item_template_names WHERE nametype = 2')
    while (q.GetRow()) {
        baseName[q.GetUInt32(1)][q.GetUInt32(2)][q.GetUInt32(3)].push(q.GetString(4))
    }
}

function setupPrefixPostfixDict() {
    let q = QueryWorld('SELECT  name FROM custom_item_template_names WHERE nametype = 1')
    while (q.GetRow()) {
        prefixPostfix[0].push(q.GetString(0))
    }
    q = QueryWorld('SELECT name FROM custom_item_template_names WHERE nametype = 3')
    while (q.GetRow()) {
        prefixPostfix[1].push(q.GetString(0))
    }
}


function setupStatToWeightsDict() {
    let q = QueryWorld('SELECT * FROM stat_weights')
    while (q.GetRow()) {
        statToWeight[q.GetUInt32(0)] = q.GetDouble(1)
    }
}

function setupStatChoicesDict() {
    let q = QueryWorld('SELECT * FROM stat_choices')
    while (q.GetRow()) {
        let arrFill: TSArray<number> = <TSArray<number>>[]
        q.GetString(1).split(",").forEach((v, i, arr) => {
            arrFill.push(ToUInt32(v))
        })
        statChoice[0][q.GetUInt32(0)] = arrFill
        arrFill = <TSArray<number>>[]
        q.GetString(2).split(",").forEach((v, i, arr) => {
            arrFill.push(ToUInt32(v))
        })
        statChoice[1][q.GetUInt32(0)] = arrFill
    }
}


export let statToWeight: TSDictionary<number, number> = CreateDictionary<number, number>({})

export const statChoice: number[][][] = [//data here is filled in datascripts
    <number[][]>[//primaries
        <number[]>[//str group
        ],
        <number[]>[//agi group
        ],
        <number[]>[//int group

        ],
    ],
    <number[][]>[//secondaries
        <number[]>[//str group
        ],
        <number[]>[//agi group
        ],
        <number[]>[//int group
        ],
    ],
]

export let statToName: TSDictionary<number, string> = CreateDictionary<number, string>({
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

const empty: TSDictionary<int32, TSDictionary<number, TSDictionary<number, number[]>>> = CreateDictionary({
    2: CreateDictionary<number, TSDictionary<number, number[]>>({
        13: CreateDictionary<number, number[]>({
        }),
        15: CreateDictionary<number, number[]>({
        }),
        17: CreateDictionary<number, number[]>({
        }),
        26: CreateDictionary<number, number[]>({
        }),
    }),
    4: CreateDictionary<number, TSDictionary<number, number[]>>({
        1: CreateDictionary<number, number[]>({
        }),
        2: CreateDictionary<number, number[]>({
        }),
        3: CreateDictionary<number, number[]>({
        }),
        5: CreateDictionary<number, number[]>({
        }),
        6: CreateDictionary<number, number[]>({
        }),
        7: CreateDictionary<number, number[]>({
        }),
        8: CreateDictionary<number, number[]>({
        }),
        9: CreateDictionary<number, number[]>({
        }),
        10: CreateDictionary<number, number[]>({
        }),
        11: CreateDictionary<number, number[]>({
        }),
        12: CreateDictionary<number, number[]>({
        }),
        16: CreateDictionary<number, number[]>({
        }),
    })
})

export const displayID: TSDictionary<int, TSDictionary<int32, TSDictionary<number, TSDictionary<number, number[]>>>> = <TSDictionary<int, TSDictionary<int32, TSDictionary<number, TSDictionary<number, number[]>>>>>CreateDictionary({//quality
    2: empty,
    3: empty,
    4: empty,
    5: empty,
})

export const prefixPostfix = [<string[]>[], <string[]>[]]

export const baseName: TSDictionary<int, TSDictionary<number, TSDictionary<number, string[]>>> = CreateDictionary({
    2: CreateDictionary<number, TSDictionary<number, string[]>>({
        0: CreateDictionary<number, string[]>({
            13: <string[]>[]
        }),
        1: CreateDictionary<number, string[]>({
            17: <string[]>[]
        }),
        2: CreateDictionary<number, string[]>({
            15: <string[]>[]
        }),
        3: CreateDictionary<number, string[]>({
            26: <string[]>[]
        }),
        4: CreateDictionary<number, string[]>({
            13: <string[]>[]
        }),
        5: CreateDictionary<number, string[]>({
            17: <string[]>[]
        }),
        6: CreateDictionary<number, string[]>({
            17: <string[]>[]
        }),
        7: CreateDictionary<number, string[]>({
            13: <string[]>[]
        }),
        8: CreateDictionary<number, string[]>({
            17: <string[]>[]
        }),
        10: CreateDictionary<number, string[]>({
            17: <string[]>[]
        }),
        13: CreateDictionary<number, string[]>({
            13: <string[]>[]
        }),
        15: CreateDictionary<number, string[]>({
            13: <string[]>[]
        }),
        19: CreateDictionary<number, string[]>({
            26: <string[]>[]
        }),
    }),
    4: CreateDictionary<number, TSDictionary<number, string[]>>({
        0: CreateDictionary<number, string[]>({
            2: <string[]>[],
            11: <string[]>[],
            12: <string[]>[],
            23: <string[]>[],
        }),
        1: CreateDictionary<number, string[]>({
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
        2: CreateDictionary<number, string[]>({
            1: <string[]>[],
            3: <string[]>[],
            5: <string[]>[],
            6: <string[]>[],
            7: <string[]>[],
            8: <string[]>[],
            9: <string[]>[],
            10: <string[]>[],
        }),
        3: CreateDictionary<number, string[]>({
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