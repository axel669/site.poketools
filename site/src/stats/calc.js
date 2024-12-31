const hp = (info, level) => {
    const iv = info.iv
    const base = info.base
    const ev = Math.floor(info.ev / 4)

    const corePart = (2 * base + iv + ev) * level
    return Math.floor(corePart / 100) + level + 10
}
const stat = (info, level, nature) => {
    const iv = info.iv
    const base = info.base
    const ev = Math.floor(info.ev / 4)

    const corePart = (2 * base + iv + ev) * level
    const levelPart = Math.floor(corePart / 100) + 5
    return Math.floor(levelPart * nature)
}

const damage = (args) => {
    const {
        attacker,
        defender,
        crit = false,
        move,
        stab = 1,
        effect = 1,
        weather = 1
    } = args
    const levelPart = Math.floor((2 * attacker.level) / 5) + 2
    const atk = stat(move.category === "physical" ? attacker.atk : attacker.satk, attacker.level, 1)
    const def = stat(move.category === "physical" ? defender.def : defender.sdef, defender.level, 1)
    const powerPart = move.power * (atk / def)
    const base = Math.floor(((levelPart * powerPart) / 50) + 2)

    const mods = [
        crit ? 1.5 : 1,
        stab,
        effect,
        weather,
    ]
    // console.log({
    //     level: attacker.level,
    //     atk,
    //     def,
    //     power: move.power,
    //     levelPart,
    //     powerPart,
    //     base,
    //     mods,
    // })
    return mods.reduce(
        (dmg, mod) => (console.log(dmg * mod), Math.floor(dmg * mod)),
        base
    )
}

export default { hp, stat, damage }
