export const onRequestGet = ({ data, params }) => {
    console.log(params, 0)
    return Response.json(data.dexID[params.id])
}
