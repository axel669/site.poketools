import loadJSON from "#lib/load-json.js"

export const onRequestGet = async (ctx) => {
    const { params } = ctx
    const ability = await loadJSON(ctx, "/data/gen9/ability-ref.json")
    return Response.json(ability[params.id])
}
