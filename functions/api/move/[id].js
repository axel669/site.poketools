import loadJSON from "#lib/load-json.js"

export const onRequestGet = async (ctx) => {
    const { params } = ctx
    const move = await loadJSON(ctx, "/data/gen9/move-ref.json")
    return Response.json(move[params.id])
}
