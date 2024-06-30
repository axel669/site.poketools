export const onRequestGet = ({ data, params }) => {
    return Response.json(data.moveID[params.id])
}
