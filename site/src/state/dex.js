import "mingo/init/system"
import http from "@axel669/http/browser"

import { writable } from "svelte/store"

import constructDex from "$shared/construct-dex"

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

export const pokedex = writable(null)
/** @type {Writable<{pokemonName: string[], moveName: string[], abilityName: string[]}>} */
export const autocomplete = writable(null)
/** @type {Writable<Reference?>} */
export const ref = writable(null)

const setup = async () => {
    console.time("load")
    const sourceResponse = await http.get("/data/gen9.json")
    const sources = sourceResponse.data
    console.timeEnd("load")
    console.time("process")
    const { dex, refs } = constructDex(sources)
    console.timeEnd("process")

    autocomplete.set({
        pokemonName: dex.map(mon => mon.displayName),
        moveName: Object.values(sources.moveRef).map(move => move.name),
        abilityName: Object.values(sources.abilityRef).map(ability => ability.name)
    })
    ref.set(refs)
    window.sources = sources
    pokedex.set(dex)
}
setup()
