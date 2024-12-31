import loc from "./loc.js"

const moveref = loc.gen9.read("move-learn-ref.json", "json")

const fixed = Object.fromEntries(
    Object.entries(moveref).map(
        ([key, value]) => [
            key.replace("@", "."),
            value
        ]
    )
)

loc.save.write("move-learn-ref-fixed.json", JSON.stringify(fixed))
