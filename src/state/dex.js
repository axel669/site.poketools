import "mingo/init/system"
import { Aggregator } from "mingo/aggregator"
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

const loadData = async () => {
    // console.time("search")
    // const agg = new Aggregator([
    //     {
    //         $match: {
    //             types: { $in: ["normal"] },
    //             moves: {
    //                 $elemMatch: {
    //                     power: { $gte: 75 },
    //                     type: { $in: ["fire", "ice"] }
    //                 }
    //             }
    //         }
    //     },
    //     {
    //         $project: {
    //             "name": 1,
    //             "formName": 1,
    //             "types": 1,
    //             "stats": 1,
    //             moves: {
    //                 $filter: {
    //                     input: "$moves",
    //                     as: "moves",
    //                     cond: {
    //                         $and: [
    //                             { $gte: ["$$moves.power", 75] },
    //                             { $in: ["$$moves.type", ["fire", "ice"]] }
    //                         ]
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // ])
    // const results = agg.run(complete)
    // console.timeEnd("search")
    // console.log(results)
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

    // const monName = mon => {
    //     if (mon.formName === null) {
    //         return mon.name
    //     }
    //     return `${mon.name} (${mon.formName})`
    // }
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
        move: sources.moveRef
    })
    pokedex.set(dex)
}
setup()
