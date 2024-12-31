<script context="module">
    export const info = {
        button: "+Ability",
        init: () => {
            const cond = {
                type: "ability",
                name: "",
                query: () => ({
                    $or: [
                        { "ability.normal.name": cond.name },
                        { "ability.hidden.name": cond.name },
                    ]
                }),
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
    label="Ability Name"
    bind:value={item.name}
    autocompleteOptions={$autocomplete.abilityName}
    b.l="4px solid @secondary"
/>
