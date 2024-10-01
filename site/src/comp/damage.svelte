<script>
    import {
        Input,
    } from "@axel669/zephyr"

    let stat = 0

    const hpCalc = (info, level) => {
        const iv = info.iv
        const base = info.base
        const ev = Math.floor(info.ev / 4)

        const corePart = (2 * base + iv + ev) * level
        return Math.floor(corePart / 100) + level + 10
    }
    const statCalc = (info, level, nature) => {
        const iv = info.iv
        const base = info.base
        const ev = Math.floor(info.ev / 4)

        const corePart = (2 * base + iv + ev) * level
        const levelPart = Math.floor(corePart / 100) + 5
        return Math.floor(levelPart * nature)
    }

    $: st = parseInt(stat)
    $: leveled = statCalc({ base: 130, iv: 12, ev: 190}, 78, 1.1)
    $: min = statCalc({ base: 130, iv: 0, ev: 0}, 100, 0.9)
    $: max = statCalc({ base: 130, iv: 31, ev: 252}, 100, 1.1)
</script>

<Input type="number" bind:value={stat} label="Stat" />

<div>Stat: {stat}</div>
<div>Level 100: {leveled} ({min} - {max})</div>
<div>
    {hpCalc({ base: 108, iv: 0, ev: 0 }, 100)} -
    {hpCalc({ base: 108, iv: 31, ev: 252 }, 100)}
</div>
