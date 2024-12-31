<script context="module">
    const init = () => {
        const cond = {
            type: "group",
            op: "$and",
            cond: [],
            query: () => ({
                [cond.op]: cond.cond.map(
                    cond => cond.query()
                )
            })
        }
        return cond
    }
    export const groupInit = () => {
        const search = init()
        search.component = null
        return search
    }
</script>

<script>
    import {
        Button,
        Icon,
        Select,
        Paper,
        Text,

        Flex,
        Grid,

        handler$,
    } from "@axel669/zephyr"

    import * as Move from "./move.svelte"
    import * as Ability from "./ability.svelte"
    import * as Type from "./type.svelte"
    import * as Stat from "./stat.svelte"
    import * as TypeEffect from "./type-effect.svelte"

    export let item

    // const condition = {
    //     move: Move,
    //     ability: Ability,
    //     type: Type,
    //     stat: Stat,
    // }
    const options = [
        { label: "All of", value: "$and" },
        { label: "Any of", value: "$or" }
    ]

    const Group = {
        default: null,
        info: {
            button: "+Group",
            init,
        }
    }
    const list = [
        Group,
        Move,
        Ability,
        Type,
        Stat,
        TypeEffect,
    ]

    const addCondition = handler$(
        (condition) => {
            const cond = condition.info.init()
            cond.component = condition.default
            item.cond = [ ...item.cond, cond ]
        }
    )
    const remove = handler$(
        (cond) => item.cond = item.cond.filter(c => c !== cond)
    )
</script>

<Paper b.l="4px solid @primary" !$ground>
    <div slot="header" ws-x="[p.l 4px]">
        <Text>Group Condition</Text>
        <Select {options} bind:value={item.op} />
    </div>

    <Grid cols="min-content 1fr" p="0px" gap="8px" fl.cross="start">
        {#each item.cond as cond}
            <Button on:click={remove(cond)} ground color="@danger" fill p="4px 12px">
                <Icon name="trash" />
            </Button>
            {#if cond.component === null}
                <svelte:self bind:item={cond} />
            {:else}
                <svelte:component this={cond.component} bind:item={cond} />
            {/if}
        {/each}
    </Grid>

    <Grid cols="1fr 1fr 1fr" slot="footer">
        {#each list as condition}
            <Button outline on:click={addCondition(condition)} ground>
                {condition.info.button}
            </Button>
        {/each}
    </Grid>
</Paper>
