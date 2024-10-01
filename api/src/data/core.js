import constructDex from "$shared/construct-dex"
import sources from "./gen9.json" assert { type: "json" }

export const { dex, refs } = constructDex(sources)

// const constructPokemon = (mon, sources) => {
//     const { abilityRef, moveRef, typeEffectRef, evoList, moveLearnRef } = sources
//     return {
//         ...mon,
//         ability: {
//             normal: mon.ability.normal.map(
//                 id => abilityRef[id]
//             ),
//             hidden: abilityRef[mon.ability.hidden] ?? null
//         },
//         moves: moveLearnRef[mon.id].map(
//             ({ source, moveID }) => ({
//                 source,
//                 ...moveRef[moveID]
//             })
//         ),
//         typeEffect: typeEffectRef[mon.types.sort().join("/")],
//         evolution: evoList.find(
//             evo => evo.family.includes(mon.id)
//         ) ?? null
//     }
// }

// export const dex = Object.values(sources.dex).map(
//     mon => constructPokemon(mon, sources)
// )

// export const ref = {
//     dex: dex.reduce(
//         (map, mon) => {
//             map[mon.id] = mon
//             return map
//         },
//         {}
//     ),
//     move: sources.moveRef,
//     ability: sources.abilityRef
// }
