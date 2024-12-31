<script>
    import {
        Paper,
        Titlebar,
        Text,
        Table,

        Grid,
        Flex,

        Title,
    } from "@axel669/zephyr"

    // import { ref } from "#state/dex"

    export let ability
</script>

<Title data={ability.name} />

<Paper card color="@secondary" h="100%">
    <Titlebar slot="header" fill color="@secondary">
        <Text slot="title" title>
            {ability.name}
        </Text>
    </Titlebar>

    <Text>
        {ability.effect}
    </Text>
</Paper>
