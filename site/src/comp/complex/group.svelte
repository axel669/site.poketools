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

    import Move from "./move.svelte"
    import Ability from "./ability.svelte"
    import Type from "./type.svelte"

    export let item

    const condition = {
        move: Move,
        ability: Ability,
        type: Type,
    }
    const options = [
        { label: "All of", value: "and" },
        { label: "Any of", value: "or" }
    ]

    const addGroup = () => {
        item.cond = [...item.cond, { op: "and", cond: [] }]
    }
    const addMove = () => {
        item.cond = [...item.cond, { type: "move", name: "" }]
    }
    const addAbility = () => {
        item.cond = [...item.cond, { type: "ability", name: "" }]
    }
    const addType = () => {
        item.cond = [...item.cond, { type: "type", name: "" }]
    }
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
            {#if cond.op !== undefined}
                <svelte:self bind:item={cond} />
            {:else}
                <svelte:component this={condition[cond.type]} bind:item={cond} />
            {/if}
        {/each}
    </Grid>

    <Grid cols="1fr 1fr 1fr 1fr" slot="footer">
        <Button outline on:click={addGroup} ground>
            +Group
        </Button>
        <Button outline on:click={addMove} ground>
            +Move
        </Button>
        <Button outline on:click={addAbility} ground>
            +Ability
        </Button>
        <Button outline on:click={addType} ground>
            +Type
        </Button>
    </Grid>
</Paper>
