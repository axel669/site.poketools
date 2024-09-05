<script>
    import {
        Icon,
        Input,
        Paper,
        Select,
        Tabs,
        Table,
        Text,
        Titlebar,

        Link,

        Grid,
        Flex,
    } from "@axel669/zephyr"
    import sort from "@axel669/array-sort"

    import { typeColor, typeDisplay, catDisplay } from "#state/refs"

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

    const gradient = [
        typeColor[pokemon.types[0]],
        typeColor[pokemon.types[1] ?? pokemon.types[0]],
    ].join(", ")

    const tabOptions = [
        {
            label: "Name ↓",
            value: sort.compose(
                sort.prop(".name", sort.natural),
                sort.prop(".source", sort.natural),
            )
        },
        {
            label: "Name ↑",
            value: sort.compose(
                sort.reverse(
                    sort.prop(".name", sort.natural)
                ),
                sort.prop(".source", sort.natural),
            )
        },
        {
            label: "Type ↓",
            value: sort.compose(
                sort.prop(".type", sort.string),
                sort.prop(".name", sort.natural),
                sort.prop(".source", sort.natural),
            )
        },
        {
            label: "Type ↑",
            value: sort.compose(
                sort.reverse(
                    sort.prop(".type", sort.string)
                ),
                sort.prop(".name", sort.natural),
                sort.prop(".source", sort.natural),
            )
        },
        {
            label: "Category ↓",
            value: sort.compose(
                sort.prop(".category", sort.string),
                sort.prop(".name", sort.natural),
                sort.prop(".source", sort.natural),
            )
        },
        {
            label: "Category ↑",
            value: sort.compose(
                sort.reverse(
                    sort.prop(".category", sort.string)
                ),
                sort.prop(".name", sort.natural),
                sort.prop(".source", sort.natural),
            )
        },
        {
            label: "Power ↓",
            value: sort.compose(
                sort.prop(".power", sort.number),
                sort.prop(".name", sort.natural),
                sort.prop(".source", sort.natural),
            )
        },
        {
            label: "Power ↑",
            value: sort.compose(
                sort.reverse(
                    sort.prop(".power", sort.number)
                ),
                sort.prop(".name", sort.natural),
                sort.prop(".source", sort.natural),
            )
        },
    ]
    let moveSort = tabOptions[0].value

    let filterText = ""

    const moves = [...pokemon.moves]
    $: filter = filterText.toLowerCase().replace(/\s+/, " ").trim()
    $: moveList =
        moves
        .filter(
            move => (
                move.name.toLowerCase().includes(filter) === true
                || move.category.includes(filter) === true
                || move.type.includes(filter) === true
                || move.id.includes(filter) === true
            )
        )
        .sort(moveSort)
</script>

<Paper h="100%" l-gap="8px" l-p="0px">
    <Titlebar slot="header" fill color="@secondary">
        <Text slot="title" title>
            {pokemon.displayName}
            <Text subtitle>
                {pokemon.species}
            </Text>
        </Text>

        <div ws-x="[bg linear-gradient(to right, {gradient})]
        [b 2px solid black] [w 48px] [m 4px] [r 4px] [z 1]" slot="menu" />
    </Titlebar>

    <Titlebar color="@secondary" bg.c="@background-element" sticky>
        <Text title slot="title">General Info</Text>
    </Titlebar>
    <Grid p="0px" colsFit="150px, 1fr" gap="8px">
        <Info label="Number" value={pokemon.number} />
        <Info label="Type" value={pokemon.types.map(t => typeDisplay[t]).join(" / ")} />
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

    <Titlebar color="@secondary" bg.c="@background-element" sticky>
        <Text title slot="title">Base Stats</Text>
    </Titlebar>
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

    <div ws-x="[bg.c @background-element] [sticky]">
        <Titlebar color="@secondary">
            <Text title slot="title">Moves</Text>
            <Select options={tabOptions} bind:value={moveSort}
            slot="action" r="0px" color="@secondary" m.y="2px" />
        </Titlebar>

        <Input type="text" bind:value={filterText} flat r="0px" w="100%">
            <div slot="start" ws-x="[$adorn]">
                <Icon name="search" />
            </div>
        </Input>
    </div>
    {#each moveList as move, index}
        <Grid cols="28px 2fr 1fr 42px" b.x="8px solid @border-color" b.y="1px solid @border-color"
        _border-color={typeColor[move.type]} r="4px" bg="@background-element">
            <Link href="#/move/{move.id}" t.dec="none" button target="_blank">
                <Icon name="box-arrow-up-right" />
            </Link>

            <Text title>
                {move.name}
                <Text subtitle>Learned: {move.source}</Text>
            </Text>

            <Flex>
                <Text>{typeDisplay[move.type]}</Text>
                <Text>{catDisplay[move.category]}</Text>
                <Text>{move.power ?? "-"}</Text>
            </Flex>

            <div ws-x="[bg.img url(/image/{move.category}.png)]
            [bg.rep no-repeat] [bg.pos center center] [bg.sz 42px 42px]" />
        </Grid>
    {/each}
</Paper>
