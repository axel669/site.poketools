import { Query } from "mingo"
import { Aggregator } from "mingo/aggregator"

export const onRequestGet = async ({ request, data }) => {
    const url = new URL(request.url)
    const term = url.searchParams.get("term").toLowerCase()
    return Response.json(
        data.dex.filter(
            mon => mon.searchTerms.map(
                searchTerm => searchTerm.includes(term)
            ).includes(true)
        )
    )
}

export const onRequestPost = async ({ request, data }) => {
    const { query, projection } = await request.json()

    const agg = new Aggregator([
        { $match: query },
        { $project: projection }
    ])
    return Response.json(
        agg.run(data.complete)
    )
    // console.log(query)
    // return Response.json(
    //     new Query(query).find(data.dex).all()
    // )
}
