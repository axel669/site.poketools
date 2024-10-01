import "mingo/init/system"
import { dex } from "#data"
import { Aggregator } from "mingo"

export const $post = async (c) => {
    const { query, projection } = await c.req.json()
    const agg = new Aggregator([
        { $match: query },
        { $project: projection }
    ])
    return c.json(
        agg.run(dex)
    )
}
