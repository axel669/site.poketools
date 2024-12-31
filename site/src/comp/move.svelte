<script>
    /** @import { Move } from "#state/dex" */
    import {
        Paper,
        Titlebar,
        Text,
        Table,

        Grid,
        Flex,

        Title,
    } from "@axel669/zephyr"

    // import { ref } from "#state/dex"
    import Info from "./pokemon/info.svelte"

    /** @type {Move} */
    export let move
</script>

<Title data={move.name} />

<Paper card color="@secondary" h="100%">
    <Titlebar slot="header" fill color="@secondary">
        <Text slot="title" title>
            {move.name}
        </Text>
    </Titlebar>

    <Grid p="0px" colsFit="150px, 1fr" gap="8px">
        <Info label="Type" value={move.type} />
        <Info label="Category" value={move.category} />
        <Info label="Power" value={move.power} />
        <Info label="PP" value={move.pp} />
        <Info label="Accuracy" value="{move.accuracy}%" />
        {#if move.effect !== null}
            <Info label="Status Effect Chance" value="{move.effect}%" />
        {/if}
    </Grid>

    <Text>
        {move.desc}
    </Text>
</Paper>
