<script>
    import {
        Input,
    } from "@axel669/zephyr"

    // import { autocomplete } from "#state/dex"
    import { typeDisplay } from "#state/refs"

    export let item
</script>

<Input
    flat
    type="text"
    label="Type"
    bind:value={item.name}
    autocompleteOptions={Object.values(typeDisplay)}
    b.l="4px solid @secondary"
/>
