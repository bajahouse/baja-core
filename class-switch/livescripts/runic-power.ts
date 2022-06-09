export function runicPower(events: TSEvents) {
    events.Player.OnUpdateMaxPower((player, power, type, bonus) => {
        if (player.GetClass() == GetIDTagUnique('class-switcher', 'adventurer-class'))
            if (type == Powers.RUNIC_POWER)
                power.set(1000 + bonus);
    })
}