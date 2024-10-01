<script>
    import {
        Input,
        Button,
        Text,
        Paper,
        EntryButton,
        Link,

        handler$,

        Grid,
        Flex,
    } from "@axel669/zephyr"
    import { autocomplete, pokedex, ref } from "#state/dex"
    import { Query, Aggregator } from "mingo"

    import PokemonOverlay from "./complex/pokemon-overlay.svelte"

    let list = [""]
    let results = null
    const find = () => {
        const query = new Aggregator([
            {$match: {
                $and: list.map(
                    name => ({ "moves.name": name })
                )
            }},
            {$project: {
                id: 1,
                name: 1,
                formName: 1,
                moves: {
                    $filter: {
                        input: "$moves",
                        as: "moves",
                        cond: {
                            $in: ["$$moves.name", list]
                        }
                    }
                }
            }}
        ])
        results = query.run($pokedex)
        console.log(results)
    }
    const remove = handler$(
        (index) => list = list.filter(
            (_, i) => i !== index
        )
    )
</script>

<Grid cols="1fr 1fr">
    <Button on:click={() => list = [...list, ""]} outline color="@primary">
        Add
    </Button>
    <Button on:click={find} outline color="@secondary">
        Search
    </Button>
</Grid>
{#each list as name, index}
    <Grid cols="min-content 1fr">
        <Button on:click={remove(index)} outline color="@danger">X</Button>
        <Input bind:value={name} autocompleteOptions={$autocomplete.moveName} />
    </Grid>
{/each}
{#if results !== null}
    <Text>Results:</Text>
    <Flex gap="12px" p="0px">
        {#each results as mon}
            <Paper card>
                <Text title slot="header">
                    {mon.name}
                    {#if mon.formName !== null}
                        ({mon.formName})
                    {/if}
                </Text>

                {#each mon.moves as move}
                    <div>{move.name} @ {JSON.stringify(move.source)}</div>
                {/each}
                <EntryButton props={{ pokemon: $ref.dex[mon.id] }}
                component={PokemonOverlay} outline>
                    Quick View
                </EntryButton>

                <Link button href="#/pokemon/{mon.id}" target="_blank">
                    View Page
                </Link>
            </Paper>
        {/each}
    </Flex>
{/if}
