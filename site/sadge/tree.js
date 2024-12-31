// console.log(
//     evo.tree
// )
// const grid = Array.from(
//     { length: evo.tree.count },
//     () => [".", ".", ".", ".", "."]
// )
// const fill = (node, x, y) => {
//     const gid = node.id.replaceAll(".", "_")
//     for (let i = 0; i < node.count; i += 1) {
//         grid[i + y][x] = gid
//         grid[i + y][x - 1] = `arrow-${gid}`
//     }
//     let cy = y
//     for (const child of node.to) {
//         fill(child, x + 2, cy)
//         cy += child.count
//     }
// }
// fill(evo.tree, 0, 0)
// const gridAreas = grid.map(line => `"${line.join(" ")}"`).join(" ")
