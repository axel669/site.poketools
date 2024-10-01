<script>
    import { Details, Link } from "@axel669/zephyr"

    export let ability = null
    export let hidden = false
</script>

{#if ability !== null}
    <Details label="{hidden ? "[Hidden] ": ""} {ability.name}">
        {ability.effect}
        <br />
        <br />
        <Link href="#/ability/{ability.id}">
            View Details
        </Link>
    </Details>
{/if}
