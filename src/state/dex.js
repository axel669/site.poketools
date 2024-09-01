import "mingo/init/system"
import http from "@axel669/http/browser"

import { writable } from "svelte/store"

/**
@typedef {{
    accuracy: int
    category: "physical" | "special" | "status"
    desc: string
    effect: int
    id: string
    name: string
    power: int
    pp: int
    searchTerms: string[]
    type: string
    source: MoveSource
}} Move
*/
/**
@typedef {
    Move &
    {
        source: MoveSource
    }
} LearnedMove
*/

/**
@typedef {{
    ability: {
        normal: Ability[]
        hidden: Ability?
    }
    displayName: string
    evolution
    formName: string
    height: {
        metric: number
        imperial: number
    }
    id: string
    moves: LearnedMove[]
    name: string
    national: string
    number: int
    searchTerms: string[]
    species: string
    stats: {
        hp: int
        atk: int
        def: int
        satk: int
        sdef: int
        spd: int
    }
    typeEffect: {
        [type: string]: number
    }
    types: string[]
    weight: {
        metric: number
        imperial: number
    }
}} Pokemon
*/

/**
@typedef {{
    dexDisplay: {
        [displayName: string]: Pokemon
    }
    dex: {
        [id: string]: Pokemon
    }
}} Reference
*/

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
/** @type {Writable<Reference?>} */
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
    console.log(dex)
    pokedex.set(dex)
}
setup()
