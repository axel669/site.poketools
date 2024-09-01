<script>
    import {
        Paper,
        Titlebar,
        Text,
        Table,
        Link,

        Grid,
        Flex,
    } from "@axel669/zephyr"
    import sort from "@axel669/array-sort"

    import Info from "./pokemon/info.svelte"

    export let pokemon

    console.log(pokemon)

    const statData = [
        ["HP", pokemon.stats.hp, "rgb(105, 220, 18)"],
        ["Attack", pokemon.stats.atk, "rgb(239, 204, 24)"],
        ["Defense", pokemon.stats.def, "rgb(232, 100, 18)"],
        ["Sp. Attack", pokemon.stats.satk, "rgb(20, 195, 241)"],
        ["Sp. Defense", pokemon.stats.sdef, "rgb(74, 106, 223)"],
        ["Speed", pokemon.stats.spd, "rgb(213, 29, 173)"],
    ]

    const moveList = [...pokemon.moves].sort(
        sort.compose(
            sort.prop(".name", sort.natural),
            sort.prop(".source", sort.natural),
        )
    )
</script>

<Paper card color="@secondary" h="100%">
    <Titlebar slot="header" fill color="@secondary">
        <Text slot="title" title>
            {pokemon.displayName}
            <Text subtitle>
                {pokemon.species}
            </Text>
        </Text>
    </Titlebar>

    <Grid p="0px" colsFit="150px, 1fr" gap="8px">
        <Info label="Number" value={pokemon.number} />
        <Info label="Type" value={pokemon.types.join(" / ")} />
        <Info label="Height" value="{pokemon.height.imperial}lbs" />
        <Info label="Weight" value="{pokemon.weight.imperial}lbs" />
        <Info label="Normal Abilities">
            <Link href="#/ability/{pokemon.ability.normal[0].id}">
                {pokemon.ability.normal[0].name}
            </Link>
            {#if pokemon.ability.normal.length > 1}
                <Link href="#/ability/{pokemon.ability.normal[1].id}">
                    {pokemon.ability.normal[1].name}
                </Link>
            {/if}
        </Info>
        <Info label="Hidden Ability">
            {#if pokemon.ability.hidden !== null}
                <Link href="#/ability/{pokemon.ability.hidden.id}">
                    {pokemon.ability.hidden.name}
                </Link>
            {/if}
        </Info>
    </Grid>

    <Table data={statData} h="1px">
        <tr slot="header">
            <td ws-x="[w 120px]">Stat</td>
            <td ws-x="[w 80px]">Value</td>
            <td></td>
        </tr>

        <tr slot="row" let:row>
            <td>{row[0]}</td>
            <td>{row[1]}</td>
            <td ws-x="[h 100%]">
                <div ws-x="[h 100%] [w {(row[1] / 255) * 100}%] [bg {row[2]}]" />
            </td>
        </tr>
    </Table>

    <Table data={moveList} fillHeader color="@primary">
        <tr slot="header">
            <th ws-x="[y 0px]">Name</th>
            <th ws-x="[y 0px]">Learn</th>
            <th ws-x="[y 0px]">Type</th>
            <th ws-x="[y 0px]">Cat</th>
            <th ws-x="[y 0px]">Power</th>
        </tr>

        <tr slot="row" let:row>
            <th>{row.name}</th>
            <td>{row.source}</td>
            <td>{row.type}</td>
            <td>{row.category}</td>
            <td>{row.power}</td>
        </tr>
    </Table>
</Paper>
