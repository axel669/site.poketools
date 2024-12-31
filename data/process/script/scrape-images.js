// import fs from "fs-jetpack"
import loc from "../loc.js"

const { dex } = loc.dest.read("data/gen9.json", "json")
const list = Object.values(dex)

// console.log(list.length)
// const formCount = {}
const plswhy = {
    "core-form": "b",
    "dusk-mane": "dm",
    "dawn-wings": "dw",
    "combat-breed": "p",
}
const baseForms = [
    "basculegion.male",
    "basculin.red-striped",
    "deoxys.normal-forme",
    "dudunsparce.two-segment-form",
    "eiscue.ice-face",
    "enamorus.incarnate-forme",
    "gimmighoul.chest-form",
    "hoopa.confined",
    "indeedee.male",
    "landorus.incarnate-forme",
    "lycanroc.midday",
    "maushold.family-of-four",
    "meloetta.aria-forme",
    "meowstic.male",
    "minior.meteor-form",
    "morpeko.full-belly-mode",
    "necrozma.ultra",
    "ogerpon.teal-mask",
    "oinkologne.male",
    "oricorio.baile-style",
    "palafin.zero-form",
    "rockruff.own-tempo",
    "shaymin.land-forme",
    "squawkabilly.green-plumage",
    "terapagos.normal-form",
    "thundurus.incarnate-forme",
    "tornadus.incarnate-forme",
    "toxtricity.amped",
    "urshifu.single-strike-style",
    "zacian.hero-of-many-battles",
    "zamazenta.hero-of-many-battles",
]
const imageName = (mon) => {
    const number = mon.number.toString().padStart(3, "0")
    const [, formID] = mon.id.split(".")
    const isBaseForm = (
        mon.formName === null
        || baseForms.includes(mon.id) === true
    )
    if (isBaseForm === true) {
        return `${number}.png`
    }
    return `${number}-${plswhy[formID] ?? formID.slice(0, 1)}.png`
}
const locations = [
    "https://serebii.net/scarletviolet/pokemon/new/",
    "https://serebii.net/Shiny/SV/new/",
    "https://serebii.net/pokedex-sv/icon/new/",
]
const download = async (source, dest) => {
    console.log(source)
    if (loc.dest.exists(dest) === "file") {
        return
    }
    const response = await fetch(source)
    if (response.ok === false) {
        throw new Error(`${source} - ${response.status}`)
    }
    loc.dest.write(
        dest,
        Buffer.from(
            await response.arrayBuffer()
        )
    )
}
for (const mon of list) {
    const image = imageName(mon)
    await download(`${locations[0]}${image}`, `image/pokemon/regular/${mon.id}.png`)
    await download(`${locations[1]}${image}`, `image/pokemon/shiny/${mon.id}.png`)
    await download(`${locations[2]}${image}`, `image/pokemon/icon/${mon.id}.png`)
}

// const images = Array.from(
//     { length: 1025 },
//     (_, i) => {
//         const n =  i + 1
//         const num = n.toString().padStart(3, "0")
//         return [
//             `https://serebii.net/scarletviolet/pokemon/new/${num}.png`,
//             `https://serebii.net/Shiny/SV/new/${num}.png`,
//             n,
//         ]
//     }
// )

// for (const [regular, shiny, num] of images) {
//     console.log(regular)
//     console.log(shiny)
//     const reg = await fetch(regular)
//     const shi = await fetch(shiny)

//     loc.dest.write(`pokemon/${num}.png`, Buffer.from(await reg.arrayBuffer()))
//     loc.dest.write(`pokemon/${num}-shiny.png`, Buffer.from(await shi.arrayBuffer()))
// }
