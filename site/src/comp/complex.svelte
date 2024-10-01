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
    import Group from "./complex/group.svelte"

    let list = [""]
    let results = null

    const createQuery = (condition) => {
        if (condition.op !== undefined) {
            return {
                [`$${condition.op}`]: condition.cond.map(createQuery)
            }
        }

        if (condition.type === "move") {
            return { "moves.name": condition.name }
        }
        if (condition.type === "type") {
            return { "types": condition.name.toLowerCase() }
        }
        if (condition.type === "ability") {
            return {
                $or: [
                    { "ability.normal.name": condition.name },
                    { "ability.hidden.name": condition.name },
                ]
            }
        }

        throw new Error(`Unsupported search type: ${condition.type}`)
    }

    const find = () => {
        console.log(search)
        const query = createQuery(search)
        console.log(query)
        const finder = new Aggregator([
            { $match: query }
        ])
        results = finder.run($pokedex)
        console.log(results)
        return
        // const query = new Aggregator([
        //     {$match: {
        //         $and: list.map(
        //             name => ({ "moves.name": name })
        //         )
        //     }},
        //     {$project: {
        //         id: 1,
        //         name: 1,
        //         formName: 1,
        //         moves: {
        //             $filter: {
        //                 input: "$moves",
        //                 as: "moves",
        //                 cond: {
        //                     $in: ["$$moves.name", list]
        //                 }
        //             }
        //         }
        //     }}
        // ])
        // results = query.run($pokedex)
        // console.log(results)
    }

    let search = { op: "and", cond: [] }
    // $: console.log(search)
</script>

<Grid cols="1fr 1fr">
    <Button on:click={find} outline color="@secondary">
        Search
    </Button>
</Grid>
<Group bind:item={search} />
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

                <!-- {#each mon.moves as move}
                    <div>{move.name} @ {JSON.stringify(move.source)}</div>
                {/each} -->
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
