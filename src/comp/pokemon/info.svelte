<script>
    import { Flex, Text } from "@axel669/zephyr"

    export let label
    export let value
</script>

<Flex r="4px" bg.c="@background-element">
    <Text subtitle t.c="@primary">{label}</Text>
    <slot>
        {value}
    </slot>
</Flex>
