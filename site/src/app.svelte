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
        EntryButton,

        Route,
        relpath,

        HexagonSpinner as Spinner,

        Form,
        Grid,

        wsx,
    } from "@axel669/zephyr"
    import { pokedex, ref } from "#state/dex"
    import theme from "#state/theme"

    import Search from "./comp/search.svelte"
    import Complex from "./comp/complex.svelte"
    import Pokemon from "./comp/pokemon.svelte"
    import Ability from "./comp/ability.svelte"
    import Move from "./comp/move.svelte"
    import Damage from "./comp/damage.svelte"

    import Menu from "./comp/menu.svelte"
</script>

<svelte:body use:wsx={{ "@@theme": $theme, "@@app": true }} />

<Screen>
    <Paper card square color="@primary" r="0px" p="0px">
        <Titlebar color="@primary" fill slot="header">
            <Text title slot="title">
                <Link href="#" self-cross="start" t.c="@text-invert" t.dec="none">
                    PokeTools
                </Link>
            </Text>

            <EntryButton ground component={Menu} slot="menu">
                <Icon name="list" t.sz="20px" />
            </EntryButton>
        </Titlebar>

        {#if $pokedex === null}
            <div ws-x="[t.a center]">
                <Text disp="block" title>
                    Loading Data
                </Text>
                <Spinner size="100" />
            </div>
        {:else}
            <Route exact>
                <Link href={relpath("search-name")} button outline>
                    Search by Name
                </Link>
                <Link href={relpath("search-complex")} button outline>
                    Search by Attributes
                </Link>
                <Link href={relpath("damage-calc")} button outline>
                    Damage Calculator
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
            <Route path="damage-calc" component={Damage} />
        {/if}
    </Paper>
</Screen>
