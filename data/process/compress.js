import fs from "fs-jetpack"
import zlib from "node:zlib"

const refs = {
    dex: fs.read("../gen9/pokemon-base-ref.json", "json"),
    abilityRef: fs.read("../gen9/ability-ref.json", "json"),
    evoList: fs.read("../gen9/evolution-list.json", "json"),
    moveRef: fs.read("../gen9/move-ref.json", "json"),
    typeEffectRef: fs.read("../gen9/type-effect-ref.json", "json"),
    moveLearnRef: fs.read("../gen9/move-learn-ref.json", "json"),
}

const monName = mon => {
    if (mon.formName === null) {
        return mon.name
    }
    return `${mon.name} (${mon.formName})`
}
for (const mon of Object.values(refs.dex)) {
    mon.displayName = monName(mon)
    mon.id = mon.id.replace("@", ".")
}

fs.write("../../static/data/gen9.json", JSON.stringify(refs))
// const full = JSON.stringify(refs)
// console.log(zlib.gzipSync(full).length)
