<script>
    import {
        Text,
        Link,

        Flex,
        Grid,
    } from "@axel669/zephyr"

    import Condition from "./evolution/condition.svelte"

    import { ref } from "#state/dex"
    import { typeDisplay, gameDisplay, statDisplay } from "#state/refs"

    export let name
    export let evo

    const ops = {
        lt: "<",
        gt: ">",
        eq: "=",
    }
</script>

{#if evo === null}
    <Text>{name} does not evolve into or from any other Pokemon</Text>
{:else}
    <Grid cols="1fr auto 1fr" p="0px" gap="4px 0px" bg="@primary-ripple">
        {#each evo.chain as chain}
            <Link href="#/pokemon/{chain.start}" target="_blank" t.dec="none">
                <Flex fl-center t.a="center" p="0px" gap="4px" bg="@background-layer" h="100%">
                    <img src="/image/pokemon/icon/{chain.start}.png" alt="" />
                    {$ref.dex[chain.start].displayName}
                </Flex>
            </Link>
            <Flex fl.cross="start" fl.main="center" p="0px" gap="2px" bg="@background-layer">
                <Condition condition={chain.cond}>
                    <div slot="level" let:level>
                        Level {level}
                    </div>
                    <div slot="trade" let:hold>
                        Trade
                        {#if hold} holding {hold} {/if}
                    </div>
                    <div slot="item" let:use>
                        Use {use}
                    </div>
                    <div slot="friend">
                        High Friendship
                    </div>
                    <div slot="time" let:time>
                        {time}
                    </div>
                    <div slot="move" let:learn>
                        {#if learn.type}
                            Knows {typeDisplay[learn.type]}-type move
                        {:else}
                            Knows {learn}
                        {/if}
                    </div>
                    <div slot="use" let:move let:count>
                        Use {$ref.move[move].name} {count} times
                    </div>
                    <div slot="region" let:region>
                        In Region
                        <ul ws-x="[p.l 20px]">
                            {#each region as id}
                                <li>{id}</li>
                            {/each}
                        </ul>
                    </div>
                    <div slot="game" let:game>
                        In Game
                        <ul ws-x="[p.l 20px]">
                            {#each game as id}
                                <li>{gameDisplay[id]}</li>
                            {/each}
                        </ul>
                    </div>
                    <div slot="action" let:action let:hold>
                        Player: {action}
                        {#if hold} while the Pokemon holds a {hold} {/if}
                    </div>
                    <div slot="system" let:system>
                        Console: {system}
                    </div>
                    <div slot="gender" let:gender>
                        {gender}
                    </div>
                    <div slot="take-damage" let:damage>
                        Take {damage[0]} {damage[1]} damage
                    </div>
                    <div slot="area" let:area>
                        In {area}
                    </div>
                    <div slot="gen" let:gen>
                        In Generation: {gen.join(", ")}
                    </div>
                    <div slot="rare">
                        Rare Chance
                    </div>
                    <div slot="multiplayer">
                        In Multiplayer
                    </div>
                    <div slot="collect" let:collect let:count>
                        Collect {count} {collect}
                    </div>
                    <div slot="weather" let:weather>
                        Weather: {weather}
                    </div>
                    <div slot="battle" let:battle>
                        {#if battle.defeat}
                            Defeat
                            <ul ws-x="[p.l 20px]">
                                {#each battle.defeat as target}
                                    {$ref.dex[target.id].name} x{target.count} that are holding a {target.hold}
                                {/each}
                            </ul>
                        {/if}
                    </div>
                    <div slot="gomode" let:steps>
                        Take {steps} steps in Go Mode
                    </div>
                    <div slot="nature" let:nature>
                        Nature: {nature.join(", ")}
                    </div>
                    <div slot="stat" let:stat>
                        {#each stat as [left, comp, right]}
                            {statDisplay[left]} {ops[comp]} {statDisplay[right]}
                        {/each}
                    </div>
                </Condition>
            </Flex>
            <Link href="#/pokemon/{chain.end}" target="_blank" t.dec="none">
                <Flex fl-center t.a="center" p="0px" gap="4px" bg="@background-layer" h="100%">
                    <img src="/image/pokemon/icon/{chain.end}.png" alt="" />
                    {$ref.dex[chain.end].displayName}
                </Flex>
            </Link>
        {/each}
    </Grid>
{/if}
