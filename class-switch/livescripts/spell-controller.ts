import { spellsList } from "./spells";

@CharactersTable
export class PlayerClassInfo extends DBEntry {
    @DBPrimaryKey
    player: uint64 = 0
    @DBField
    currentClassID: uint32 = 1;

    constructor(player: uint64) {
        super();
        this.player = player;
    }

    static get(player: TSPlayer): PlayerClassInfo {
        return player.GetObject('PlayerClassInfo', LoadDBEntry(new PlayerClassInfo(player.GetGUID())))
    }
}
const adventurerClassID = GetIDTagUnique('class-switcher', 'adventurer-class')
export function spellController(events: TSEvents) {
    events.Player.OnLogin((player, first) => {
        if (player.GetClass() == adventurerClassID) {
            if (first) {
                controlSpells(player, PlayerClassInfo.get(player).currentClassID, true)
            }
            //applyClassAura(player,PlayerClassInfo.get(player).currentClassID)
        }
    })
    events.Player.OnLevelChanged((player, oldLevel) => {
        if (player.GetClass() == adventurerClassID)
            controlSpells(player, PlayerClassInfo.get(player).currentClassID, true)
    })

    events.Player.OnCommand((player, command, found) => {
        let split = command.get().split(" ")

        if (split[0] == "classswap" && player.GetClass() == adventurerClassID) {
            found.set(true)
            swapChosenClass(player, ToUInt32(split[1]))
        }
    })
}

function swapChosenClass(player: TSPlayer, newClassChoice: uint32) {
    if (newClassChoice > 11 || newClassChoice <= 0 || newClassChoice == 6 || newClassChoice == 10 || PlayerClassInfo.get(player).currentClassID == newClassChoice)
        return
    if (player.IsInCombat())
        return

    controlSpells(player, PlayerClassInfo.get(player).currentClassID, false)
    PlayerClassInfo.get(player).currentClassID = newClassChoice
    PlayerClassInfo.get(player).Save()
    controlSpells(player, newClassChoice, true)
}

function controlSpells(player: TSPlayer, chosenClass: uint32, learn: bool) {
    let curLevel = player.GetLevel();
    let curClassSpells = spellsList[chosenClass];
    if (learn) {
        for (let j = 1; j < curClassSpells.length; j++) {
            let spells = curClassSpells[j];
            for (let i = 0; i < spells.length; i++) {
                if (j <= curLevel && !player.HasSpell(spells[i])) {
                    player.LearnSpell(spells[i]);
                }
            }
        }
    } else {
        for (let j = curClassSpells.length - 1; j > 0; j--) {
            let spells = curClassSpells[j];
            for (let i = 0; i < spells.length; i++) {
                player.RemoveSpell(spells[i],false,false);
            }
        }
    }
}