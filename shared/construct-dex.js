const countLeaf = (node) => {
    if (node.to.length === 0) {
        node.count = 1
        return 1
    }
    node.count = node.to.reduce(
        (total, item) => total + countLeaf(item),
        0
    )
    return node.count
}
const constructEvoTree = (evo) => {
    const nodes = evo.family.reduce(
        (nodes, id) => {
            nodes[id] = { id, gid: id.replaceAll("@", "_"), to: [] }
            return nodes
        },
        {}
    )
    for (const link of evo.chain) {
        const from = nodes[link.start]
        const to = nodes[link.end]
        to.cond = link.cond
        from.to.push(to)
    }
    const root = nodes[evo.family[0]]
    countLeaf(root)
    evo.tree = root
}

const constructPokemon = (mon, sources) => {
    const { abilityRef, moveRef, typeEffectRef, evoList, moveLearnRef } = sources
    return {
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
        ) ?? null,
    }
}

export default (sources) => {
    const dex = Object.values(sources.dex).map(
        mon => constructPokemon(mon, sources)
    )
    for (const evo of Object.values(sources.evoList)) {
        constructEvoTree(evo)
    }
    const refs = {
        dexDisplay: dex.reduce(
            (map, mon) => {
                map[mon.displayName] = mon
                return map
            },
            {}
        ),
        dex: dex.reduce(
            (map, mon) => {
                map[mon.id] = mon
                return map
            },
            {}
        ),
        move: sources.moveRef,
        ability: sources.abilityRef,
    }

    return { dex, refs }
}
