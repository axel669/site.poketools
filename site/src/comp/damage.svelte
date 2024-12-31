<script>
    import {
        Input,
        Grid,
        Select,
        // Form,
    } from "@axel669/zephyr"

    import Form from "#complib/form.svelte"
    import Text from "#complib/text.svelte"

    import { writable } from "svelte/store"

    import statCalc from "#stats/calc"
    import {
        statDisplay,
        statDisplayShort,
    } from "#state/refs"

    console.log(
        statCalc.damage({
            attacker: {
                level: 53,
                atk: {
                    base: 65,
                    iv: 31,
                    ev: 0
                },
                satk: {
                    base: 125,
                    iv: 31,
                    ev: 252,
                }
            },
            defender: {
                level: 53,
                def: {
                    base: 60,
                    iv: 31,
                    ev: 0
                },
                sdef: {
                    base: 140,
                    iv: 31,
                    ev: 0,
                }
            },
            move: {
                power: 60,
                category: "physical",
                // power: 90,
                // category: "special",
            },
            stab: 1.5,
            effect: 2,
        })
    )

    const statList = ["hp", "atk", "def", "satk", "sdef", "spd"]
    const asInt = stat => parseInt(stat)
    const statFields = (name) => [
        {
            component: Text,
            includeValues: true,
            props: {
                text: statDisplayShort[name],
                wsx: "[flex] [fl-center]"
            }
        },
        {
            name,
            out: asInt,
            props: {
                // label: "Stat",
                type: "number",
            }
        },
        {
            name: `${name}iv`,
            out: asInt,
            props: {
                // label: "IVs",
                type: "number",
            }
        },
        {
            name: `${name}ev`,
            out: asInt,
            props: {
                // label: "EVs",
                type: "number",
            }
        },
        (name === "hp")
        ? { skip: true }
        : {
            name: `${name}stage`,
            component: Select,
            props: {
                // label: "Stage",
                options: [
                    { label: "+6", value: 6 },
                    { label: "+5", value: 5 },
                    { label: "+4", value: 4 },
                    { label: "+3", value: 3 },
                    { label: "+2", value: 2 },
                    { label: "+1", value: 1 },
                    { label: "0", value: 0 },
                    { label: "-1", value: -1 },
                    { label: "-2", value: -2 },
                    { label: "-3", value: -3 },
                    { label: "-4", value: -4 },
                    { label: "-5", value: -5 },
                    { label: "-6", value: -6 },
                ]
            }
        },
        {skip: true}
    ]
    const fields = [
        {
            name: "level",
            out: asInt,
            props: {
                label: "Level",
                type: "number",
                col: "span 6",
            }
        },
        ...statList.map(statFields).flat()
    ]

    let levelValue = "100"
    let statSource = {
        hp: "1",
        hpiv: "1",
        hpev: "1",
        atk: "1",
        atkiv: "1",
        atkev: "1",
        atkstage: 0,
        def: "1",
        defiv: "1",
        defev: "1",
        defstage: 0,
        satk: "1",
        satkiv: "1",
        satkev: "1",
        satkstage: 0,
        sdef: "1",
        sdefiv: "1",
        sdefev: "1",
        sdefstage: 0,
        spd: "1",
        spdiv: "1",
        spdev: "1",
        spdstage: 0,
    }
    let stats = {
        hp: 1,
        hpiv: 1,
        hpev: 1,
        atk: 1,
        atkiv: 1,
        atkev: 1,
        atkstage: 0,
        def: 1,
        defiv: 1,
        defev: 1,
        defstage: 0,
        satk: 1,
        satkiv: 1,
        satkev: 1,
        satkstage: 0,
        sdef: 1,
        sdefiv: 1,
        sdefev: 1,
        sdefstage: 0,
        spd: 1,
        spdiv: 1,
        spdev: 1,
        spdstage: 0,
    }
    $: level = parseInt(levelValue)
</script>

<Grid cols="1fr 1fr 1fr 1fr 1fr 1fr" autoRow="50px">
    <Form {fields} bind:values={stats} bind:inputValues={statSource} />
</Grid>

<!-- <Input type="text" bind:value={$thing.test} />
<pre>{JSON.stringify($thing, null, 2)}</pre> -->

<!-- <Grid cols="1fr 1fr">
    <Form {fields} bind:values={stats} bind:inputValues={statSource} />
</Grid>
<pre>{JSON.stringify(stats, null, 2)}</pre>
<div>
    Level: {stats.level}
</div>
<Input type="number" label="Level" bind:value={levelValue} />
{#each statList as statID}
    <div>
        {statDisplay[statID]} ({ stats[statID] }):
        {statCalc[statID === "hp" ? "hp" : "stat"](
            { base: stats[statID], ev: 0, iv: 0 },
            level,
            0.9
        )}
    </div>
{/each} -->
<!-- <div>{statDisplay.hp} ({stats.hp}): {statCalc.hp({ base: stats.hp, ev: 0, iv: 0}, 0.9)}</div>
<div>{statDisplay.atk} ({stats.hp}): {statCalc.hp({ base: stats.hp, ev: 0, iv: 0}, 0.9)}</div> -->
