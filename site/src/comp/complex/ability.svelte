<script>
    import {
        Input,
    } from "@axel669/zephyr"

    import { autocomplete } from "#state/dex"

    export let item
</script>

<Input
    flat
    type="text"
    label="Ability Name"
    bind:value={item.name}
    autocompleteOptions={$autocomplete.abilityName}
    b.l="4px solid @secondary"
/>
