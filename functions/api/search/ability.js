import { Query } from "mingo"
import loadJSON from "#lib/load-json.js"

export const onRequestGet = async (ctx) => {
    const { request } = ctx
    const url = new URL(request.url)
    const term = url.searchParams.get("term").toLowerCase()
    const ability = await loadJSON(ctx, "/data/gen9/ability-list.json")
    return Response.json(
        new Query({
            "term": term
        }).find(ability)
    )
}
