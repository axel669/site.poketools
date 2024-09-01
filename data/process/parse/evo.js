import fs from "fs-jetpack"
import { JSDOM } from "jsdom"

const html = await JSDOM.fromFile("html/pdb.evo.html")
const doc = html.window.document
const evos = [...html.window.document.querySelectorAll(".infocard-list-evo")]

const dex = fs.read("../data/dex.json", "json")
const nationals = dex.map(mon => mon.national)

const pokemon = Array.from(
    doc.querySelectorAll("[class='infocard ']")
)

const monID = (name, form) =>
    [name, form]
    .filter(item => item !== null)
    .join("@")
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("é", "e")

const parseMon = (mon) => {
    const data = mon.querySelector(".infocard-lg-data")
    const lines =
        Array.from(data.children)
        .filter(child => child.tagName !== "BR")
        .map(child => child.textContent)
    const national = lines[0].slice(1)
    const name = lines[1]
    const form =
        (lines.length === 3)
        ? null
        : lines[2].replace(name, "").replace("Form", "").trim()
    return { national, name, form, id: monID(name, form) }
}
const baseCondition = (match) => {
    const {
        level,
        trade,
        tradeItem,
        holdItem,
        friendship,
        learnMove,
        useItem
    } = match.groups
    if (level !== undefined) {
        return { level: parseInt(level) }
    }
    if (trade !== undefined) {
        return { trade: true }
    }
    if (tradeItem !== undefined) {
        return { trade: true, hold: tradeItem }
    }
    if (holdItem !== undefined) {
        return { hold: holdItem }
    }
    if (friendship !== undefined) {
        return { friendship: true }
    }
    if (learnMove !== undefined) {
        return { learn: learnMove }
    }
    if (useItem !== undefined) {
        return { use: useItem }
    }
    throw new Error(`invalid base condition: ${match[0]}`)
}
const extraCondition = (match) => {
    const { weather, time, sex } = match.groups
    if (weather !== undefined) {
        return { weather: "rain" }
    }
    if (time !== undefined) {
        return { time }
    }
    if (sex !== undefined) {
        return { gender: sex }
    }
    return {}
}
const baseRegex = [
    /Level (?<level>\d+)/.source,
    /(?<trade>Trade)/.source,
    /trade holding (?<tradeItem>[\w \-]+)/.source,
    /use (?<useItem>[\w \-]+)/.source,
    /after (?<learnMove>[\w \-]+?) learned/.source,
    /(?<friendship>high Friendship)/.source,
]
const extraRegex = [
    /(?<weather>during rain)/.source,
    /(?<time>Nighttime|Daytime|Dusk)/.source,
    /(?<sex>Female|Male)/.source,
]
const regex = {
    extra: new RegExp(`(${extraRegex.join("|")})`),
    base: new RegExp(`(${baseRegex.join("|")})`),
}
const conditionMatch = [
    new RegExp(`^${regex.base.source}$`),
    new RegExp(`^${regex.base.source}, ${regex.extra.source}$`),
]
const parseCondition = (cond) => {
    for (const regex of conditionMatch) {
        const match = cond.match(regex)
        if (match !== null) {
            return {
                ...baseCondition(match),
                ...extraCondition(match)
            }
        }
    }
    return cond
}
const parseBasic = (start, condition) => {
    const dest = condition.nextElementSibling
    const end = parseMon(dest)

    return {
        start,
        cond: parseCondition(condition.textContent.slice(1, -1)),
        end,
    }
}
const parseMulti = (start, alts) => Array.from(
    alts.children,
    (child) => parseBasic(start, child.children[0])
)
const evoChains =
    pokemon
    .filter(
        mon => mon.nextElementSibling !== null
    )
    .map(
        mon => {
            const start = parseMon(mon)
            if (nationals.includes(start.national) === false) {
                return false
            }
            const next = mon.nextElementSibling
            if (next.classList.contains("infocard-evo-split") === true) {
                return parseMulti(start, mon.nextElementSibling)
            }
            return parseBasic(start, mon.nextElementSibling)
        }
    )
    .flat(1)
    .filter(chain => chain !== false)

// console.log(evoChains.slice(0, 10))
// console.log(
//     evoChains.filter(chain => typeof chain.cond === "string")
// )
fs.write(
    "../data/evolution.json",
    evoChains
)
