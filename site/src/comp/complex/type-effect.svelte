<script context="module">
    const options = [
        { label: "Weak to", value: "weak", query: {$gt: 1} },
        { label: "Resists", value: "resist", query: {$lt: 1} },
        { label: "Neutral to", value: "neutral", query: {$eq: 1} },
        { label: "Immune to", value: "immune", query: {$eq: 0} },
        { label: "Not weak to", value: "not-weak", query: {$lte: 1} },
        { label: "Does not resist", value: "not-resist", query: {$gte: 1} },
    ]
    const effective = options.reduce(
        (e, opt) => {
            e[opt.value] = opt.query
            return e
        },
        {}
    )
    export const info = {
        button: "+Weak/Resist",
        init: () => {
            const cond = {
                type: "type-effect",
                name: "",
                effect: options[0].value,
                query: () => ({
                    typeEffect: {
                        $elemMatch: {
                            type: cond.name.toLowerCase(),
                            effect: effective[cond.effect],
                        },
                    },
                })
            }
            return cond
        },
    }
</script>

<script>
    import {
        Grid,
        Select,
        Input,
    } from "@axel669/zephyr"
    import { typeDisplay } from "#state/refs"

    export let item
</script>

<Grid cols="1fr 1fr" p="0px">
    <Select {options} label="Effectiveness" bind:value={item.effect} />
    <Input
        flat
        type="text"
        label="Type"
        bind:value={item.name}
        autocompleteOptions={Object.values(typeDisplay)}
        b.l="4px solid @secondary"
    />
</Grid>
