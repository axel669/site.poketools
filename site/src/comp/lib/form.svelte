<script context="module">
    import { writable } from "svelte/store"
    const identity = i => i
    const alwaysGood = () => true

    const transformable = (value, transform) => {
        const internal = writable(transform(value))
        return {
            subscribe: internal.subscribe,
            set: (next) => internal.set(transform(next))
        }
    }
</script>

<script>
    import { Input } from "@axel669/zephyr"

    export let fields
    export let values
    export let inputValues
    // export let valid = {}

    const { tf, out } = fields.reduce(
        (info, field) => {
            info.tf[field.name] = field.transform ?? identity
            info.out[field.name] = field.out ?? identity
            return info
        },
        { tf: {}, out: {} }
    )
    const inputs = new Proxy(
        {},
        {
            get(_, name) {
                return inputValues[name]
            },
            set(_, name, value) {
                inputValues[name] = tf[name](value)
                values[name] = out[name](inputValues[name])
                return true
            }
        }
    )

    const includeValues = (field, values) => {
        if (field.includeValues === true) {
            return {...field.props, values}
        }
        return field.props
    }
</script>

{#each fields as field}
    {#if field.skip === true}
        <div />
    {:else}
        <svelte:component
            this={field.component ?? Input}
            {...includeValues(field, values)}
            bind:value={inputs[field.name]}
        />
    {/if}
{/each}
