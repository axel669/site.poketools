<script>
    export let values
    export let name
    export let func
    export let text
    export let wsx
</script>

<div ws-x={wsx}>
    {#if text !== undefined}
        {text}
    {:else}
        {func(values, name)}
    {/if}
</div>
