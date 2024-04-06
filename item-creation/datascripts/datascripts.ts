import { std } from "wow/wotlk";
//used for reforging
const DOOM_REFORGER = std.GameObjectTemplates.Rituals.create('item-creation', 'reforge-master', 177193)
    .Name.enGB.set('Altar of Magical Transmutation').Tags.addUnique('item-creation', 'reforge-altar')
