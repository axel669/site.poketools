// import fs from "fs-jetpack"
// import zlib from "node:zlib"

import loc from "./loc.js"

const refs = {
    dex: loc.gen9.read("pokemon-base-ref.json", "json"),
    abilityRef: loc.gen9.read("ability-ref.json", "json"),
    evoList: loc.gen9.read("evolution-list.json", "json"),
    moveRef: loc.gen9.read("move-ref.json", "json"),
    typeEffectRef: loc.gen9.read("type-effect-ref.json", "json"),
    moveLearnRef: loc.gen9.read("move-learn-ref.json", "json"),
}

loc.dest.write("data/gen9.json", JSON.stringify(refs))
// const full = JSON.stringify(refs)
// console.log(zlib.gzipSync(full).length)
