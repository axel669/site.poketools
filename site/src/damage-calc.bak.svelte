<script>
    import {
        Screen,
        Paper,
        Titlebar,
        Text,

        Form,
        Grid,

        wsx,
    } from "@axel669/zephyr"

    const numeric = {
        initial: "50",
        out: text => parseInt(text),
    }
    const labeled = (name, label, min, max) => ({
        name,
        props: {
            label,
            type: "number",
            "i-min": min,
            "i-max": max,
        },
        value: numeric
    })
    const fields = [
        labeled("level", "Level", 1, 100),
        labeled("attack", "Attack Stat", 1, 500),
        labeled("defense", "Defense Stat", 1, 500),
        labeled("power", "Move Power", 1, 500),
    ]
    let values = {
        level: 5,
        attack: 11,
        defense: 13,
        power: 40,
        stab: 1,
        type: 1,
        crit: 1,
        ability: 1,
        terrain: 1,
    }

    $: levelPower = ((2 * values.level) + 10) / 250
    $: statPower = (values.attack / values.defense)
    $: movePower = values.power
    $: basedmg = Math.floor((levelPower * statPower * movePower) + 2)

    $: modifier = (
        values.stab
        * values.type
        * values.crit
        * values.ability
        * values.terrain
    )

    // $: console.log(levelPower, statPower, movePower, basedmg)

    $: damage = [
        Math.floor(basedmg * modifier * 0.85),
        Math.floor(basedmg * modifier)|0,
    ]
</script>

<svelte:head>
    <title>PokeTools</title>
</svelte:head>
<svelte:body use:wsx={{ "@@theme": "tron", "@@app": true }} />

<Screen>
    <Paper card square>
        <Titlebar slot="header">
            <Text title slot="title">
                Pokemon Damage Calculator
            </Text>
        </Titlebar>

        <Grid cols="1fr 1fr">
            <Form {fields} bind:values />
        </Grid>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <div>Damage: {damage.join(" - ")}</div>
    </Paper>
</Screen>
