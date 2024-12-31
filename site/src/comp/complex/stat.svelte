<script context="module">
    export const info = {
        button: "+Stat",
        init: () => {
            const cond = {
                type: "stat",
                stat: "hp",
                compare: "$gte",
                value: "0",
                query: () => ({
                    [`stats.${cond.stat}`]: {
                        [cond.compare]: parseInt(cond.value),
                    },
                })
            }
            return cond
        }
    }
</script>

<script>
    import {
        Grid,
        Select,
        Input,
    } from "@axel669/zephyr"

    import { statDisplay } from "#state/refs"

    export let item

    const statList = Object.entries(statDisplay).map(
        ([value, label]) => ({ label, value })
    )
    const compareList = [
        { label: ">=", value: "$gte" },
        { label: "<=", value: "$lte" },
        { label: ">", value: "$gt" },
        { label: "<", value: "$lt" },
        { label: "=", value: "$eq" },
    ]
</script>

<Grid cols="2fr 1fr 1fr" p="0px">
    <Select flat options={statList} bind:value={item.stat} b.l="4px solid @secondary" label="Stat" />
    <Select flat options={compareList} bind:value={item.compare} b.l="4px solid @secondary" label="Is" />
    <Input
        flat
        type="number"
        label="Value"
        bind:value={item.value}
        b.l="4px solid @secondary"
    />
</Grid>
