<script>
    export let condition
</script>

<ul ws-x="[p.l 20px] [m.y 0px] [m.x 8px]">
    {#if condition.level} <li><slot name="level" {...condition} /></li> {/if}
    {#if condition.trade} <li><slot name="trade" {...condition} /></li> {/if}
    {#if condition.use} <li><slot name="item" {...condition} /></li> {/if}
    {#if condition.collect} <li><slot name="collect" {...condition} /></li> {/if}
    {#if condition.friendship} <li><slot name="friend" {...condition} /></li> {/if}
    {#if condition.time} <li><slot name="time" {...condition} /></li> {/if}
    {#if condition.weather} <li><slot name="weather" {...condition} /></li> {/if}
    {#if condition.area} <li><slot name="area" {...condition} /></li> {/if}
    {#if condition.stat} <li><slot name="stat" {...condition} /></li> {/if}
    {#if condition.nature} <li><slot name="nature" {...condition} /></li> {/if}
    {#if condition.learn} <li><slot name="move" {...condition} /></li> {/if}
    {#if condition.move} <li><slot name="use" {...condition} /></li> {/if}
    {#if condition.battle} <li><slot name="battle" {...condition} /></li> {/if}
    {#if condition.gender} <li><slot name="gender" {...condition} /></li> {/if}
    {#if condition.rare} <li><slot name="rare" {...condition} /></li> {/if}
    {#if condition.region} <li><slot name="region" {...condition} /></li> {/if}
    {#if condition.gen} <li><slot name="gen" {...condition} /></li> {/if}
    {#if condition.game} <li><slot name="game" {...condition} /></li> {/if}
    {#if condition.action} <li><slot name="action" {...condition} /></li> {/if}
    {#if condition.goMode} <li><slot name="gomode" {...condition} /></li> {/if}
    {#if condition.multiplayer} <li><slot name="multiplayer" {...condition} /></li> {/if}
    {#if condition.system} <li><slot name="system" {...condition} /></li> {/if}
    {#if condition.damage} <li><slot name="take-damage" {...condition} /></li> {/if}
</ul>
