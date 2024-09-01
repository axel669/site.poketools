<script>
    import {
        Screen,
        Paper,
        Titlebar,
        Text,
        Input,
        Button,
        Tabs,
        Link,
        Icon,

        Route,
        relpath,

        HexagonSpinner as Spinner,

        Form,
        Grid,

        wsx,
    } from "@axel669/zephyr"
    import { pokedex, ref } from "#state/dex"

    import Search from "./comp/search.svelte"
    import Complex from "./comp/complex.svelte"
    import Pokemon from "./comp/pokemon.svelte"
    import Ability from "./comp/ability.svelte"
    import Move from "./comp/move.svelte"
</script>

<svelte:body use:wsx={{ "@@theme": "dark", "@@app": true }} />

<Screen>
    <Paper card square color="@primary" r="0px" p="0px">
        <Titlebar color="@primary" fill slot="header">
            <Text title slot="title">
                PokeTools
            </Text>

            <Link button href="#" slot="menu" m="2px">
                <Icon name="house" t.sz="20px" />
            </Link>
        </Titlebar>

        {#if $pokedex === null}
            <Spinner size="100" />
        {:else}
            <Route exact>
                <Link href={relpath("search-name")} button outline>
                    Search by Name
                </Link>
                <Link href={relpath("search-complex")} button outline>
                    Search by Attributes
                </Link>
            </Route>
            <Route path="search-name" component={Search} />
            <Route path="search-complex" component={Complex} />
            <Route path="pokemon/:id" let:routeInfo>
                {#if $ref.dex[routeInfo.params.id] === undefined}
                    <Text>Could not find pokemon</Text>
                {:else}
                    <Pokemon pokemon={$ref.dex[routeInfo.params.id]} />
                {/if}
            </Route>
            <Route path="ability/:id" let:routeInfo>
                {#if $ref.ability[routeInfo.params.id] === undefined}
                    <Text>Could not find ability</Text>
                {:else}
                    <Ability ability={$ref.ability[routeInfo.params.id]} />
                {/if}
            </Route>
            <Route path="move/:id" let:routeInfo>
                {#if $ref.move[routeInfo.params.id] === undefined}
                    <Text>Could not find move</Text>
                {:else}
                    <Move move={$ref.move[routeInfo.params.id]} />
                {/if}
            </Route>
        {/if}
    </Paper>
</Screen>
