import { std } from 'wow/wotlk'

const WARRIOR = {
  ALLIANCE: {},
  HORDE: {},
  ALL: {
    BATTLE_SHOUT: [6673, 5242, 6192, 11549, 11550, 11551, 25289, 2048, 47436],
    BATTLE_STANCE: [2457],
    BERSERKER_RAGE: [18499],
    BERSERKER_STANCE: [2458],
    BLOODRAGE: [2687],
    CHALLENGING_SHOUT: [1161],
    CHARGE: [100, 6178, 11578],
    CLEAVE: [845, 7369, 11608, 11609, 20569, 25231, 47519, 47520],
    COMMANDING_SHOUT: [469, 47439, 47440],
    CONCUSSION_BLOW: [12809],
    DEMORALIZING_SHOUT: [1160, 6190, 11554, 11555, 11556, 25202, 25203, 47437],
    DEVASTATE: [20243, 30016, 30022, 47497, 47498],
    DISARM: [676],
    ENDLESS_RAGE: [29623],
    ENRAGED_REGENERATION: [55694],
    EXECUTE: [5308, 20658, 20660, 20661, 20662, 25234, 25236, 47470, 47471],
    HAMSTRING: [1715],
    HEROIC_STRIKE: [78, 284, 285, 1608, 11564, 11565, 11566, 11567, 25286, 29707,  30324, 47449, 47450],
    HEROIC_THROW: [57755],
    INTERCEPT: [20252],
    INTERVENE: [3411],
    INTIMIDATING_SHOUT: [5246],
    MOCKING_BLOW: [694],
    OVERPOWER: [7384],
    PUMMEL: [6552],
    RECKLESSNESS: [1719],
    REND: [772, 6546, 6547, 6548, 11572, 11573, 11574, 25208, 46845, 47465],
    RETALIATION: [20230],
    REVENGE: [6572, 6574, 7379, 11600, 11601, 25288, 25269, 30357, 57823],
    SHATTERING_THROW: [64382],
    SHIELD_BASH: [72],
    SHIELD_BLOCK: [2565],
    SHIELD_SLAM: [23922, 23923, 23924, 23925, 25258, 30356, 47487, 47488],
    SHIELD_WALL: [871],
    SLAM: [1464, 8820, 11604, 11605, 25241, 25242, 47474, 47475],
    SPELL_REFLECTION: [23920],
    SUNDER_ARMOR: [7386],
    SWEEPING_STRIKES: [12723],
    TAUNT: [355],
    THUNDER_CLAP: [6343, 8198, 8204, 8205, 11580, 11581, 25264, 47501, 47502],
    VICTORY_RUSH: [34428],
    WHIRLWIND: [1680],
  },
}

const PALADIN = {
  ALLIANCE: {
    HOLY_VENGEANCE: [31803],
    SEAL_OF_VENGEANCE: [31801],
  },
  HORDE: {
    BLOOD_CORRUPTION: [53742],
    SEAL_OF_CORRUPTION: [53736],
  },
  ALL: {
    AVENGING_WRATH: [31884],
    BEACON_OF_LIGHT: [53563],
    BLESSING_OF_MIGHT: [19740, 19834, 19835, 19836, 19837, 19838, 25291, 27140, 48931, 48932],
    BLESSING_OF_SANCTUARY: [20911],
    BLESSING_OF_WISDOM: [19742, 19850, 19852, 19853, 19854, 25290, 27142, 48935, 48936],
    CLEANSE: [4987],
    CONCENTRATION_AURA: [19746],
    CONSECRATION: [26573, 20116, 20922, 20923, 20924, 27173, 48818, 48819],
    CRUSADER_AURA: [32223],
    CRUSADER_STRIKE: [35395],
    DEVOTION_AURA: [465, 10290, 643, 10291, 1032, 10292, 10293, 27149, 48941, 48942],
    DIVINE_SHIELD: [642],
    DIVINE_INTERVENTION: [19752],
    DIVINE_PLEA: [54428],
    DIVINE_PROTECTION: [498],
    EXORCISM: [879, 5614, 5615, 10312, 10313, 10314, 27138, 48800, 48801],
    EYE_FOR_AN_EYE: [25997],
    FIRE_RESISTANCE_AURA: [19891, 19899, 19900, 27153, 48947],
    FLASH_OF_LIGHT: [19750, 19939, 19940, 19941, 19942, 19943, 27137, 48784, 48785],
    FROST_RESISTANCE_AURA: [19888, 19897, 19898, 27152, 48945],
    GREATER_BLESSING_OF_MIGHT: [25782, 25916, 27141, 48933, 48934],
    GREATER_BLESSING_OF_SANCTUARY: [25899],
    GREATER_BLESSING_OF_WISDOM: [25894, 25918, 27143, 48937, 48938],
    HAMMER_OF_JUSTICE: [853, 5588, 5589, 10308],
    HAMMER_OF_WRATH: [24275, 24274, 24239, 27180, 48805, 48806],
    HAND_OF_FREEDOM: [1044],
    HAND_OF_PROTECTION: [1022, 5599, 10278],
    HAND_OF_RECKONING: [62124],
    HAND_OF_SACRIFICE: [6940],
    HAND_OF_SALVATION: [1038],
    HOLY_LIGHT: [635, 639, 647, 1026, 1042, 3472, 10328, 10329, 25292, 27135, 27136, 48781, 48782],
    HOLY_MENDING: [64891],
    HOLY_SHIELD: [20925, 20927, 20928, 27179, 48951, 48952],
    HOLY_SHOCK: [20473, 20929, 20930, 27174, 33072, 48824, 48825],
    HOLY_WRATH: [2812, 10318, 27139, 48816, 48817],
    LAY_ON_HANDS: [633, 2800, 10310, 27154, 48788],
    PURIFY: [1152],
    REDEMPTION: [7328, 10322, 10324, 20772, 20773, 48949, 48950],
    RETRIBUTION_AURA: [7294, 10298, 10299, 10300, 10301, 27150, 54043],
    RIGHTEOUS_DEFENSE: [31789],
    RIGHTEOUS_FURY: [25780],
    SACRED_SHIELD: [53601],
    SEAL_OF_COMMAND: [20375],
    SEAL_OF_JUSTICE: [20164],
    SEAL_OF_LIGHT: [20165],
    SEAL_OF_RIGHTEOUSNESS: [21084],
    SEAL_OF_WISDOM: [20166],
    SENSE_UNDEAD: [5502],
    SHADOW_RESISTANCE_AURA: [19876, 19895, 19896, 27151, 48943],
    SHIELD_OF_RIGHTEOUSNESS: [53600, 61411],
    TURN_EVIL: [10326],
  },
}

const HUNTER = {
  ALLIANCE: {},
  HORDE: {},
  ALL: {
    AIMED_SHOT: [19434, 20900, 20901, 20902, 20903, 20904, 27065, 49049, 49050],
    ARCANE_SHOT: [3044, 14281, 14282, 14283, 14284, 14285, 14286, 14287, 27019, 49044, 49045],
    ASPECT_OF_THE_BEAST: [13161],
    ASPECT_OF_THE_CHEETAH: [5118],
    ASPECT_OF_THE_DRAGONHAWK: [61846, 61847],
    ASPECT_OF_THE_HAWK: [13165, 14318, 14319, 14320, 14321, 14322, 25296, 27044],
    ASPECT_OF_THE_MONKEY: [13163],
    ASPECT_OF_THE_PACK: [13159],
    ASPECT_OF_THE_VIPER: [34074],
    ASPECT_OF_THE_WILD: [20043, 20190, 27045, 49071],
    AUTO_SHOT: [75],
    BEAST_LORE: [1462],
    CALL_PET: [883],
    CALL_STABLED_PET: [62757],
    CONCUSSIVE_SHOT: [5116],
    COUNTERATTACK: [19306],
    DETERRENCE: [19263],
    DISENGAGE: [781],
    DISMISS_PET: [2641],
    DISTRACTING_SHOT: [20736],
    EAGLE_EYE: [6197],
    EYES_OF_THE_BEAST: [1002],
    FEED_PET: [6991],
    FEIGN_DEATH: [5384],
    FLARE: [1543],
    FREEZING_ARROW: [60192],
    FREEZING_TRAP: [1499, 14310, 14311],
    FROST_TRAP: [13809],
    HUNTERS_MARK: [1130, 14323, 14324, 14325, 53338],
    IMMOLATION_TRAP: [13795, 14302, 14303, 14304, 14305, 27032, 49054, 49056],
    KILL_COMMAND: [34026],
    KILL_SHOT: [53351, 61005, 61006],
    MASTERS_CALL: [53271],
    MEND_PET: [136, 3111, 3661, 3662, 13542, 13543, 13544, 27046, 48989, 48990],
    MISDIRECTION: [34477],
    MONGOOSE_BITE: [1495, 14269, 14270, 14271, 36916, 53339],
    MULTI_SHOT: [2643, 14288, 14289, 14290, 25294, 27021, 49047, 49048],
    RAPID_FIRE: [3045],
    RAPTOR_STRIKE: [2973, 14260, 14261, 14262, 14263, 14264, 14265, 14266, 27014, 48995, 48996],
    REVIVE_PET: [982],
    SCARE_BEAST: [1513, 14326, 14327],
    SCORPID_STING: [3043],
    SERPENT_STING: [1978, 13549, 13550, 13551, 13552, 13553, 13554, 13555, 25295, 27016, 49000, 49001],
    SNAKE_TRAP: [34600],
    STEADY_SHOT: [56641, 34120, 49051, 49052],
    TAME_BEAST: [1515],
    TRACK_BEAST: [1494],
    TRACK_DEMONS: [19878],
    TRACK_DRAGONKIN: [19879],
    TRACK_ELEMENTALS: [19880],
    TRACK_GIANTS: [19882],
    TRACK_HIDDEN: [19885],
    TRACK_HUMANOIDS: [19883],
    TRACK_UNDEAD: [19884],
    TRANQUILIZING_SHOT: [19801],
    VOLLEY: [1510, 14294, 14295, 27022, 58431, 58434],
    WING_CLIP: [2974],
  },
}

const ROGUE = {
  ALLIANCE: {},
  HORDE: {},
  ALL: {
    AMBUSH: [8676, 8724, 8725, 11267, 11268, 11269, 27441, 48689, 48690, 48691],
    BACKSTAB: [53, 2589, 2590, 2591, 8721, 11279, 11280, 11281, 25300, 26863, 48656, 48657],
    BLIND: [2094],
    CHEAP_SHOT: [1833],
    CLOAK_OF_SHADOWS: [31224],
    COLD_BLOOD: [14177],
    DEADLY_THROW: [26679, 48673, 48674],
    DETECT_TRAPS: [2836],
    DISARM_TRAP: [1842],
    DISMANTLE: [51722],
    DISTRACT: [1725],
    ENVENOM: [32645, 32684, 57992, 57993],
    EVASION: [5277, 26669],
    EVISCERATE: [2098, 6760, 6761, 6762, 8623, 8624, 11299, 11300, 31016, 26865, 48667, 48668],
    EXPOSE_ARMOR: [8647],
    FAN_OF_KNIVES: [51723],
    FEINT: [1966, 6768, 8637, 11303, 25302, 27448, 48658, 48659],
    GARROTE: [703, 8631, 8632, 8633, 11289, 11290, 26839, 26884, 48675, 48676],
    GOUGE: [1776],
    HONOR_AMONG_THIEVES: [51699],
    KICK: [1766],
    KIDNEY_SHOT: [408, 8643],
    PICK_LOCK: [1804],
    PICK_POCKET: [921],
    RIPOSTE: [14251],
    RUPTURE: [1943, 8639, 8640, 11273, 11274, 11275, 26867, 48671, 48672],
    SAFE_FALL: [1860],
    SAP: [6770, 2070, 11297, 51724],
    SHIV: [5938],
    SINISTER_STRIKE: [1752, 1757, 1758, 1759, 1760, 8621, 11293, 11294, 26861, 26862, 48637, 48638],
    SLICE_AND_DICE: [5171, 6774],
    SPRINT: [2983, 6896, 11305],
    STEALTH: [1784],
    TRICKS_OF_THE_TRADE: [57933, 57934],
    VANISH: [1856, 1857, 26889],
  },
}

const PRIEST = {
  ALLIANCE: {},
  HORDE: {},
  ALL: {
    ABOLISH_DISEASE: [552],
    BLINDING_HEAL: [32546, 48119, 48120],
    BLESSED_HEALING: [70772],
    CIRCLE_OF_HEALING: [34861, 34863, 34864, 34865, 34866, 48088, 48089],
    CURE_DISEASE: [528],
    DESPERATE_PRAYER: [19236, 19238, 19240, 19241, 19242, 19243, 25437, 48172, 48173],
    DEVOURING_PLAGUE: [2944, 19276, 19277, 19278, 19279, 19280, 25467, 48299, 48300],
    DISPEL_MAGIC: [527, 988],
    DISPERSION: [47585],
    DIVINE_HYMN: [64843],
    DIVINE_SPIRIT: [14752, 14818, 14819, 27841, 25312, 48073],
    FADE: [586],
    FEAR_WARD: [6346],
    FLASH_HEAL: [2061, 9472, 9473, 9474, 10915, 10916, 10917, 25233, 25235, 48070, 48071],
    GREATER_HEAL: [2060, 10963, 10964, 10965, 25314, 25210, 25213, 48062, 48063],
    GUARDIAN_SPIRIT: [47788],
    HEAL: [2054, 2055, 6063, 6064],
    HOLY_FIRE: [14914, 15262, 15263, 15264, 15265, 15266, 15267, 15261, 25384, 48134, 48135],
    HOLY_NOVA: [15237, 15430, 15431, 27799, 27800, 27801, 25331, 48077, 48078],
    HYMN_OF_HOPE: [64901],
    INNER_FIRE: [588, 7128, 602, 1006, 10951, 10952, 25431, 48040, 48168],
    INNER_FOCUS: [14751],
    LESSER_HEAL: [2050, 2052, 2053],
    LEVITATE: [1706],
    MANA_BURN: [8129],
    MASS_DISPEL: [32375],
    MIND_BLAST: [8092, 8102, 8103, 8104, 8105, 8106, 10945, 10946, 10947, 25372, 25375, 48126, 48127],
    MIND_CONTROL: [605],
    MIND_FLAY: [15407, 17311, 17312, 17313, 17314, 18807, 25387, 48155, 48156],
    MIND_SEAR: [48045, 53023],
    MIND_SOOTHE: [453],
    MIND_VISION: [2096, 10909],
    PAIN_SUPPRESSION: [33206],
    POWER_WORD_FORTITUDE: [1243, 1244, 1245, 2791, 10937, 10938, 25389, 48161],
    POWER_WORD_SHIELD: [17, 592, 600, 3747, 6065, 6066, 10898, 10899, 10900, 10901, 25217, 25218, 48065, 48066],
    PRAYER_OF_FORTITUDE: [21562, 21564, 25392, 48162],
    PRAYER_OF_HEALING: [596, 996, 10960, 10961, 25316, 25308, 48072],
    PRAYER_OF_MENDING: [33076, 48112, 48113],
    PRAYER_OF_SHADOW_PROTECTION: [27683, 39374, 48170],
    PRAYER_OF_SPIRIT: [27681, 32999, 48074],
    PSYCHIC_HORROR: [64044],
    PSYCHIC_SCREAM: [8122, 8124, 10888, 10890],
    RENEW: [139, 6074, 6075, 6076, 6077, 6078, 10927, 10928, 10929, 25315, 25221, 25222, 48067, 48068],
    RESURRECTION: [2006, 2010, 10880, 10881, 20770, 25435, 48171],
    SHACKLE_UNDEAD: [9484, 9485, 10955],
    SHADOW_PROTECTION: [976, 10957, 10958, 25433, 48169],
    SHADOW_WORD_DEATH: [32379, 32996, 48157, 48158],
    SHADOW_WORD_PAIN: [589, 594, 970, 992, 2767, 10892, 10893, 10894,25367, 25368, 48124, 48125],
    SHADOWFIEND: [34433],
    SMITE: [585, 591, 598, 984, 1004, 6060, 10933, 10934, 25363, 25364, 48122, 48123],
    SOUL_WARDING: [20711],
  },
}

const DEATH_KNIGHT = {
  ALLIANCE: {},
  HORDE: {},
  ALL: {
    ANTI_MAGIC_ZONE: [51052],
    BONE_SHIELD: [49222],
    CORPSE_EXPLOSION: [49158],
    DANCING_RUNE_WEAPON: [49028],
    DEATH_COIL: [47541, 49892, 49893, 49894, 49895],
    DEATH_GATE: [50977],
    DEATHCHILL: [49796],
    FORCEFUL_DEFLECTION: [49410],
    FROSTSTRIKE: [49143],
    GHOUL_FRENZY: [63560],
    HEART_STRIKE: [55050],
    HOWLING_BLAST: [49184],
    HUNGERING_COLD: [49203],
    HYSTERIA: [49016],
    LICHBORNE: [49039],
    MARK_OF_BLOOD: [49005],
    PATH_OF_FROST: [3714],
    RUNE_OF_CINDEGLACIER: [53341],
    RUNE_OF_LICHBANE: [53331],
    RUNE_OF_RAZORICE: [53343],
    RUNE_OF_SPELLBREAKING: [54447],
    RUNE_OF_SWORDSHATTERING: [54446],
    RUNE_OF_THE_FALLEN_CRUSADER: [53344],
    RUNE_OF_THE_NERUBIAN_CARAPACE: [70164],
    RUNE_TAP: [48982],
    RUNEFORGING: [53428],
    SCOURGE_STRIKE: [55090],
    UNBREAKABLE_ARMOR: [51271],
    UNHOLY_BLIGHT: [49194],
    VAMPIRIC_BLOOD: [55233],
  },
}

const SHAMAN = {
  ALLIANCE: {
    HEROISM: [32182],
  },
  HORDE: {
    BLOODLUST: [2825],
  },
  ALL: {
    ANCESTRAL_SPIRIT: [2008, 20609, 20610, 20776, 20777, 25590, 49277],
    ASTRAL_RECALL: [556],
    CHAIN_HEAL: [1064, 10622, 10623, 25422, 25423, 55458, 55459],
    CHAIN_LIGHTNING: [421, 930, 2860, 10605, 25439, 25442, 49270, 49271],
    CLEANSE_SPIRIT: [51886],
    CLEANSING_TOTEM: [8170],
    CURSE_TOXINS: [526],
    EARTH_ELEMENTAL_TOTEM: [2062],
    EARTH_SHOCK: [8042, 8044, 8045, 8046, 10412, 10413, 10414, 25454, 49230, 49231],
    EARTHBIND_TOTEM: [2484],
    EARTHLIVING_WEAPON: [51730, 51988, 51991, 51992, 51993, 51994],
    FAR_SIGHT: [6196],
    FERAL_SPIRIT: [51533],
    FIRE_ELEMENTAL_TOTEM: [2894],
    FIRE_NOVA: [1535, 8349, 8499, 11314, 11315, 25546, 25547],
    FIRE_RESISTANCE_TOTEM: [8184, 10537, 10538, 25563, 58737, 58739],
    FLAME_SHOCK: [8050, 8052, 8053, 10447, 10448, 29228, 25457, 49232, 49233],
    FLAMETONGUE_TOTEM: [8227, 8249, 10526, 16387, 25557, 58649, 58652, 58656],
    FLAMETONGUE_WEAPON: [8024, 8027, 8030, 16339, 16341, 16342, 25489, 58785, 58789, 58790],
    FROST_RESISTANCE_TOTEM: [8181, 10478, 10479, 25560, 58741, 58745],
    FROST_SHOCK: [8065, 8058, 10472, 10473, 25464, 49235, 49236],
    FROSTBRAND_WEAPON: [8033, 8038, 10456, 16355, 16356, 25500],
    GHOST_WOLF: [2645],
    GROUNDING_TOTEM: [8177],
    HEALING_STREAM_TOTEM: [5394, 6375, 6377, 10462, 25567, 58755, 58756, 58757],
    HEALING_WAVE: [331, 332, 547, 913, 939, 959, 8005, 10395, 10396, 25357, 25391, 25396, 49272, 49273],
    HEX: [51514],
    LAVA_BURST: [51505],
    LESSER_HEALING_WAVE: [8004, 8008, 8010, 10466, 10467, 10468, 25420, 49275, 49276],
    LIGHTNING_BOLT: [403, 529, 548, 915, 943, 6041, 10391, 10392, 15207, 15208, 25448, 25449, 49237, 49238],
    LIGHTNING_SHIELD: [324, 325, 905, 945, 8134, 10431, 10432, 25469, 25472, 49280, 49281],
    MAGMA_TOTEM: [8190, 10585, 10586, 10587, 25552, 58731, 58734],
    MANA_SPRING_TOTEM: [5675, 10495, 10496, 10497, 25570, 58771, 58773, 58774],
    NATURE_RESISTANCE_TOTEM: [10595, 10600, 10601, 25574, 58746, 58749],
    PURGE: [370, 8012],
    REINCARNATION: [20608],
    ROCKBITER_WEAPON: [8017, 8018, 8019, 10399],
    SEARING_TOTEM: [3599, 6363, 6364, 6365, 10437, 10438, 25533, 28699, 58703, 58704],
    SENTRY_TOTEM: [6495],
    SPIRIT_WEAPONS: [36591],
    STONECLAW_TOTEM: [5730, 6390, 6391, 6392, 10427, 10428, 25525, 58580, 58581, 58582],
    STONESKIN_TOTEM: [8071, 8154, 8155, 10406, 10407, 10408, 25508, 25509, 58751, 58753],
    STRENGTH_OF_EARTH_TOTEM: [8075, 8160, 8161, 10442, 25361, 25528, 57622, 58643],
    TOTEMIC_RECALL: [36936],
    TREMOR_TOTEM: [8143],
    WATER_BREATHING: [131],
    WATER_SHIELD: [52127, 52129, 52131, 52134, 52136, 52138, 24398, 33736, 57960],
    WATER_WALKING: [546],
    WIND_SHEAR: [57994],
    WINDFURY_TOTEM: [8512],
    WINDURY_WEAPON: [8232, 8235, 10486, 16362, 25505],
    WRATH_OF_AIR_TOTEM: [3738],
  },
}

const MAGE = {
  ALLIANCE: {
    PORTAL_DARNASSUS: [11419],
    PORTAL_EXODAR: [32266],
    PORTAL_IRONFORGE: [11416],
    PORTAL_STORMWIND: [10059],
    PORTAL_SHATTRATH_ALLIANCE: [33691],
    PORTAL_THERAMORE: [49360],
    TELEPORT_DARNASSUS: [3565],
    TELEPORT_EXODAR: [32271],
    TELEPORT_IRONFORGE: [3562],
    TELEPORT_STORMWIND: [3561],
    TELEPORT_SHATTRATH_ALLIANCE: [33690],
    TELEPORT_THERAMORE: [49359],
  },
  HORDE: {
    PORTAL_ORGRIMMAR: [11417],
    PORTAL_SILVERMOON: [32267],
    PORTAL_THUNDER_BLUFF: [11420],
    PORTAL_UNDERCITY: [11418],
    PORTAL_SHATTRATH_HORDE: [35717],
    PORTAL_STONARD: [49361],
    TELEPORT_ORGRIMMAR: [3567],
    TELEPORT_SILVERMOON: [32272],
    TELEPORT_THUNDER_BLUFF: [3566],
    TELEPORT_UNDERCITY: [3563],
    TELEPORT_SHATTRATH_HORDE: [35715],
    TELEPORT_STONARD: [49358],
  },
  ALL: {
    AMPLIFY_MAGIC: [1008, 8455, 10169, 10170, 27130, 33946, 43017],
    ARCANE_BLAST: [30451, 42894, 42896, 42897],
    ARCANE_BRILLIANCE: [23028, 27127, 43002],
    ARCANE_EXPLOSION: [1449, 8437, 8438, 8439, 10201, 10202, 27080, 27082, 42920, 42921],
    ARCANE_INTELLECT: [1459, 1460, 1461, 10156, 10157, 27126, 42995],
    ARCANE_MISSILES: [5143, 5144, 5145, 8416, 8417, 10211, 10212, 25345, 27075, 38699, 38704, 42843, 42846],
    BLINK: [1953],
    BLIZZARD: [10, 6141, 8427, 10185, 10186, 10187, 27085, 42939, 42940],
    CONJURE_FOOD: [587, 597, 990, 6129, 10144, 10146, 10147, 28612],
    CONJURE_WATER: [5504, 5505, 5506, 6127, 10138, 10139, 10140, 37420, 27090],
    CONJURE_REFRESHMENT: [42955, 42956],
    CONJURE_MANA_GEM: [759, 3553, 10055, 10056, 27390],
    CONE_OF_COLD: [120, 8492, 10159, 10160, 10161, 27087, 42930, 42931],
    COUNTERSPELL: [2139],
    DAMPEN_MAGIC: [604, 8450, 8451, 10173, 10174, 33944, 43015],
    EVOCATION: [12051],
    FIRE_BLAST: [24530, 2137, 2138, 8412, 8413, 10197, 10199, 27078, 27079, 42872, 42873],
    FIRE_WARD: [543, 8457, 8458, 10223, 10225, 27128, 43010],
    FIREBALL: [133, 143, 145, 3140, 8400, 8401, 8402, 10148, 10149, 10150, 10151, 25306, 27070, 38692, 42832, 42833],
    FLAMESTRIKE: [2120, 2121, 8422, 8423, 10215, 10216, 27086, 42925, 42926],
    FROST_ARMOR: [168, 7300, 7301],
    FROST_NOVA: [122, 865, 6131, 10230, 27088, 42917],
    FROST_WARD: [6143, 8461, 8462, 10177, 28609, 32796, 43012],
    FROSTBOLT: [116, 205, 837, 7322, 8406, 8407, 8408, 10179, 10180, 10181, 25304, 27071, 27072, 38697, 42841, 42842],
    FROSTFIRE_BOLT: [44614, 47610],
    ICE_ARMOR: [7302, 7320, 10219, 10220, 27124, 43008],
    ICE_BLOCK: [45438],
    ICE_LANCE: [30455, 42913, 42914],
    INVISIBILITY: [66],
    MAGE_ARMOR: [6117, 22782, 22783, 27125, 43023, 43024],
    MANA_SHIELD: [1463, 8494, 8495, 10191, 10192, 10193, 27131, 43019, 43020],
    MOLTEN_ARMOR: [30482, 43045, 43046],
    POLYMORPH: [118, 12824, 12825, 12826],
    POLYMORPH_TURTLE: [28271],
    POLYMORPH_PIG: [28272],
    POLYMORPH_SERPENT: [61025],
    POLYMORPH_BLACK_CAT: [61305],
    POLYMORPH_RABBIT: [61721],
    POLYMORPH_TURKEY: [61780],
    PYROBLAST: [11366, 12505, 12522, 12523, 12524, 12525, 12526, 18809, 27132, 33938, 42890, 42891],
    PORTAL_DALARAN: [53142],
    REMOVE_CURSE: [475],
    RITUAL_OF_REFRESHMENT: [43987],
    SCORCH: [2948, 8444, 8445, 8446, 10205, 10206, 10207, 27073, 27074, 42858, 42859],
    SLOW_FALL: [130],
    SPELLSTEAL: [30449],
    TELEPORT_DALARAN: [53140],
  },
}

const WARLOCK = {
  ALLIANCE: {},
  HORDE: {},
  ALL: {
    ATROCITY: [47206],
    BANISH: [710, 18647],
    CHAOS_BOLT: [50796, 59170, 59171, 59172],
    CORRUPTION: [172, 6222, 6223, 7648, 11671, 11672, 25311, 27216, 47812, 47813],
    CREATE_HEALTHSTONE: [6201, 6202, 5699, 11729, 11730, 27230, 47871, 47878],
    CURSE_OF_AGONY: [980, 1014, 8217, 11711, 11712, 11713, 27218, 47863, 27218, 47863, 47864],
    CURSE_OF_DOOM: [603, 30910, 47867],
    CURSE_OF_THE_ELEMENTS: [1490, 11721, 11722, 27228, 47865],
    CURSE_OF_TONGUES: [1714, 11719],
    CURSE_OF_WEAKNESS: [702, 1108, 6205, 7646, 11707, 11708, 27224, 30909, 30511],
    DARK_PACT: [18220, 18937, 18938, 27265, 59092],
    DEATH_COIL: [6789, 17925, 17926, 27223, 47859, 47860],
    DEMON_SKIN: [687, 696],
    DEMON_ARMOR: [706, 1066, 11733, 11734, 11735, 27260, 47793, 47889],
    DEMONIC_CIRCLE_SUMMON: [48018],
    DEMONIC_CIRCLE_TELEPORT: [48020],
    DETECT_INVISIBILITY: [132],
    DRAIN_LIFE: [689, 699, 709, 7651, 11699, 11700, 27219, 27220, 47857],
    DRAIN_MANA: [5138],
    ENSLAVE_DEMON: [1098, 11725, 11726, 61191],
    EYE_OF_KILROGG: [126],
    FEAR: [5782, 6213, 6215],
    FEL_ARMOR: [28176, 28189, 47892, 47893],
    HAUNT: [48181, 59161, 59163, 59164],
    HEALTH_FUNNEL: [755, 3698, 3699, 3700, 11693, 11694, 11695, 27259, 47856],
    HELLFIRE: [1949, 11683, 11684, 27213, 47823],
    HOWL_OF_TERROR: [5484, 17928],
    IMMOLATE: [348, 707, 1094, 2941, 11665, 11667, 11668, 25309, 27215, 47810, 47811],
    INCINERATE: [29722, 32231, 47837, 47838],
    INFERNO: [1122],
    LIFE_TAP: [1454, 1455, 1456, 11687, 11688, 11689, 27222, 57946],
    RAIN_OF_FIRE: [5740, 6219, 11677, 11678, 27212, 47819, 47820],
    RITUAL_OF_DOOM: [18540],
    RITUAL_OF_SOULS: [29893, 58887],
    RITUAL_OF_SUMMONING: [698],
    SEARING_PAIN: [5676, 17919, 17920, 17921, 17922, 17923, 27210, 28699, 47814, 47815],
    SEED_OF_CORRUPTION: [27243, 47835, 47836],
    SENSE_DEMONS: [5500],
    SHADOW_BOLT: [686, 695, 705, 1088, 1106, 7641, 11659, 11660, 11661, 25307, 27209, 47808, 47809],
    SHADOW_WARD: [6229, 11739, 11740, 28610, 47890, 47891],
    SHADOWFLAME: [47897, 61290],
    SIPHON_LIFE: [63108],
    SOUL_FIRE: [6353, 17924, 27211, 30545, 47824, 47825],
    SOULSHATTER: [29858],
    SUMMON_FELHUNTER: [30146],
    SUMMON_IMP: [688],
    SUMMON_SUCUBUS: [712],
    SUMMON_VOIDWALKER: [697],
    UNENDING_BREATH: [5697],
    CREATE_FIRESTONE: [6366, 17951, 17952, 17953, 27250, 60219, 60220],
    CREATE_SOULSTONE: [693, 20752, 20755, 20756, 20757, 27238, 47884],
    CREATE_SPELLSTONE: [2362, 41192, 41193, 41194, 41195, 41196],
    DRAIN_SOUL: [1120, 8288, 8289, 11675, 27217, 47855],
  },
}

const DRUID = {
  ALLIANCE: {},
  HORDE: {},
  ALL: {
    ABOLISH_POISON: [2893],
    AQUATIC_FORM: [2893],
    BARKSKIN: [22812],
    BASH: [5211, 6798, 8983],
    BEAR_FORM: [5487],
    BERSERK: [50334],
    CAT_FORM: [768],
    CHALLENGING_ROAR: [5209],
    CLAW: [1082, 3029, 5201, 9849, 9850, 27000, 48569, 48570],
    COWER: [8998, 9000, 9892, 31709, 27004, 48575],
    CURE_POISON: [8946],
    CYCLONE: [33786],
    DASH: [1850, 9821, 33357],
    DEMORALIZING_ROAR: [99, 1735, 9490, 9747, 9898, 26998, 48559, 48560],
    DIRE_BEAR_FORM: [9634],
    ENRAGE: [5229],
    ENTANGLING_ROOTS: [339, 1062, 5195, 5196, 9852, 9853, 26989],
    FAERIE_FIRE: [770],
    FAERIE_FIRE_FERAL: [16857],
    FELINE_GRACE: [20719],
    FERAL_CHARGE: [16979],
    FERAL_CHARGE_CAT: [49376],
    FEROCIOUS_BITE: [22568, 22827, 22828, 22829, 31018, 24248, 48576, 48577],
    FLIGHT_FORM: [33943],
    FRENZIED_REGENERATION: [22842],
    GIFT_OF_THE_WILD: [21849, 21850, 26991, 48470],
    GROWL: [6795],
    HEALING_TOUCH: [5185, 5186, 5187, 5188, 5189, 6778, 8903, 9758, 9888, 9889, 25297, 26978, 26979, 48377, 48378],
    HIBERNATE: [2637, 18657, 18658],
    HURRICANE: [16914, 17401, 17402, 27012, 48467],
    INNERVATE: [29166],
    LACERATE: [33745, 48567, 48568],
    LEADER_OF_THE_PACK: [17007],
    LIFEBLOOM: [33763, 48450, 48451],
    MAIM: [22570, 49802],
    MANGLE_BEAR: [33878, 33986, 33987, 48563, 48564],
    MANGLE_CAT: [33876, 33982, 33983, 48565, 48566],
    MARK_OF_THE_WILD: [1126, 5232, 6756, 5234, 8907, 9884, 9885, 26990, 48469],
    MAUL: [6807, 6808, 6809, 8972, 9745, 9880, 9881, 26996, 48479, 48480],
    MOONFIRE: [8921, 8924, 8925, 8926, 8927, 8928, 8929, 9833, 9834, 9835, 26987, 26988, 48462, 48463],
    NATURES_GRASP: [16689, 16810, 16811, 16812, 16813, 17329, 27009],
    NOURISH: [50464],
    POUNCE: [9005, 9823, 9827, 27006, 49803],
    PRIMAL_FURY: [16958, 16961],
    PROWL: [5215],
    RAKE: [1822, 1823, 1824, 9904, 27003, 48573, 48574],
    RAVAGE: [6785, 6787, 9866, 9867, 27005, 48578, 48579],
    REBIRTH: [20484, 20739, 20742, 20747, 20748, 26994, 48477],
    REGROWTH: [8936, 8938, 8939, 8940, 8941, 9750, 9856, 9857, 9858, 26980, 48442, 48443],
    REJUVENATION: [774, 1058, 1430, 2090, 2091, 3627, 8910, 9839, 9840, 9841, 25299, 26981, 26982, 48440, 48441],
    REMOVE_CURSE: [2782],
    RIP: [1079, 9492, 9493, 9752, 9894, 9896, 27008, 49799, 49800],
    SHREAD: [5221, 6800, 8992, 9829, 9830, 27001, 27002, 48571, 48572],
    SOOTHE_ANIMAL: [2908, 8955, 9901, 26995],
    STARFIRE: [2912, 8949, 8950, 8951, 9875, 9876, 25298, 26986, 48464, 48465],
    SWIFT_FLIGHT_FORM: [40120],
    SWIPE_BEAR: [779, 780, 769, 9754, 9908, 26997, 48561, 48562],
    SWIPE_CAT: [62078],
    TELEPORT_MOONGLADE: [18960],
    THORNS: [467, 782, 1075, 8914, 9756, 9910, 26992],
    TIGERS_FURY: [5217, 6793, 9845, 9846, 50212, 50213],
    TRACK_HUMANOIDS: [5225],
    TRANQUILITY: [740, 8918, 9862, 9863, 26983, 48446, 48447],
    TRAVEL_FORM: [783],
    WRATH: [5176, 5177, 5178, 5179, 5180, 6780, 8905, 9912, 26984, 26985, 48459, 48461],
  },
}

const CLASS_SPELLS: { [key: string]: number[] } = {
  ...WARRIOR.ALL,
  ...WARRIOR.ALLIANCE,
  ...WARRIOR.HORDE,
  ...PALADIN.ALL,
  ...PALADIN.ALLIANCE,
  ...PALADIN.HORDE,
  ...HUNTER.ALL,
  ...HUNTER.ALLIANCE,
  ...HUNTER.HORDE,
  ...ROGUE.ALL,
  ...ROGUE.ALLIANCE,
  ...ROGUE.HORDE,
  ...PRIEST.ALL,
  ...PRIEST.ALLIANCE,
  ...PRIEST.HORDE,
  ...DEATH_KNIGHT.ALL,
  ...DEATH_KNIGHT.ALLIANCE,
  ...DEATH_KNIGHT.HORDE,
  ...SHAMAN.ALL,
  ...SHAMAN.ALLIANCE,
  ...SHAMAN.HORDE,
  ...MAGE.ALL,
  ...MAGE.ALLIANCE,
  ...MAGE.HORDE,
  ...WARLOCK.ALL,
  ...WARLOCK.ALLIANCE,
  ...WARLOCK.HORDE,
  ...DRUID.ALL,
  ...DRUID.ALLIANCE,
  ...DRUID.HORDE,
}

let lines = ''

for (const key of Object.keys(CLASS_SPELLS)) {
  const list = CLASS_SPELLS[key]
  lines = lines + `\n${key}`
  lines = lines + `\n====================`
  list.forEach(id => {
    lines = lines + `\n${id}`
    const spell = std.Spells.load(id)
    lines = lines + `\n${spell.Name.enGB.get()}`
  })
  lines = lines + '\n\n'
  // fs.writeFileSync('C:/Users/Administrator/Downloads/list.txt', lines)
}