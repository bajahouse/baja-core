import { classSwap, classSwapID } from "../shared/Messages";
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
const classAuras: TSArray<uint32> = GetIDTag('class-switcher', 'class-auras')

export function spellController(events: TSEvents) {
    events.Player.OnLogin((player, first) => {
        if (player.GetClass() == adventurerClassID) {
            if (first) {
                controlSpells(player, PlayerClassInfo.get(player).currentClassID, true)
            }
            player.AddAura(classAuras[PlayerClassInfo.get(player).currentClassID - 1], player)
        }
    })
    events.Player.OnLevelChanged((player, oldLevel) => {
        if (player.GetClass() == adventurerClassID)
            controlSpells(player, PlayerClassInfo.get(player).currentClassID, true)
    })

    events.CustomPacketID.OnReceive(classSwapID, (opcode, packet, player) => {
        let pkt = new classSwap(1)
        pkt.read(packet)
        if (player.GetClass() == adventurerClassID)
            swapChosenClass(player, pkt.classID)
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
        if (chosenClass == 11)
            player.AddAura(classAuras[9], player)
        else
            player.AddAura(classAuras[chosenClass - 1], player)
        for (let j = 1; j < curClassSpells.length; j++) {
            let spells = curClassSpells[j];
            for (let i = 0; i < spells.length; i++) {
                if (j <= curLevel && !player.HasSpell(spells[i])) {
                    player.LearnSpell(spells[i]);
                }
            }
        }
    } else {
        if (chosenClass == 11) {
            if (player.HasAura(classAuras[9]))
                player.RemoveAura(classAuras[9])
        }
        else {
            if (player.HasAura(classAuras[chosenClass - 1]))
                player.RemoveAura(classAuras[chosenClass - 1])
        }

        for (let j = curClassSpells.length - 1; j > 0; j--) {
            let spells = curClassSpells[j];
            for (let i = 0; i < spells.length; i++) {
                player.RemoveSpell(spells[i], false, false);
            }
        }
    }
}