import loadJSON from "#lib/load-json.js"

export const onRequestGet = async (ctx) => {
    const { params } = ctx
    const pokemon = await loadJSON(ctx, "/data/gen9/pokemon-ref.json")
    return Response.json(pokemon[params.id])
}
