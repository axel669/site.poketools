<script>
    import {
        Screen,
        Titlebar,
        Button,
        Paper,
        Text,
    } from "@axel669/zephyr"

    import Pokemon from "../pokemon.svelte"

    export let close
    export let pokemon
</script>

<Screen>
    <Paper card r="0px" color="@primary" scrollable={false}>
        <Titlebar slot="header" fill color="@primary">
            <Text slot="title" title>Quick View</Text>

            <Button on:click={() => close()} slot="action">
                Close
            </Button>
        </Titlebar>

        <Pokemon {pokemon} />
    </Paper>
</Screen>
