import loc from "../loc.js"

const monName = mon => {
    if (mon.formName === null) {
        return mon.name
    }
    return `${mon.name} (${mon.formName})`
}
const dexref = loc.gen9.read("pokemon-base-ref.json", "json")

const fixed = Object.fromEntries(
    Object.entries(dexref).map(
        ([key, mon]) => {
            mon.displayName = monName(mon)
            mon.id = key.replace("@", ".")
            return [mon.id, mon]
        }
    )
)

loc.gen9.write("pokemon-base-ref.json", JSON.stringify(fixed))
