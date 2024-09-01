import "mingo/init/system"
import http from "@axel669/http/browser"

import { writable } from "svelte/store"

const constructPokemon = (mon, sources) => {
    const { abilityRef, moveRef, typeEffectRef, evoList, moveLearnRef } = sources
    return {
        ...mon,
        ability: {
            normal: mon.ability.normal.map(
                id => abilityRef[id]
            ),
            hidden: abilityRef[mon.ability.hidden] ?? null
        },
        moves: moveLearnRef[mon.id].map(
            ({ source, moveID }) => ({
                source,
                ...moveRef[moveID]
            })
        ),
        typeEffect: typeEffectRef[mon.types.sort().join("/")],
        evolution: evoList.find(
            evo => evo.family.includes(mon.id)
        ) ?? null
    }
}

export const pokedex = writable(null)
export const autocomplete = writable(null)
export const ref = writable(null)

const setup = async () => {
    console.time("load")
    const sourceResponse = await http.get("/data/gen9.json")
    const sources = sourceResponse.data
    console.timeEnd("load")
    console.time("process")
    const dex = Object.values(sources.dex).map(
        mon => constructPokemon(mon, sources)
    )
    console.timeEnd("process")

    autocomplete.set({
        pokemonName: dex.map(mon => mon.displayName),
        moveName: Object.values(sources.moveRef).map(move => move.name)
    })
    ref.set({
        dexDisplay: dex.reduce(
            (map, mon) => {
                map[mon.displayName] = mon
                return map
            },
            {}
        ),
        dex: dex.reduce(
            (map, mon) => {
                map[mon.id] = mon
                return map
            },
            {}
        ),
        move: sources.moveRef,
        ability: sources.abilityRef,
    })
    pokedex.set(dex)
}
setup()
