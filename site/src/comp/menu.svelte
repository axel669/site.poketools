<script>
    import {
        Drawer,
        Paper,
        Text,
        Tabs,
        Titlebar,
        Button,
    } from "@axel669/zephyr"

    import theme from "#state/theme"

    export let close
    export const cancel = () => close()

    const options = [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "Tron", value: "tron" },
    ]
</script>

<Drawer type="menu">
    <Paper w.min="180px" r="0px">
        <Titlebar color="@primary">
            <Text slot="title" title>
                Theme
            </Text>
        </Titlebar>

        <Tabs {options} bind:value={$theme} fill vertical color="@primary" />
    </Paper>
</Drawer>
