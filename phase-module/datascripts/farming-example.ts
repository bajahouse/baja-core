import { std } from "wow/wotlk";
import { MODNAME } from "./farming-base";
import { makeHousingItemForGob, makeHousingItemForCreature, setupAreaForCrops, makeHousingItemForCrop, makeHousingItemForFertilizer } from "./farming-functions";

setupAreaForCrops(64, 10)

makeHousingItemForGob(10192, "Wooden Chair")
makeHousingItemForCreature(2671, "Squirrel")
let rewardHarvest = std.Items.create(MODNAME, "farming-reward-harvest", 738);
makeHousingItemForCrop(188667,188691,'Wheat',10000,rewardHarvest.ID,1,3)
makeHousingItemForFertilizer('Water',13)//multiply by 10, 1.3->13