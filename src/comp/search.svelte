<script>
    import {
        Input,
        Text,
        Paper,
    } from "@axel669/zephyr"

    import { autocomplete, ref } from "#state/dex"

    import Pokemon from "./pokemon.svelte"

    let value = ""
    $: pokemon = $ref.dexDisplay[value]
</script>

<Paper r="0px" h="100%" b.w="0px" sh.box="none" l-p="8px 0px" scrollable={false}>
    <Input
        bind:value
        label="Pokemon Name"
        autocompleteOptions={$autocomplete.pokemonName}
        slot="header"
        flat
        r="0px"
    />

    {#if pokemon !== undefined}
        <Pokemon {pokemon} />
    {/if}
</Paper>
