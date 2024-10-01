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

    import {
        typeColor, typeDisplay,
        catDisplay,
        statColor, statDisplay
    } from "#state/refs"
    import statCalc from "#stats/calc"

    import Info from "./pokemon/info.svelte"
    import Ability from "./pokemon/ability.svelte"

    export let pokemon

    console.log(pokemon)

    const statData = ["hp", "atk", "def", "satk", "sdef", "spd"].map(
        (statID) => {
            const base = pokemon.stats[statID]
            const calcfn = (statID === "hp") ? "hp" : "stat"
            const min = statCalc[calcfn]({ base, ev: 0, iv: 0 }, 100, 0.9)
            const max = statCalc[calcfn]({ base, ev: 252, iv: 31 }, 100, 1.1)

            return {
                base,
                min,
                max,
                name: statDisplay[statID],
                color: statColor[statID],
            }
        }
    )

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

    <Grid p="0px" cols="1fr 1fr">
        <div ws-x="[t.a right]">
            <img
                src="/image/pokemon/{pokemon.number}.png"
                alt="{pokemon.displayName} Regular"
                ws-x="[w 100%] [w.max 250px]"
            />
        </div>

        <div>
            <img
                src="/image/pokemon/{pokemon.number}-shiny.png"
                alt="{pokemon.displayName} Shiny"
                ws-x="[w 100%] [w.max 250px]"
            />
        </div>
    </Grid>

    <Grid p="0px" colsFit="150px, 1fr" gap="8px">
        <Info label="Number" value={pokemon.number} />
        <Info label="Type" value={pokemon.types.map(t => typeDisplay[t]).join(" / ")} />
        <Info label="Height" value="{pokemon.height.imperial} in." />
        <Info label="Weight" value="{pokemon.weight.imperial}lbs" />
    </Grid>
    <Info label="Abilities">
        <Ability ability={pokemon.ability.normal[0]} />
        <Ability ability={pokemon.ability.normal[1]} />
        <Ability ability={pokemon.ability.hidden} hidden />
    </Info>

    <Titlebar color="@secondary" bg.c="@background-element" sticky>
        <Text title slot="title">Base Stats</Text>
    </Titlebar>
    <Table data={statData} h="1px">
        <tr slot="header">
            <td ws-x="[w 120px]">Stat</td>
            <td ws-x="[w 100px]">Value</td>
            <td></td>
        </tr>

        <tr slot="row" let:row>
            <td>{row.name}</td>
            <td>
                <Text>{row.base}</Text>
                <Text disp="block" subtitle>
                    {row.min} - {row.max}
                </Text>
            </td>
            <td ws-x="[h 100%]">
                <div ws-x="[h 20px] [w {(row.base / 255) * 100}%] [bg {row.color}]" />
            </td>
        </tr>
    </Table>

    <div ws-x="[bg.c @background-element] [sticky]">
        <Titlebar color="@secondary">
            <Text title slot="title">
                Moves
            </Text>

            <Select
                slot="action"
                options={tabOptions}
                bind:value={moveSort}
                r="0px"
                color="@secondary"
                m.y="2px"
            />
        </Titlebar>

        <Input type="text" bind:value={filterText} flat r="0px" w="100%">
            <div slot="start" ws-x="[$adorn]">
                <Icon name="search" />
            </div>
        </Input>
    </div>
    {#each moveList as move, index}
        <Grid cols="28px 2fr 1fr 42px" b.x="8px solid @border-color" b.y="1px solid @border-color"
        !@border-color={typeColor[move.type]} r="4px" bg="@background-element">
            <Link href="#/move/{move.id}" t.dec="none" button target="_blank" ground>
                <Icon name="box-arrow-up-right" />
            </Link>

            <Text title>
                {move.name}
                <Text subtitle>Learned: {move.source}</Text>
            </Text>

            <Flex>
                <Text>
                    {typeDisplay[move.type]}
                    {#if pokemon.types.includes(move.type)}
                        [STAB]
                    {/if}
                </Text>
                <Text>{catDisplay[move.category]}</Text>
                <Text>{move.power ?? "-"}</Text>
            </Flex>

            <div ws-x="[bg.img url(/image/{move.category}.png)]
            [bg.rep no-repeat] [bg.pos center center] [bg.sz 42px 42px]" />
        </Grid>
    {/each}
</Paper>
