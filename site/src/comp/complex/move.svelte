<script context="module">
    export const info = {
        button: "+Move",
        init: () => {
            const cond = {
                type: "move",
                name: "",
                query: () => ({ "moves.name": cond.name })
            }
            return cond
        }
    }
</script>

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
    label="Move Name"
    bind:value={item.name}
    autocompleteOptions={$autocomplete.moveName}
    b.l="4px solid @secondary"
/>
