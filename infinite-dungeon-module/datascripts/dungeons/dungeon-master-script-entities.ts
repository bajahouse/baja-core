// ============================================================================
//
// - Dungeon Master Script Entities -
//
//   This file creates the base entities for any dungeon
//
// - External scripts -
//   Livescripts: livescripts/dungeon/dungeon-master
//
// ============================================================================

import { std } from "wow/wotlk";
import { MODNAME } from "../modname";

std.DBC.CreatureModelData.add(3500).ModelName.set('World\\Expansion01\\Doodads\\ZulAman\\Ruins\\TrollRuins_ZulAman_07.mdx').CollisionWidth.set(1).CollisionHeight.set(3).GeoBoxMinX.set(-1.57329094409943).GeoBoxMaxX.set(1.57456505298615).GeoBoxMinY.set(-1.83399701118469).GeoBoxMaxY.set(1.80083501338959).GeoBoxMinZ.set(-0.13425900042057).GeoBoxMaxZ.set(4.46832180023193)
std.DBC.CreatureDisplayInfo.add(35000).ModelID.set(3500)
std.SQL.creature_model_info.add(35000).BoundingRadius.set(1)
export let dungeonVase = std.CreatureTemplates.create(MODNAME,'dungeon-vase',21185)
dungeonVase.Name.enGB.set('Dungeon Vase')
dungeonVase.Level.set(20,20)
dungeonVase.Models.clearAll()
dungeonVase.Models.addIds(35000)
dungeonVase.Scale.set(0.3)
dungeonVase.FactionTemplate.set(189)

export let dungeonFinalObj = std.GameObjectTemplates.Rituals.create(
    MODNAME,
    "dungeonendobj",
    177193
);
dungeonFinalObj.Name.enGB.set("Mystical Stone");

export let dungeonChest = std.GameObjectTemplates.Rituals.create(
    MODNAME,
    "dungeon-chest",
    177193
);
dungeonChest.Name.enGB.set("Animare Chest");
dungeonChest.Display.set(88077)
dungeonChest.Size.set(2)

export let dungeonOrb = std.CreatureTemplates.create(
    MODNAME,
    "dungeon-orb",
    40083
);
dungeonOrb.Name.enGB.set("Dungeon spell creature");
dungeonOrb.Scale.set(0.5);
dungeonOrb.HoverHeight.set(2);

export let dungeonChoice = std.Spells.create(
    MODNAME,
    "dungeonchoice-spell",
    66701
);
dungeonChoice.Name.enGB.set("Animare Cell Spawn");
dungeonChoice.Description.enGB.set(
    "Using this allows you and your alies to select an additional power."
);
dungeonChoice.Effects.get(0).ImplicitTargetA.DEST_DEST_FRONT.set();
dungeonChoice.Effects.get(0).Radius.setSimple(5, 0, 5);
dungeonChoice.Effects.get(0).Type.SUMMON.set();
dungeonChoice.Effects.get(0).MiscValueA.set(dungeonOrb.ID);
dungeonChoice.Effects.get(0).MiscValueB.set(64);

export let animareCellItem = std.Items.create(
    MODNAME,
    "dungeonchoice-item",
    118
);
animareCellItem.Name.enGB.set("Animare Cell");
animareCellItem.Spells.clearAll();
animareCellItem.Spells.addMod((spell) => {
    spell.Spell.set(dungeonChoice.ID);
    spell.Charges.set(1,"DELETE_ITEM");
    spell.ProcsPerMinute.set(-1);
    spell.Cooldown.set(3000);
});

export let mapPrestige = std.Spells.create(MODNAME, "mapprestige-spell", 71188);
mapPrestige.Name.enGB.set("Prestige");
mapPrestige.Description.enGB.set(
    "Damage done increased by $s1%. Health increased by $s2%."
);
mapPrestige.AuraDescription.enGB.set(
    "Damage done increased by $s1%. Attack and casting speeds increased by $s2%. Health increased by $s3%."
);
mapPrestige.Effects.get(0).PointsBase.set(9);
mapPrestige.Effects.get(1).PointsBase.set(9);
mapPrestige.Effects.get(2).PointsBase.set(9);
mapPrestige.Effects.get(2).Aura.MOD_INCREASE_HEALTH_PERCENT.set();
mapPrestige.Duration.set(21);
mapPrestige.row.Attributes.set(
    mapPrestige.row.Attributes.get() + 0x80000000 + 0x00000080
);
mapPrestige.Attributes.PERSISTS_DEATH.set(1);
mapPrestige.Attributes.NOT_STEALABLE.set(1);
mapPrestige.Attributes.AURA_VISIBLE_TO_CASTER_ONLY.set(1);

std.DBC.CurrencyCategory.add(50).Name.enGB.set('dungeon').Flags.set(16712190)

export let dungeonEndCurrency = std.Items.create(MODNAME,'dungeon-end-currency',37742)
dungeonEndCurrency.Name.enGB.set('dungeon End Token')
dungeonEndCurrency.Description.enGB.set('This currency is rewarded from dungeon')
dungeonEndCurrency.MaxStack.set(2147483647)
dungeonEndCurrency.MaxCount.set(2147483647)
std.DBC.CurrencyTypes.add(350).ItemID.set(dungeonEndCurrency.ID).CategoryID.set(50).BitIndex.set(60)

export let dungeonInsideCurrency = std.Items.create(MODNAME,'dungeon-inside-currency',37742)
dungeonInsideCurrency.Name.enGB.set('dungeon Inside Token')
dungeonEndCurrency.Description.enGB.set('This currency is rewarded inside dungeon')
dungeonInsideCurrency.MaxStack.set(2147483647)
dungeonInsideCurrency.MaxCount.set(2147483647)
std.DBC.CurrencyTypes.add(351).ItemID.set(dungeonInsideCurrency.ID).CategoryID.set(50).BitIndex.set(60)

std.DBC.ItemExtendedCost.add(6000)
.ItemCount.fill(0).ItemCount.set([500])
.ItemID.fill(0).ItemID.set([dungeonInsideCurrency.ID])
.HonorPoints.set(0).ArenaPoints.set(0)

let dungeonVendor = std.CreatureTemplates.create(
    MODNAME,
    "dungeon-vendor",
    3562
);
dungeonVendor.Name.enGB.set("Test Vendor");
dungeonVendor.Subname.enGB.set("All Powerful");
dungeonVendor.FactionTemplate.set(35);
dungeonVendor.Vendor.add(animareCellItem.ID,6000);