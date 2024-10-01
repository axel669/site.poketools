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

export default { hp, stat }
