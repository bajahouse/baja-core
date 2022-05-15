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

let mana = 0
let hp = 1
let agi = 3
let str = 4
let intl = 5
let spi = 6
let stam = 7
let hit = 31
let crit = 32
let haste = 36
let expertise = 37
let ap = 38
let apen = 44
let sp = 45
let spen = 47

export const statGroups: TSArray<TSArray<TSArray<float>>> = <TSArray<TSArray<TSArray<float>>>>[//statgroups
    //str groups
    [
        [str, stam],//primary statIDs
        [haste, hit]//secondary statIDs
    ],
    [
        [str, stam],
        [ap, expertise]
    ],
    [
        [str, stam],
        [hp, crit]
    ],
    [
        [str, stam],
        [apen, hit]
    ],

    //agi groups
    [
        [agi, stam],//primary statIDs
        [haste, hit]//secondary statIDs
    ],
    [
        [agi, stam],
        [ap, expertise]
    ],
    [
        [agi, stam],
        [hp, crit]
    ],
    [
        [agi, stam],
        [apen, hit]
    ],

    //int groups
    [
        [intl, spi],//primary statIDs
        [haste, hit]//secondary statIDs
    ],
    [
        [intl],
        [spi, spen]
    ],
    [
        [intl, stam],
        [crit, sp]
    ],
    [
        [intl, mana],
        [spen, hit]
    ],
]