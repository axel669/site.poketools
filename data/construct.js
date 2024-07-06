import fs from "fs-jetpack"
import zlib from "node:zlib"

const abilityList = fs.read("data/gen9/ability-list.json", "json")
const evoList = fs.read("data/gen9/evolution-list.json", "json")
const moveLearnRef = fs.read("data/gen9/move-learn-ref.json", "json")
const moveList = fs.read("data/gen9/move-list.json", "json")
const pokemonBaseList = fs.read("data/gen9/pokemon-base-list.json", "json")
const typeEffectRef = fs.read("data/gen9/type-effect-ref.json", "json")

const saveData = (dest, data) => {
    const json = JSON.stringify(data)
    const compr = zlib.gzipSync(json)
    fs.write(dest, compr)
}
const idkey = (ids, item) => {
    ids[item.id] = item
    return ids
}

saveData("site/data/gen9/ability-list.json", abilityList)
saveData("site/data/gen9/evolution-list.json", evoList)
saveData("site/data/gen9/move-learn-ref.json", moveLearnRef)
saveData("site/data/gen9/move-list.json", moveList)
saveData("site/data/gen9/pokemon-base-list.json", pokemonBaseList)
saveData("site/data/gen9/type-effect-ref.json", typeEffectRef)

const moveRef = moveList.reduce(idkey, {})
const abilityRef = abilityList.reduce(idkey, {})

const completeDex = pokemonBaseList.map(
    mon => ({
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
    })
)
const pokemonRef = completeDex.reduce(idkey, {})

saveData("site/data/gen9/move-ref.json", moveRef)
saveData("site/data/gen9/ability-ref.json", abilityRef)
saveData("site/data/gen9/complete-dex.json", completeDex)
saveData("site/data/gen9/pokemon-ref.json", pokemonRef)
