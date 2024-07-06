import fs from "fs-jetpack"

const dex = fs.read("data/dex.json", "json")

const pokemon = dex.map(
    mon => {
        const { moves, ...base } = mon
        return base
    }
)
const moves = dex.reduce(
    (ref, mon) => {
        ref[mon.id] = mon.moves
        return ref
    },
    {}
)

fs.write("data/pokemon-base-list.json", pokemon)
fs.write("data/move-learn-ref.json", moves)
