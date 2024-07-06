import { Aggregator } from "mingo/aggregator"
import loadJSON from "#lib/load-json.js"

// export const onRequestGet = async ({ request, data }) => {
//     const url = new URL(request.url)
//     const term = url.searchParams.get("term").toLowerCase()
//     return Response.json(
//         data.dex.filter(
//             mon => mon.searchTerms.map(
//                 searchTerm => searchTerm.includes(term)
//             ).includes(true)
//         )
//     )
// }

export const onRequestPost = async (ctx) => {
    const { request } = ctx
    const { query, projection } = await request.json()

    const agg = new Aggregator([
        { $match: query },
        { $project: projection }
    ])
    return Response.json(
        agg.run(await loadJSON(ctx, "/data/gen9/complete-dex.json"))
    )
}
