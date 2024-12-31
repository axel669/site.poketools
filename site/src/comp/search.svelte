<script>
    import {
        Input,
        Text,
        Paper,
        Link,
        Icon,

        Grid,

        Title,
    } from "@axel669/zephyr"

    import { autocomplete, ref } from "#state/dex"

    import Pokemon from "./pokemon.svelte"

    let value = ""
    $: pokemon = $ref.dexDisplay[value]

    $: filtered = $autocomplete.pokemonName.filter(
        name => name.toLowerCase().includes(value.toLowerCase())
    )

    // $: console.log(filtered)
</script>

<Title data="Name Search" />

<Paper r="0px" h="100%" b.w="0px" sh.box="none" l-p="8px 0px">
    <Input bind:value label="Filter Name" slot="header" flat r="0px" />

    <Grid colsFit="300px, 1fr" p="0px" gap="8px">
        {#each filtered as name}
            <Link button outline href="#/pokemon/{$ref.dexDisplay[name].id}"
            target="_blank">
                {name}
                &nbsp;
                <Icon name="box-arrow-up-right" />
            </Link>
        {/each}
    </Grid>
</Paper>
