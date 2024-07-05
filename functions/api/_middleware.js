// import dex from "#dex" assert { "type": "json" }
// import ability from "#ability" assert { "type": "json" }
// import move from "#move" assert { "type": "json" }
// import typeEffect from "#type-effect" assert { type: "json" }
// import evolution from "#evolution" assert { type: "json" }
import "mingo/init/system"

const idkey = (ids, item) => {
    ids[item.id] = item
    return ids
}

const loadJSON = (req, env, file) => {
    const url = new URL(req.url)
    const target = `${url.origin}${file}`
    return env.ASSETS.fetch(target).then(res => res.json())
}

export const onRequest = async ({ request, next, data, env }) => {
    const t = performance.now()
    // const row =
    //     await env.db.prepare("select * from pokemon_data where gen = '9'").all()
    // const uintArray = Uint8Array.from(
    //     atob(row.results[0].data),
    //     (ch) => ch.charCodeAt(0)
    // )
    // const decom = new DecompressionStream("gzip")
    // const writer = decom.writable.getWriter()
    // writer.write(uintArray.buffer)
    // writer.close()
    // const {
    //     dex,
    //     ability,
    //     move,
    //     typeEffect,
    //     evolution
    // } = await new Response(decom.readable).json()
    const [ dex, ability, move, typeEffect, evolution ] = await Promise.all([
        loadJSON(request, env, "/raw/gen9/dex.json"),
        loadJSON(request, env, "/raw/gen9/ability.json"),
        loadJSON(request, env, "/raw/gen9/move.json"),
        loadJSON(request, env, "/raw/gen9/type-effect.json"),
        loadJSON(request, env, "/raw/gen9/evolution.json"),
    ])

    const dexID = dex.reduce(idkey, {})
    const abilityID = ability.reduce(idkey, {})
    const moveID = move.reduce(idkey, {})

    data.dex = dex
    data.ability = ability
    data.move = move
    data.dexID = dexID
    data.abilityID = abilityID
    data.moveID = moveID
    data.typeEffect = typeEffect
    data.evolution = evolution
    data.complete = dex.map(
        pokemon => {
            const ab_normal = pokemon.ability.normal.map(
                id => data.abilityID[id]
            )
            const ab_hidden = data.abilityID[pokemon.ability.hidden] ?? null
            const moves = pokemon.moves.map(
                ({source, moveID}) => ({source, move: data.moveID[moveID]})
            )
            const typeKey = pokemon.types.sort().join("/")
            return {
                ...pokemon,
                ability: {
                    normal: ab_normal,
                    hidden: ab_hidden,
                },
                moves,
                typeEffect: typeEffect[typeKey],
                evolution: evolution.find(
                    evo => evo.family.includes(pokemon.id)
                )
            }
        }
    )
    const t2 = performance.now()
    console.log(t2 - t)
    return await next()
}
