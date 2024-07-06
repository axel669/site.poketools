import { Query } from "mingo"
import loadJSON from "#lib/load-json.js"

export const onRequestGet = async (ctx) => {
    const { request } = ctx
    const url = new URL(request.url)
    const term = url.searchParams.get("term").toLowerCase()
    return Response.json(
        new Query({
            term
        }).find(
            await loadJSON(ctx, "/data/gen9/move-list.json")
        )
    )
}
