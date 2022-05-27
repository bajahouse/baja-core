const adventererID = GetIDTagUnique('class-switcher', 'adventurer-class')

export function rageGeneration(events: TSEvents) {
    events.Unit.OnMeleeDamageLate((info, damage, type, index) => {
        if (info.GetAttacker().GetClass() == adventererID) {
            let attacker = info.GetAttacker()
            let addRage;
            let rageconversion = ((0.0091107836 * attacker.GetLevel() * attacker.GetLevel()) + 3.225598133 * attacker.GetLevel()) + 4.2652911;
            if (attacker.GetLevel() > 70)
                rageconversion += 13.27 * (attacker.GetLevel() - 70);
            addRage = (damage.get() / rageconversion * 7.5) / 2;
            attacker.SetPower(Powers.RAGE, attacker.GetPower(Powers.RAGE) + <uint32>(addRage * 10))
        }
        if (info.GetTarget().GetClass() == adventererID) {
            let target = info.GetTarget()
            let rageconversion = ((0.0091107836 * target.GetLevel() * target.GetLevel()) + 3.225598133 * target.GetLevel()) + 4.2652911;
            if (target.GetLevel() > 70)
                rageconversion += 13.27 * (target.GetLevel() - 70);
            let addRage = damage.get() / rageconversion * 2.5;
            // Berserker Rage effect
            if (target.HasAura(18499))
                addRage *= 2.0;
            target.SetPower(Powers.RAGE, target.GetPower(Powers.RAGE) + <uint32>(addRage * 10))
        }
    })
}